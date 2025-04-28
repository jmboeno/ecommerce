const { authenticate } = require("../services/loginService");

async function postLogin(req, res) {
	const { email, password } = req.body;

	if (!email) {
		return res.status(401).json({ message: "Email não informado!" });
	}

	if (!password) {
		return res.status(401).json({ message: "Senha não informada!" });
	}

	try {
		const { accessToken, message } = await authenticate({ email, password });

		if (!accessToken)
			return res.status(400).json({ message });

		return res.status(200).json({ accessToken });
	} catch (error) {
		return res.status(401).json({ message: "Erro no login!" });
	}
}

module.exports = {
	postLogin
};