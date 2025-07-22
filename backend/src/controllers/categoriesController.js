const { getAllCategories, insertCategory, getCategoryById, getCategoriesByName, updateCategory, deleteCategoryById } = require("../services/categoriesService");

async function getCategories(req, res) {
	try {
		const listAllCategories = await getAllCategories(req.query);
		return res.status(200).json(listAllCategories);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getCategory(req, res) {
	try {
		const { id } = req.params;

		if (id && Number(id)) {
			const category = await getCategoryById(id);

			if (category.message) {
				return res.status(404).json(category);
			}

			return res.status(200).json(category);
		} else {
			return res.status(422).json({ message: "Id inválido" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function postCategory(req, res) {
	try {
		const newCategory = req.body;

		if (newCategory.name) {
			const createdCategory = await insertCategory(newCategory);
			return res.status(201).json(createdCategory);
		} else {
			return res.status(422).json({ message: "O campo nome é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function searchCategoriesByName(req, res) {
	try {
		const { name } = req.query;

		if (!name) {
			return res.status(400).json({ message: "Parâmetro 'name' é obrigatório" });
		}

		const categories = await getCategoriesByName(name);

		if (categories.length === 0) {
			return res.status(404).json({ message: "Nenhum categoryo encontrado com esse nome" });
		}

		return res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchCategory(req, res) {
	const id = req.params.id;
	const newinfo = req.body;

	try {
		const message = await updateCategory(newinfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deleteCategory(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deleteCategoryById(id);

			if (message.message === "Categoryo não encontrado para exclusão!") {
				return res.status(404).json(message);
			}

			return res.status(200).json(message);
		} else {
			return res.status(422).json({ message: "Id inválido" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	getCategories,
	getCategory,
	postCategory,
	searchCategoriesByName,
	patchCategory,
	deleteCategory
};