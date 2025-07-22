const { Supplier } = require("../models");
const { Sequelize, Op } = require("sequelize");


async function getAllSuppliers({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
			name: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const { count, rows } = await Supplier.findAndCountAll({
		where,
		limit,
		offset,
		order: [[orderBy, orderDirection]],
		attributes: ["id", "name", "createdAt", "updatedAt"],
		raw: true
	});

	return {
		total: count,
		data: rows
	};
}

async function getSupplierById(id) {
	const category = await Supplier.findByPk(id);

	if (!category) {
		return { message: "Provedor não encontrado!" };
	}

	return category;
}

async function insertSupplier(newSupplier) {
	try {
		const category = await Supplier.create(newSupplier);
		return category;
	} catch (error) {
		return { message: "Erro ao criar usuário!", error: error.message };
	}
}

async function getSupplierByName(name) {
	try {
		const categories = await Supplier.findAll({
			where: {
				name: {
					[Sequelize.Op.iLike]: `%${name}%`
				}
			}
		});

		return categories;
	} catch (error) {
		return { message: "Erro ao buscar Provedors pelo nome!" };
	}
}

async function updateSupplier(updateInfo, id) {
	const updatedList = await Supplier.update(updateInfo, { where: { id } });

	if (updatedList[0] === 0) {
		return { message: "Registro não atualizado!" };
	}

	return { message: "Registro atualizado!" };
}

async function deleteSupplierById(id) {
	const deletedSupplier = await Supplier.destroy({ where: { id } });

	if (deletedSupplier === 0) {
		return { message: "Provedor não encontrado para exclusão!" };
	}

	return { message: "Provedor excluído com sucesso!" };
}

module.exports = {
	getAllSuppliers,
	getSupplierById,
	insertSupplier,
	getSupplierByName,
	updateSupplier,
	deleteSupplierById
};