const { getAllSuppliers, insertSupplier, getSupplierById, getSupplierByName, updateSupplier, deleteSupplierById } = require("../services/suppliersService");

async function getSuppliers(req, res) {
	try {
		const listAllProviers = await getAllSuppliers(req.query);
		return res.status(200).json(listAllProviers);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getSupplier(req, res) {
	try {
		const { id } = req.params;

		if (id && Number(id)) {
			const category = await getSupplierById(id);

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

async function postSupplier(req, res) {
	try {
		const newCategory = req.body;

		if (newCategory.name) {
			const createdCategory = await insertSupplier(newCategory);
			return res.status(201).json(createdCategory);
		} else {
			return res.status(422).json({ message: "O campo nome é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function searchSupplierByName(req, res) {
	try {
		const { name } = req.query;

		if (!name) {
			return res.status(400).json({ message: "Parâmetro 'name' é obrigatório" });
		}

		const categories = await getSupplierByName(name);

		if (categories.length === 0) {
			return res.status(404).json({ message: "Nenhum provedor encontrado com esse nome" });
		}

		return res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchSupplier(req, res) {
	const id = req.params.id;
	const newinfo = req.body;

	try {
		const message = await updateSupplier(newinfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deleteSupplier(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deleteSupplierById(id);

			if (message.message === "Provedor não encontrado para exclusão!") {
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
	getSuppliers,
	getSupplier,
	postSupplier,
	searchSupplierByName,
	patchSupplier,
	deleteSupplier
};