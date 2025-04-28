const { insertAcl, insertPermissionRole } = require("../services/securityService");

async function postAcl(req, res) {
	const { roles, permissions } = req.body;
	const { user_id } = req;

	try {
		const acl = await insertAcl({
			roles,
			permissions,
			user_id
		});

		return res.status(200).json(acl);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

async function postPermissionRole(req, res) {
	const { role_id, permissions } = req.body;

	try {
		const permissionRole = await insertPermissionRole({
			role_id,
			permissions
		});

		return res.status(200).json(permissionRole);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

module.exports = {
	postAcl,
	postPermissionRole
};