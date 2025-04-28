const { User, Role } = require("../models");

const roles = (rolesList) => {
	return async (req, res, next) => {
		const { user_id } = req;
		const user = await User.findOne({
			include: [
				{
					model: Role,
					as: "user_roles",
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

		const registeredRoles = user.user_roles
			.map((role) => role.name)
			.some((role) => rolesList.includes(role));

		if (!registeredRoles) {
			return res.status(401).send("Usuário não possui acesso a essa rota!");
		}

		return next();
	};
};

module.exports = { roles };