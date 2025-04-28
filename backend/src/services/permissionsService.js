const { Permission } = require("../models");
const uuid = require("uuid");

async function insertPermission(dto) {
	const permission = await Permission.findOne({
		where: { name: dto.name }
	});

	if (permission) {
		return { message: "Permission já cadastrada!" };
	}

	try {
		const newPermission = await Permission.create({
			id: uuid.v4(),
			name: dto.name,
			description: dto.description
		});

		return newPermission;
	} catch (error) {
		throw new Error(error);
	}
};

async function getAllPermissions() {
	return Permission.findAll({
		order: [["id", "ASC"]],
	});
}

module.exports = {
	getAllPermissions,
	insertPermission
};