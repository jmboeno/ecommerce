const { Op } = require("sequelize");
const { User, Role, Permission } = require("../models");
const { hash } = require("bcryptjs");

const ALLOWED_FIELDS = ["id", "name", "email", "phone", "active", "user_roles", "user_permissions"];

async function getAllUsers({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	try {
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

		const transformedData = rows.map(user => {
			const userData = user.toJSON();

			const firstRole = userData.user_roles[0] || {};
			const firstPermission = userData.user_permissions[0] || {};

			return {
				...userData,
				user_roles_id: firstRole.id || null,
				user_roles_name: firstRole.name || null,
				user_permissions_id: firstPermission.id || null,
				user_permissions_name: firstPermission.name || null,
				user_roles: undefined,
				user_permissions: undefined
			};
		});

		return {
			total: count,
			data: transformedData
		};
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		throw new Error("Erro ao buscar usuários");
	}
}

async function getUserById(id, fields = null) {
	try {
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
			if (!ALLOWED_FIELDS.includes(field)) continue;

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
			attributes: baseAttributes.length > 0 ? baseAttributes : undefined,
			include: includes.length > 0 ? includes : undefined
		});
	} catch (error) {
		console.error("Erro ao buscar usuário por ID:", error);
		throw new Error("Erro ao buscar usuário");
	}
}

async function insertUser(dto) {
	try {
		const existing = await User.findOne({ where: { email: dto.email } });
		if (existing) {
			throw new Error("Usuário já cadastrado");
		}

		const password_hash = await hash(dto.password, 8);
		const user = await User.create({ ...dto, password_hash });

		const userSafe = user.toJSON();
		delete userSafe.password_hash;

		return userSafe;
	} catch (error) {
		console.error("Erro ao criar usuário:", error);
		throw new Error(error.message || "Erro ao criar usuário");
	}
}

async function updateUser(payload, id) {
	try {
		const user = await User.scope("withPassword").findByPk(id);

		if (!user) {
			throw new Error("Usuário não encontrado.");
		}

		const {
			role_ids,
			permission_ids,
			password,
			...userFields
		} = payload;

		await user.update(userFields);

		if (password) {
			user.password = password;
			await user.save();
		}

		if (role_ids !== undefined) {
			await user.setUser_roles(role_ids);
		}

		if (permission_ids !== undefined) {
			await user.setUser_permissions(permission_ids);
		}

		return { message: "Usuário atualizado com sucesso!" };
	} catch (error) {
		console.error("Erro ao atualizar usuário:", error);
		throw new Error(error.message || "Erro ao atualizar usuário");
	}
}

async function deleteUserById(id) {
	try {
		const deleted = await User.destroy({ where: { id } });

		if (deleted === 0) {
			throw new Error("Usuário não encontrado para exclusão!");
		}

		return { message: "Usuário excluído com sucesso!" };
	} catch (error) {
		console.error("Erro ao deletar usuário:", error);
		throw new Error(error.message || "Erro ao deletar usuário");
	}
}

module.exports = {
	getAllUsers,
	getUserById,
	insertUser,
	updateUser,
	deleteUserById
};