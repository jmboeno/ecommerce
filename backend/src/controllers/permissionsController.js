const { getAllPermissions, insertPermission } = require("../services/permissionsService");

async function postPermission(req, res) {
	const { name, description } = req.body;

	try {
		const permission = await insertPermission({ name, description });

		return res.status(200).json(permission);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function getPermissions(req, res) {
	try {
		const listAllPermissions = await getAllPermissions(req.query);
		return res.status(200).json(listAllPermissions);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	getPermissions,
	postPermission
};