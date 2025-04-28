const { getAllRecharges, getRechargeById, insertRecharge, updateRecharge, deleteRechargeById } = require("../services/rechargesService");

async function getRecharges(req, res) {
	try {
		const listAllRecharges = await getAllRecharges();
		return res.status(200).json(listAllRecharges);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getRecharge(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const recharge = await getRechargeById(id);

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

async function postRecharge(req, res) {
	try {
		const newRecharge = req.body;

		if (newRecharge.smart_card_number) {
			const createdRecharge = await insertRecharge(newRecharge);
			return res.status(201).json(createdRecharge);
		} else {
			return res.status(422).json({ message: "O campo smart_card_number é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchRecharge(req, res) {
	const id = req.params.id;
	const newinfo = req.body;

	try {
		const message = await updateRecharge(newinfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deleteRecharge(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deleteRechargeById(id);

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
	getRecharges,
	getRecharge,
	postRecharge,
	patchRecharge,
	deleteRecharge
};