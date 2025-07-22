const { verify } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Access token não informado" });
	}

	// Espera o formato: "Bearer token"
	const [scheme, token] = authHeader.split(" ");

	if (scheme !== "Bearer" || !token) {
		return res.status(401).json({ message: "Formato do token inválido" });
	}

	try {
		const decoded = verify(token, jsonSecret.secret);

		// Passar dados do usuário para os próximos middlewares/controladores
		req.user_id = decoded.id;
		req.user_email = decoded.email;

		next();
	} catch (error) {
		return res.status(401).json({ message: "Usuário não autorizado" });
	}
};
