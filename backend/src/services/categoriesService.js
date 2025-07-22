const { Category } = require("../models");
const { Op } = require("sequelize");

async function getAllCategories({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
				name: {
					[Op.iLike]: `%${search}%`
				}
		  }
		: undefined;

	const { count, rows } = await Category.findAndCountAll({
		where,
		limit,
		offset,
		order: [[orderBy, orderDirection]],
		attributes: ["id", "name", "createdAt", "updatedAt"]
	});

	return {
		total: count,
		data: rows
	};
}

async function getCategoryById(id) {
	const category = await Category.findByPk(id);

	if (!category) {
		return { message: "Categoria não encontrada!" };
	}

	return category;
}

async function insertCategory(newCategory) {
	try {
		const category = await Category.create(newCategory);
		return category;
	} catch (error) {
		return { message: "Erro ao criar categoria!", error: error.message };
	}
}

async function getCategoriesByName(name) {
	try {
		const categories = await Category.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`
				}
			}
		});
		return categories;
	} catch (error) {
		return { message: "Erro ao buscar categorias pelo nome!", error: error.message };
	}
}

async function updateCategory(updateInfo, id) {
	const [updatedCount] = await Category.update(updateInfo, { where: { id } });

	if (updatedCount === 0) {
		return { message: "Categoria não atualizada!" };
	}

	return { message: "Categoria atualizada com sucesso!" };
}

async function deleteCategoryById(id) {
	const deletedCount = await Category.destroy({ where: { id } });

	if (deletedCount === 0) {
		return { message: "Categoria não encontrada para exclusão!" };
	}

	return { message: "Categoria excluída com sucesso!" };
}

module.exports = {
	getAllCategories,
	getCategoryById,
	insertCategory,
	getCategoriesByName,
	updateCategory,
	deleteCategoryById
};
