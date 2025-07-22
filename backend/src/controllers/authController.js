const { authenticate, refreshTokenService, logoutService, activateUserByToken, registerUser } = require("../services/authService");

async function postLogin(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(401).json({ message: "Email e senha são obrigatórios!" });
	}

	try {
		const { accessToken, refreshToken, user, message } = await authenticate({ email, password });

		if (accessToken && refreshToken)
			return res.status(200).json({ accessToken, refreshToken, user });

		return res.status(400).json({ message });
	} catch (error) {
		console.error("Erro no login:", error);
		return res.status(401).json({ message: "Erro no login!" });
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
		const result = await registerUser({ name, email, password });

		if (result.error) {
			return res.status(409).json({ message: result.error });
		}

		return res.status(201).json(result);
	} catch (error) {
		console.error("Erro no registro:", error);
		return res.status(500).json({ message: "Erro interno ao registrar usuário." });
	}
}


async function activateUser(req, res) {
	const { token } = req.params;

	if (!token) {
		return res.status(400).json({ message: "Token de ativação não fornecido" });
	}

	const { error, success } = await activateUserByToken(token);

	if (success) {
		return res.status(200).json({ message: "Usuário ativado com sucesso!" });
	}

	return res.status(400).json({ message: error });
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

module.exports = {
	postLogin,
	getRefresh,
	postUser,
	activateUser,
	logoutUser
};