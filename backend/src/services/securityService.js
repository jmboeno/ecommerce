const { Sequelize } = require("sequelize");
const { User, Role, Permission } = require("../models");

async function insertAcl(dto, options = {}) {
	const { user_id, roles = [], permissions = [] } = dto;
	const { transaction } = options;

	// Buscar o usuário dentro da transação
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
		],
		transaction
	});

	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	const [registeredRoles, registeredPermissions] = await Promise.all([
		Role.findAll({
			where: { id: { [Sequelize.Op.in]: roles } },
			transaction
		}),
		Permission.findAll({
			where: { id: { [Sequelize.Op.in]: permissions } },
			transaction
		})
	]);

	// Atualizar associações passando transaction
	await user.setUser_roles(registeredRoles, { transaction });
	await user.setUser_permissions(registeredPermissions, { transaction });

	// Recarregar usuário com as associações atualizadas
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
		],
		transaction
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