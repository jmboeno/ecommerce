const { Sequelize } = require("sequelize");
const { User, Role, Permission } = require("../models");

async function insertAcl(dto) {
	const { user_id, roles = [], permissions = [] } = dto;

	// Buscar o usuário com suas roles e permissions atuais
	const user = await User.findOne({
		where: { id: user_id },
		include: [
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
		]
	});

	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	// Buscar as roles e permissions válidas
	const [registeredRoles, registeredPermissions] = await Promise.all([
		Role.findAll({
			where: { id: { [Sequelize.Op.in]: roles } }
		}),
		Permission.findAll({
			where: { id: { [Sequelize.Op.in]: permissions } }
		})
	]);

	// Atualizar as associações de roles e permissions do usuário
	await user.setUser_roles(registeredRoles);
	await user.setUser_permissions(registeredPermissions);

	// Recarregar o usuário com as associações atualizadas
	const updatedUser = await User.findOne({
		where: { id: user_id },
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
		]
	});

	return updatedUser;
}

async function insertPermissionRole(dto) {
	const { role_id, permissions = [] } = dto;

	// Buscar a role com suas permissions atuais
	const role = await Role.findOne({
		where: { id: role_id },
		include: [
			{
				model: Permission,
				as: "roles_from_permissions",
				attributes: ["id", "name", "description"]
			}
		]
	});

	if (!role) {
		throw new Error("Role não encontrada");
	}

	// Buscar as permissions válidas
	const registeredPermissions = await Permission.findAll({
		where: {
			id: { [Sequelize.Op.in]: permissions }
		}
	});

	// Atualizar as associações de permissions da role
	await role.setRoles_from_permissions(registeredPermissions);

	// Recarregar a role com as associações atualizadas
	const updatedRole = await Role.findOne({
		where: { id: role_id },
		include: [
			{
				model: Permission,
				as: "roles_from_permissions",
				attributes: ["id", "name", "description"]
			}
		]
	});

	return updatedRole;
}

module.exports = {
	insertAcl,
	insertPermissionRole
};