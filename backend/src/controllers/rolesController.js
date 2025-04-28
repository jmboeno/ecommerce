const { getAllRoles, insertRole } = require("../services/rolesService");

async function postRole(req, res) {
	const { name, description } = req.body;

	try {
		const role = await insertRole({ name, description });

		return res.status(200).json(role);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function getRoles(req, res) {
	try {
		const listAllRoles = await getAllRoles();
		return res.status(200).json(listAllRoles);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	getRoles,
	postRole
};