const { Sequelize } = require("sequelize");
const { User, Role, Permission } = require("../models");

async function insertAcl(dto) {
	const user = await User.findOne({
		includes: [
			{
				model: Role,
				as: "user_roles",
				attributes: ["id", "name", "description"]
			},
			{
				model: Permission,
				as: "user_permissions",
				attributes: ["id", "name", "description"]
			}
		],
		where: { id: dto.user_id }
	});

	if (!user) {
		throw new Error("Usuário não cadastrado");
	}

	const registeredRoles = await Role.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: dto.roles
			}
		}
	});

	const registeredPermissions = await Permission.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: dto.permissions
			}
		}
	});

	await user.removeUser_roles(user.users_roles);
	await user.removeUser_permissions(user.users_permissions);

	await user.addUser_roles(registeredRoles);
	await user.addUser_permissions(registeredPermissions);

	const newUser = await User.findOne({
		include: [
			{
				model: Role,
				as: "user_roles",
				attributes: ["id", "name", "description"],
				through: { attributes: [] }
			},
			{
				model: Permission,
				as: "user_permissions",
				attributes: ["id", "name", "description"],
				through: { attributes: [] }
			}
		],
		where: { id: dto.user_id }
	});

	return newUser;
}

async function insertPermissionRole(dto) {
	const role = await Role.findOne({
		include: [
			{
				model: Permission,
				as: "roles_from_permissions",
				attributes: ["id", "name", "description"]
			}
		],
		where: {
			id: dto.role_id
		}
	});

	if (!role) {
		throw new Error("Role não cadastrada");
	}

	const registeredPermissions = await Permission.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: dto.permissions
			}
		}
	});

	await role.removeRoles_from_permissions(role.roles_from_permissions);
	await role.addRoles_from_permissions(registeredPermissions);

	const newRole = await Role.findOne({
		include: [
			{
				model: Permission,
				as: "roles_from_permissions",
				attributes: ["id", "name", "description"]
			}
		],
		where: {
			id: dto.role_id
		}
	});

	return newRole;
}

module.exports = {
	insertAcl,
	insertPermissionRole
};