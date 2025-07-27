const { authenticate, refreshTokenService, logoutService, activateUserByToken, registerUser, resendActivationLinkService } = require("../services/authService");

async function postLogin(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(401).json({ message: "Email e senha são obrigatórios!" });
	}

	try {
		const { success, accessToken, refreshToken, user, message } = await authenticate({ email, password });

		if (success) {
			return res.status(200).json({ accessToken, refreshToken, user });
		} else {
			return res.status(401).json({ message: message || "Erro na autenticação. Verifique suas credenciais." });
		}
	} catch (error) {
		console.error("Erro inesperado no login:", error);
		return res.status(500).json({ message: "Erro interno do servidor!" });
	}
}

async function getRefresh(req, res) {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "RefreshToken não informado!" });
	}

	try {
		const {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			error,
			message
		} = await refreshTokenService(token);

		if (newAccessToken && newRefreshToken)
			return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

		return res.status(400).json({ message: error || message || "Token inválido." });
	} catch (error) {
		console.error("Erro ao atualizar token:", error);
		return res.status(401).json({ message: "Erro ao atualizar token!" });
	}
}

async function postUser(req, res) {
	const { name, email, password } = req.body;

	try {
		const { message, success } = await registerUser({ name, email, password });

		if (success) {
			return res.status(201).json({ message });
		}

		return res.status(409).json({ message });
	} catch (error) {
		console.error("Erro no registro:", error);
		return res.status(500).json({ message: "Erro interno ao registrar usuário." });
	}
}


async function activateUser(req, res) {
	const { token } = req.params;

	console.log(token);

	if (!token) {
		return res.status(400).json({ message: "Token de ativação não fornecido" });
	}

	const { success, message } = await activateUserByToken(token);

	if (success) {
		return res.status(200).json({ message });
	}

	return res.status(400).json({ message });
}

async function logoutUser(req, res) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(400).json({ message: "Token não fornecido ou mal formatado" });
	}

	const token = authHeader.split(" ")[1];

	try {
		await logoutService(token);
		return res.status(200).json({ message: "Logout realizado com sucesso" });
	} catch (err) {
		console.error("Erro no logout:", err);
		return res.status(500).json({ message: "Erro ao realizar logout" });
	}
}

async function resendActivationToken(req, res) {
	const { token } = req.body; // O frontend enviará o token no corpo

	if (!token) {
		return res.status(400).json({ message: "Token de ativação não fornecido." });
	}

	try {
		// Chame a nova função de serviço
		const result = await resendActivationLinkService(token);

		if (result.success) {
			return res.status(200).json({ message: result.message });
		}
		// Se o serviço não lançar um erro, mas retornar sucesso: false
		return res.status(400).json({ message: result.message || "Falha desconhecida ao reenviar token." });

	} catch (error) {
		console.error("Erro no controller resendActivationToken:", error);
		// Trate os erros lançados pelo serviço
		if (error.message === "Usuário não encontrado para este token.") {
			return res.status(404).json({ message: error.message });
		}
		if (error.message === "Sua conta já está ativa. Por favor, faça login.") {
			return res.status(400).json({ message: error.message });
		}
		if (error.message === "Token de ativação inválido.") { // JWT malformado
			return res.status(400).json({ message: error.message });
		}
		// Para TokenExpiredError, o serviço já o decodifica, mas se o verify falhar de outra forma
		if (error.name === 'JsonWebTokenError') {
			return res.status(400).json({ message: "Token de ativação inválido ou formato incorreto." });
		}
		if (error.name === 'TokenExpiredError') { // Embora o serviço tente decodificar, o erro original ainda pode ser um TokenExpiredError
			return res.status(400).json({ message: "O token de ativação original expirou. Um novo foi gerado, verifique seu e-mail." });
		}


		return res.status(500).json({ message: "Erro interno do servidor ao reenviar token." });
	}
}

module.exports = {
	postLogin,
	getRefresh,
	postUser,
	activateUser,
	logoutUser,
	resendActivationToken
};