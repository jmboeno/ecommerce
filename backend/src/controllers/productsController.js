const { getAllProducts, getProductById, insertProduct, updateProduct, deleteProductById } = require("../services/productsService");

async function getProducts(req, res) {
	try {
		const listAllProducts = await getAllProducts(req.query);
		return res.status(200).json(listAllProducts);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getProduct(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const product = await getProductById(id);

			if (product.message) {
				return res.status(404).json(product);
			}

			return res.status(200).json(product);
		} else {
			return res.status(422).json({ message: "Id inválido" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function postProduct(req, res) {
	try {
		const newProduct = req.body;

		if (newProduct.smart_card_number) {
			const createdProduct = await insertProduct({ ...newProduct, status: "inactive" });
			return res.status(201).json(createdProduct);
		} else {
			return res.status(422).json({ message: "O campo smart_card_number é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchProduct(req, res) {
	const id = req.params.id;
	const newinfo = req.body;

	try {
		const message = await updateProduct(newinfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deleteProduct(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deleteProductById(id);

			if (message.message === "Recarga não encontrado para exclusão!") {
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
	getProducts,
	getProduct,
	postProduct,
	patchProduct,
	deleteProduct
};