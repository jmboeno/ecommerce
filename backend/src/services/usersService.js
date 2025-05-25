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
		limit,
		offset,
		order: [[orderBy, orderDirection]]
	});

	return {
		total: count,
		data: rows
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

async function updateUser(updateInfo, id) {
	const updatedList = await User.update(updateInfo, { where: { id } });

	if (updatedList[0] === 0) {
		return { message: "Registro não atualizado!" };
	}

	return { message: "Registro atualizado!" };
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