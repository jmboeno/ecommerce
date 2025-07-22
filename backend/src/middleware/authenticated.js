const { verify } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { BlacklistedToken } = require("../models");

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Access token não informado" });
	}

	const [scheme, token] = authHeader.split(" ");

	if (scheme !== "Bearer" || !token) {
		return res.status(401).json({ message: "Formato do token inválido" });
	}

	try {
		// Verifica assinatura
		const decoded = verify(token, jsonSecret.secret);

		// Verifica se o token foi revogado (blacklist)
		const isBlacklisted = await BlacklistedToken.findOne({ where: { token } });
		if (isBlacklisted) {
			return res.status(401).json({ message: "Token revogado. Faça login novamente." });
		}

		// Passa informações do usuário adiante
		req.user_id = decoded.id;
		req.user_email = decoded.email;

		next();
	} catch (error) {
		console.error("Erro na autenticação:", error);
		return res.status(401).json({ message: "Usuário não autorizado" });
	}
};
