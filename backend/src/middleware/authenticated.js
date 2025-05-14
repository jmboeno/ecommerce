const { verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).send("Access token não informado");
	}

	const [_, accessToken] = token.split(" ");

	try {
		verify(accessToken, jsonSecret.secret);

		const { id, email } = decode(accessToken);

		req.user_id = id;
		req.user_email = email;

		return next();
	} catch (error) {
		res.status(401).send("Usuário não autorizado");
	}
};