const { getAllTransactions, getTransactionById, insertTransaction, updateTransaction, deleteTransactionById } = require("../services/transactionsService");

async function getTransactions(req, res) {
	try {
		const listAllTransactions = await getAllTransactions(req.query);
		return res.status(200).json(listAllTransactions);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getTransaction(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const product = await getTransactionById(id);

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

async function postTransaction(req, res) {
	try {
		const newTransaction = req.body;

		if (newTransaction.transaction_id) {
			const createdTransaction = await insertTransaction(newTransaction);
			return res.status(201).json(createdTransaction);
		} else {
			return res.status(422).json({ message: "O campo transaction_id é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchTransaction(req, res) {
	const id = req.params.id;
	const newInfo = req.body;

	try {
		const message = await updateTransaction(newInfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deleteTransaction(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deleteTransactionById(id);

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
	getTransactions,
	getTransaction,
	postTransaction,
	patchTransaction,
	deleteTransaction
};