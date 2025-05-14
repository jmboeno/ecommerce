const { authenticate, refreshToken } = require("../services/authService");
const { insertAcl } = require("../services/securityService");
const { insertUser } = require("../services/usersService");

async function postLogin(req, res) {
	const { email, password } = req.body;

	if (!email) {
		return res.status(401).json({ message: "Email não informado!" });
	}

	if (!password) {
		return res.status(401).json({ message: "Senha não informada!" });
	}

	try {
		const { accessToken, refreshToken, message } = await authenticate({ email, password });

		if ( accessToken && refreshToken)
			return res.status(200).json({ accessToken, refreshToken });

		return res.status(400).json({ message });
	} catch (error) {
		return res.status(401).json({ message: "Erro no login!" });
	}
}

async function getRefresh(req, res) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "RefreshToken não informado!" });
	}

	const [_, currentRefreshToken] = token.split(" ");

	try {
		const {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			message
		} = await refreshToken(currentRefreshToken);

		if (newAccessToken && newRefreshToken)
			return res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken
			});

		return res.status(400).json({ message });
	} catch (error) {
		return res.status(401).json({ message: "Erro ao atualizar token!" });
	}
}

async function postUser(req, res) {
	try {
		const newUser = req.body;

		if (newUser.email && newUser.password) {
			const createdUser = await insertUser({ ...newUser, active: false });

			if (createdUser.id) {
				const acl = await insertAcl({
					user_id: createdUser.id,
					roles: ["77996b62-ee9e-4565-9b27-8042e3f1a9aa"],
					permissions: ["c82dcce8-299c-409e-8b94-0c93a02079e8"]
				});
		
				return res.status(200).json(acl);
			}

			return res.status(200).json(createdUser);

		} else {
			return res.status(422).json({ message: "Os campos email e senha são obrigatórios" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	postLogin,
	getRefresh,
	postUser
};