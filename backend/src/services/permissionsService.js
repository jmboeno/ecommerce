const { Op } = require("sequelize");
const { Permission } = require("../models");
const uuid = require("uuid");

async function getAllPermissions({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
			name: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const { count, rows } = await Permission.findAndCountAll({
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

module.exports = {
	getAllPermissions,
	insertPermission
};