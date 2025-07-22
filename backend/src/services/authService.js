const { User, RefreshToken } = require("../models");
const { compare, hash } = require("bcrypt");
const { sign, verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { insertAcl } = require("./securityService");
const { insertUser } = require("./usersService");
const { Op } = require('sequelize'); // Para usar operadores do Sequelize como Op.gt

const MIN_LOGIN_TIME_MS = 2000;
const CUSTOMER_ROLE_ID = "48cc1519-d135-47af-83a7-5d7d48635b82";
const ACTIVATION_TOKEN_EXPIRATION = "1d";
const ACTIVATION_URL_BASE = "http://localhost:3000/auth/activate";

// --- Função auxiliar para gerar tokens ---
async function generatePairToken(user) {
	if (!user || !user.id) {
		throw new Error("Usuário inválido para geração de token");
	}

	const accessToken = sign(
		{ id: user.id, email: user.email, name: user.name },
		jsonSecret.secret,
		{ expiresIn: "15m" }
	);

	const refreshToken = sign(
		{ id: user.id },
		jsonSecret.refreshSecret,
		{ expiresIn: "7d" } // Refresh token JWT com expiração de 7 dias
	);

	// Revogar tokens antigos do mesmo usuário: use 'is_revoked' e Op.gt para não revogar expirados
	// REMOVIDO 'expired: true'
	await RefreshToken.update(
		{ is_revoked: true }, // <--- Corrigido para 'is_revoked: true' apenas
		{
			where: {
				user_id: user.id,
				is_revoked: false,
				expires_at: { [Op.gt]: new Date() }
			}
		}
	);

	// Data de expiração no DB para o Refresh Token (7 dias)
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	await RefreshToken.create({
		user_id: user.id,
		token: refreshToken,
		is_revoked: false, // <--- Confirme que o campo é 'is_revoked' no seu modelo
		expires_at: expiresAt,
	});

	return {
		accessToken,
		refreshToken,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			active: user.active,
			phone: user.phone
		}
	};
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Função de autenticação (Login) ---
async function authenticate({ email, password }) {
	const startTime = Date.now();

	const user = await User.scope("withPassword").findOne({
		attributes: ["id", "email", "password_hash", "active", "name", "phone"],
		where: { email }
	});

	let response;

	if (!user || !user.active) {
		response = { success: false, message: "Usuário ou senha incorreta!" };
	} else {
		const validPassword = await user.validPassword(password);

		if (!validPassword) {
			response = { success: false, message: "Usuário ou senha incorreta!" };
		} else {
			response = await generatePairToken(user);
			response.success = true;
			response.message = "Login bem-sucedido!";
		}
	}

	const elapsed = Date.now() - startTime;
	if (elapsed < MIN_LOGIN_TIME_MS) await wait(MIN_LOGIN_TIME_MS - elapsed);

	return response;
}

// --- Função de registro de usuário ---
async function registerUser({ name, email, password, phone }) {
	if (!name || !email || !password) {
		return { success: false, message: "Nome, email e senha são obrigatórios." };
	}

	try {
		const createdUser = await User.create({ name, email, password, phone, active: false });

		if (!createdUser) {
			return { success: false, message: "Erro ao criar usuário no banco de dados." };
		}

		const activationToken = sign(
			{ id: createdUser.id, email: createdUser.email },
			jsonSecret.activationSecret,
			{ expiresIn: ACTIVATION_TOKEN_EXPIRATION }
		);

		const activationLink = `${ACTIVATION_URL_BASE}/${activationToken}`;

		await insertAcl({
			user_id: createdUser.id,
			roles: [CUSTOMER_ROLE_ID],
			permission: [],
		});

		return {
			success: true,
			message: "Usuário registrado com sucesso! Verifique seu e-mail para ativar a conta.",
			user_id: createdUser.id,
			activationLink
		};
	} catch (error) {
		console.error("Erro no registro de usuário:", error);
		if (error.name === 'SequelizeUniqueConstraintError') {
			return { success: false, message: "Este e-mail já está cadastrado." };
		}
		return { success: false, message: error.message || "Erro interno do servidor ao registrar usuário." };
	}
}

// --- Função de refresh de token ---
async function refreshTokenService(token) {
	if (!token) {
		return { success: false, message: "Refresh token não fornecido." };
	}

	try {
		verify(token, jsonSecret.refreshSecret);
		const decodedToken = decode(token);
		const user_id = decodedToken.id;

		// Busca o token no DB, verificando se não está revogado e se ainda não expirou no DB
		const storedRefreshToken = await RefreshToken.findOne({
			where: {
				token,
				user_id,
				is_revoked: false, // <--- Confirme que o campo é 'is_revoked'
				expires_at: { [Op.gt]: new Date() } // Verifica se a data de expiração no DB é maior que agora
			}
		});

		if (!storedRefreshToken) {
			console.log("refreshTokenService: Token não encontrado no DB ou já revogado/expirado.");
			return { success: false, message: "Token inválido ou já utilizado." };
		}
		// Esta verificação é redundante com Op.gt, mas mantida para clareza
		if (new Date() > storedRefreshToken.expires_at) {
			 console.log("refreshTokenService: Token expirado de acordo com expires_at do DB.");
			 return { success: false, message: "Token expirado." };
		}

		const user = await User.findByPk(user_id, {
			attributes: ["id", "email", "name", "active", "phone"]
		});
		if (!user) {
			return { success: false, message: "Usuário não encontrado para o token." };
		}
		if (!user.active) {
			return { success: false, message: "Conta inativa. Por favor, ative sua conta." };
		}

		storedRefreshToken.is_revoked = true; // <--- Corrigido para 'is_revoked'
		await storedRefreshToken.save();

		const newPair = await generatePairToken(user);
		return {
			success: true,
			message: "Token renovado com sucesso!",
			...newPair
		};
	} catch (err) {
		console.error("Erro no refreshTokenService (JWT verify falhou ou outro):", err);
		return { success: false, message: "Refresh token inválido ou expirado (JWT)." };
	}
}

// --- Função de ativação de usuário ---
async function activateUserByToken(token) {
	try {
		const payload = verify(token, jsonSecret.activationSecret);
		const user = await User.findByPk(payload.id);

		if (!user) {
			return { success: false, message: "Usuário não encontrado" };
		}

		if (user.active) {
			return { success: false, message: "Usuário já ativado" };
		}

		user.active = true;
		await user.save();

		return { success: true, message: "Conta ativada com sucesso!" };
	} catch (error) {
		console.error("Erro ao ativar usuário por token:", error);
		return { success: false, message: "Token de ativação inválido ou expirado" };
	}
}

// --- Função de logout ---
async function logoutService(token) {
	try {
		const decodedToken = decode(token);
		if (!decodedToken || !decodedToken.id) {
			return { success: false, message: "Token inválido para logout." };
		}
		const user_id = decodedToken.id;

		// Revoga todos os refresh tokens ativos para o usuário (mais seguro)
		// REMOVIDO 'expired: true'
		await RefreshToken.update(
			{ is_revoked: true }, // <--- Corrigido para 'is_revoked: true' apenas
			{
				where: {
					user_id: user_id,
					is_revoked: false
				}
			}
		);
		return { success: true, message: "Sessão encerrada com sucesso." };
	} catch (error) {
		console.error("Erro no logoutService:", error);
		return { success: false, message: "Falha ao encerrar a sessão." };
	}
}

module.exports = {
	authenticate,
	refreshTokenService,
	logoutService,
	activateUserByToken,
	registerUser
};