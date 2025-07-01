const { Op } = require("sequelize");
const { User, Role, Permission } = require("../models");
const { hash } = require("bcryptjs");

async function getAllUsers({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const whereUser = search
		? {
			name: {
				[Op.iLike]: `%${search}%`
			}
		}
		: {};

	const { count, rows } = await User.findAndCountAll({
		where: whereUser,
		attributes: {
			exclude: ["password_hash"]
		},
		include: [
			{
				model: Role,
				as: "user_roles",
				attributes: ["id", "name"],
				through: { attributes: [] }
			},
			{
				model: Permission,
				as: "user_permissions",
				attributes: ["id", "name"],
				through: { attributes: [] }
			}
		],
		limit,
		offset,
		order: [[orderBy, orderDirection]]
	});

	// Transformar os dados
	const transformedData = rows.map(user => {
		const userData = user.toJSON();

		const user_roles_ids = userData.user_roles.map(role => role.id);
		const user_roles_names = userData.user_roles.map(role => role.name);

		const user_permissions_ids = userData.user_permissions.map(permission => permission.id);
		const user_permissions_names = userData.user_permissions.map(permission => permission.name);

		return {
			...userData,
			user_roles_ids,
			user_roles_names,
			user_permissions_ids,
			user_permissions_names,
			user_roles: undefined,
			user_permissions: undefined
		};
	});

	return {
		total: count,
		data: transformedData
	};
}

async function getUserById(id, fields = null) {
	const baseAttributes = [];
	const includes = [];

	if (!fields) {
		return await User.findByPk(id, {
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
	}

	for (const field of fields) {
		if (field === "user_roles") {
			includes.push({
				model: Role,
				as: "user_roles",
				attributes: ["id", "name", "description"],
				through: { attributes: [] }
			});
		} else if (field === "user_permissions") {
			includes.push({
				model: Permission,
				as: "user_permissions",
				attributes: ["id", "name", "description"],
				through: { attributes: [] }
			});
		} else {
			baseAttributes.push(field);
		}
	}

	return await User.findByPk(id, {
		attributes: baseAttributes,
		include: includes.length > 0 ? includes : undefined
	});
}

async function insertUser(dto) {
	const userByEmail = await User.findOne({
		where: { email: dto.email }
	});

	if (userByEmail) {
		return { message: "Usuário já cadastrado"};
	}

	const password_hash = await hash(dto.password, 8);

	const newUser = await User.create({
		...dto,
		password_hash
	});

	try {
		return newUser;
	} catch (error) {
		return { message: "Erro ao criar usuário!", error: error.message };
	}
}

async function updateUser(payload, id) {
	try {
		const user = await User.findByPk(id);

		if (!user) {
			return { message: "Usuário não encontrado." };
		}

		const {
			user_roles,
			user_permissions,
			...userFields
		} = payload;

		await user.update(userFields);

		if (user_roles) {
			const roleIds = Array.isArray(user_roles)
				? user_roles
				: [user_roles];
			await user.setUser_roles(roleIds);
		}

		if (user_permissions) {
			const permissionIds = Array.isArray(user_permissions)
				? user_permissions
				: [user_permissions];
			await user.setUser_permissions(permissionIds);
		}

		return { message: "Usuário atualizado com sucesso!" };
	} catch (error) {
		console.error("Erro ao atualizar usuário:", error);
		return { message: "Erro ao atualizar usuário." };
	}
}

async function deleteUserById(id) {
	const deletedUser = await User.destroy({ where: { id } });

	if (deletedUser === 0) {
		return { message: "Usuário não encontrado para exclusão!" };
	}

	return { message: "Usuário excluído com sucesso!" };
}

module.exports = {
	getAllUsers,
	getUserById,
	insertUser,
	updateUser,
	deleteUserById
};