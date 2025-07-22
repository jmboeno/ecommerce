const { Product, Category, Supplier } = require("../models");
const { Op } = require("sequelize");

async function getAllProducts({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	// Filtro de busca no nome do produto
	const whereProduct = search
		? {
			name: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	// Montar order para includes e colunas simples
	const order = (() => {
		if (orderBy.includes(".")) {
			const [association, field] = orderBy.split(".");
			if (association === "category") {
				return [[{ model: Category, as: "category" }, field, orderDirection]];
			}
			if (association === "supplier") {
				return [[{ model: Supplier, as: "supplier" }, field, orderDirection]];
			}
		}
		return [[orderBy, orderDirection]];
	})();

	const { count, rows } = await Product.findAndCountAll({
		where: whereProduct,
		include: [
			{
				model: Category,
				as: "category",
				attributes: ["id", "name"]
			},
			{
				model: Supplier,
				as: "supplier",
				attributes: ["id", "name"]
			}
		],
		limit,
		offset,
		order,
	});

	return {
		total: count,
		data: rows
	};
}

async function getProductById(id) {
	const product = await Product.findByPk(id, {
		include: [
			{ model: Category, as: "category", attributes: ["id", "name"] },
			{ model: Supplier, as: "supplier", attributes: ["id", "name"] }
		]
	});
	if (!product) {
		return { message: "Produto não encontrado!" };
	}
	return product;
}

async function insertProduct(newProduct) {
	try {
		const product = await Product.create(newProduct);
		return product;
	} catch (error) {
		return { message: "Erro ao criar produto!", error: error.message };
	}
}

async function updateProduct(updateInfo, id) {
	const [updatedCount] = await Product.update(updateInfo, { where: { id } });

	if (updatedCount === 0) {
		return { message: "Produto não atualizado!" };
	}

	return { message: "Produto atualizado!" };
}

async function deleteProductById(id) {
	const deletedCount = await Product.destroy({ where: { id } });

	if (deletedCount === 0) {
		return { message: "Produto não encontrado para exclusão!" };
	}

	return { message: "Produto excluído com sucesso!" };
}

module.exports = {
	getAllProducts,
	getProductById,
	insertProduct,
	updateProduct,
	deleteProductById,
};
