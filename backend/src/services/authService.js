const { User, Role, RefreshToken, BlacklistedToken, sequelize } = require("../models");
const { sign, verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { Op } = require('sequelize');
const { sendActivationEmail } = require("./emailService");

const MIN_LOGIN_TIME_MS = 2000;
const ACTIVATION_TOKEN_EXPIRATION = "1d";
const ACTIVATION_URL_BASE = "http://localhost:5173/auth/activate";

// --- Função auxiliar para gerar tokens ---
async function generatePairToken(user) {
	if (!user || !user.id) {
		throw new Error("Usuário inválido para geração de token");
	}

	const userWithRoles = await User.findByPk(user.id, {
		include: [{ model: Role, as: "user_roles", attributes: ["name"] }]
	});

	const userRoleName = userWithRoles.user_roles && userWithRoles.user_roles.length > 0 ? userWithRoles.user_roles[0].name : "Cliente";

	const accessToken = sign(
		{ id: user.id, email: user.email, name: user.name, role: userRoleName },
		jsonSecret.secret,
		{ expiresIn: "15m" }
	);

	const refreshToken = sign(
		{ id: user.id },
		jsonSecret.refreshSecret,
		{ expiresIn: "7d" }
	);

	await RefreshToken.update(
		{ is_revoked: true },
		{
			where: {
				user_id: user.id,
				is_revoked: false,
				expires_at: { [Op.gt]: new Date() }
			}
		}
	);

	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	await RefreshToken.create({
		user_id: user.id,
		token: refreshToken,
		is_revoked: false,
		expires_at: expiresAt,
	});

	return {
		accessToken,
		refreshToken,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: userRoleName
		}
	};
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function authenticate({ email, password }) {
	const startTime = Date.now();

	const user = await User.scope("withPassword").findOne({
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

async function registerUser({ name, email, password, phone }) {
	if (!name || !email || !password) {
		return { success: false, message: "Nome, email e senha são obrigatórios." };
	}

	const t = await sequelize.transaction();

	try {
		const createdUser = await User.create(
			{ name, email, password, phone, active: false },
			{ transaction: t }
		);

		const customerRole = await sequelize.models.Role.findOne({ where: { name: "Cliente" }, transaction: t });
		if (customerRole) {
			await createdUser.addUser_role(customerRole, { transaction: t });
		} else {
			console.warn("Role 'Cliente' não encontrada. Usuário registrado sem role padrão.");
		}
		
		const activationToken = sign(
			{ id: createdUser.id, email: createdUser.email },
			jsonSecret.activationSecret,
			{ expiresIn: ACTIVATION_TOKEN_EXPIRATION }
		);

		const activationLink = `${ACTIVATION_URL_BASE}/${activationToken}`;

		await sendActivationEmail(createdUser.email, activationLink, createdUser.name);

		await t.commit();

		return {
			success: true,
			message: "Usuário registrado com sucesso! Verifique seu e-mail para ativar a conta.",
			user_id: createdUser.id,
		};
	} catch (error) {
		await t.rollback();
		console.error("Erro no registro de usuário:", error);
		if (error.name === 'SequelizeUniqueConstraintError') {
			return { success: false, message: "Este e-mail já está cadastrado." };
		}
		if (error.response || error.code) {
			return { success: false, message: "Erro ao enviar email de ativação. Tente novamente." };
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

		const storedRefreshToken = await RefreshToken.findOne({
			where: {
				token,
				user_id,
				is_revoked: false,
				expires_at: { [Op.gt]: new Date() }
			}
		});

		if (!storedRefreshToken) {
			console.log("refreshTokenService: Token não encontrado no DB ou já revogado/expirado.");
			return { success: false, message: "Token inválido ou já utilizado." };
		}
		if (new Date() > storedRefreshToken.expires_at) {
			 console.log("refreshTokenService: Token expirado de acordo com expires_at do DB.");
			 return { success: false, message: "Token expirado." };
		}

		// Use o escopo 'withPassword' (que agora inclui roles) para buscar o usuário
		const user = await User.scope("withPassword").findByPk(user_id); // <--- Busca com roles
		if (!user) {
			return { success: false, message: "Usuário não encontrado para o token." };
		}
		if (!user.active) {
			return { success: false, message: "Conta inativa. Por favor, ative sua conta." };
		}

		storedRefreshToken.is_revoked = true;
		await storedRefreshToken.save();

		const newPair = await generatePairToken(user); // Isso já inclui a role
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

		if (user.active) {
			return { success: false, message: "Token de ativação inválido ou expirado" };
		}

		user.active = true;
		await user.save();

		return { success: true, message: "Conta ativada com sucesso!" };
	} catch (error) {
		console.error("Erro ao ativar usuário por token:", error);
		return { success: false, message: "Token de ativação inválido ou expirado" };
	}
}

async function logoutService(token) {
	try {
		const decodedToken = decode(token);
		if (!decodedToken || !decodedToken.id) {
			return { success: false, message: "Token inválido para logout." };
		}

		const user_id = decodedToken.id;

		// Adiciona accessToken na blacklist
		await BlacklistedToken.create({
			token,
			user_id,
			expires_at: new Date(decodedToken.exp * 1000) // JWT expiration
		});

		// Revoga todos os refresh tokens do usuário
		await RefreshToken.update(
			{ is_revoked: true },
			{ where: { user_id, is_revoked: false } }
		);

		return { success: true, message: "Sessão encerrada com sucesso." };
	} catch (error) {
		console.error("Erro no logoutService:", error);
		return { success: false, message: "Falha ao encerrar a sessão." };
	}
}

/**
 * Lógica para reenviar um link de ativação com base em um token expirado/inválido.
 * Esta função deve ser chamada APENAS pelo backend.
 * @param {string} token - O token de ativação (pode estar expirado ou inválido).
 * @returns {Promise<object>} - { success: boolean, message: string, activationLink?: string }
 */
async function resendActivationLinkService(token) {
	if (!token) {
		throw new Error("Token de ativação não fornecido."); // O controller deve validar isso, mas é um bom guarda
	}

	try {
		// Tenta verificar o token. Se ele estiver expirado, `verify` lançará um erro.
		// Se for para um reenvio, esperamos que o token original esteja expirado.
		let payload;
		try {
			payload = verify(token, jsonSecret.activationSecret); // Tenta verificar normalmente
		} catch (error) {
			if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
				// Se o token estiver expirado ou for inválido, decodificamos apenas o payload
				// para tentar buscar o usuário e reenviar o link.
				// Isso permite reenviar links mesmo que o original tenha expirado.
				payload = decode(token);
				if (!payload || !payload.id) {
					throw new Error("Payload do token inválido para reenviar.");
				}
			} else {
				throw error; // Outros erros não relacionados a JWT
			}
		}

		const user = await User.findByPk(payload.id); // Busca o usuário pelo ID do token

		if (!user) {
			throw new Error("Usuário não encontrado para este token.");
		}

		if (user.active) {
			throw new Error("Sua conta já está ativa. Por favor, faça login.");
		}

		// Gera um novo token de ativação
		const newActivationToken = sign(
			{ id: user.id, email: user.email },
			jsonSecret.activationSecret,
			{ expiresIn: ACTIVATION_TOKEN_EXPIRATION }
		);

		const activationLink = `${ACTIVATION_URL_BASE}/${newActivationToken}`; // URL do seu frontend
		// TODO: Chame seu serviço de envio de e-mail aqui
		// Ex: await sendActivationEmail(user.email, activationLink);
		console.log(`[BACKEND - SERVICE] Novo link de ativação gerado e "enviado" para ${user.email}: ${activationLink}`);

		return { success: true, message: "Link de ativação reenviado para o seu e-mail!", activationLink: activationLink };

	} catch (error) {
		console.error("Erro no resendActivationLinkService:", error);
		// Os erros lançados aqui serão capturados pelo controller.
		throw error; // Re-lança o erro com a mensagem original ou um erro genérico
	}
}

module.exports = {
	authenticate,
	refreshTokenService,
	logoutService,
	activateUserByToken,
	registerUser,
	resendActivationLinkService
};