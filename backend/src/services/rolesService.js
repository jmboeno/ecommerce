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

async function getAllRoles() {
	return Role.findAll({
		order: [["id", "ASC"]],
	});
}

module.exports = {
	getAllRoles,
	insertRole
};