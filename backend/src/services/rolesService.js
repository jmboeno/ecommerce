const { Role, Permission } = require("../models");
const uuid = require("uuid");

async function insertRole(dto) {
	const role = await Role.findOne({
		where: { name: dto.name }
	});

	if (role) {
		return { message: "Role já cadastrada!" };
	}

	try {
		const newRole = await Role.create({
			id: uuid.v4(),
			name: dto.name,
			description: dto.description
		});

		return newRole;
	} catch (error) {
		throw new Error("Erro ao cadastrar role");
	}
};

async function getAllRoles({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
			name: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const { count, rows } = await Role.findAndCountAll({
		where,
		limit,
		offset,
		order: [[orderBy, orderDirection]],
		attributes: ["id", "name", "description", "createdAt", "updatedAt"],
		raw: true
	});

	return {
		total: count,
		data: rows
	};
}

module.exports = {
	getAllRoles,
	insertRole
};