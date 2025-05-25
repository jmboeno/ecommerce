const { decode } = require("jsonwebtoken");
const { getUserById, updateUser } = require("../services/usersService");

function getTokenInfo(req) {
	const token = req.headers.authorization;
	const [_, accessToken] = token.split(" ");
	return decode(accessToken);
}

async function getProfile(req, res) {
	const { id } = getTokenInfo(req);

	try {
		const user = await getUserById(id, ["id", "name", "phone", "email", "user_roles"]);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchProfile(req, res) {
	const { id } = getTokenInfo(req);
	const newinfo = req.body;

	if (id !== parseInt(req.params.id)) {
		return res.status(422).json({ message: "Operação não autorizada" });
	}

	try {
		const message = await updateUser(newinfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	getProfile,
	patchProfile
};