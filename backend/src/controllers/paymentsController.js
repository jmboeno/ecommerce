const { getAllPayments, getPaymentById, insertPayment, updatePayment, deletePaymentById } = require("../services/paymentsService");

async function getPayments(req, res) {
	try {
		const listAllPayments = await getAllPayments();
		return res.status(200).json(listAllPayments);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getPayment(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const recharge = await getPaymentById(id);

			if (recharge.message) {
				return res.status(404).json(recharge);
			}

			return res.status(200).json(recharge);
		} else {
			return res.status(422).json({ message: "Id inválido" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function postPayment(req, res) {
	try {
		const newPayment = req.body;

		if (newPayment.transaction_id) {
			const createdPayment = await insertPayment(newPayment);
			return res.status(201).json(createdPayment);
		} else {
			return res.status(422).json({ message: "O campo transaction_id é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchPayment(req, res) {
	const id = req.params.id;
	const newInfo = req.body;

	try {
		const message = await updatePayment(newInfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deletePayment(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deletePaymentById(id);

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
	getPayments,
	getPayment,
	postPayment,
	patchPayment,
	deletePayment
};