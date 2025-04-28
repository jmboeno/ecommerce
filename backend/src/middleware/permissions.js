const { User, Permission } = require("../models");

const permissions = (permissionsList) => {
	return async (req, res, next) => {
		const { user_id } = req;
		const user = await User.findOne({
			include: [
				{
					model: Permission,
					as: "user_permissions",
					attributes: ["id", "name"]
				}
			],
			where: {
				id: user_id
			}
		});

		if (!user) {
			return res.status(401).send("Usuário não cadastrado");
		}

		const registeredPermissions = user.user_permissions
			.map((permission) => permission.name)
			.some((permission) => permissionsList.includes(permission));

		if (!registeredPermissions) {
			return res.status(401).send("Usuário não possui acesso a essa rota!");
		}

		return next();
	};
};

module.exports = { permissions };