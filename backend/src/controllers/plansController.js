const { getAllPlans, insertPlan, getPlanById, getPlansByName, updatePlan, deletePlanById } = require("../services/plansService");

async function getPlans(req, res) {
	try {
		const listAllPlans = await getAllPlans();
		return res.status(200).json(listAllPlans);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getPlan(req, res) {
	try {
		const { id } = req.params;

		if (id && Number(id)) {
			const plan = await getPlanById(id);

			if (plan.message) {
				return res.status(404).json(plan);
			}

			return res.status(200).json(plan);
		} else {
			return res.status(422).json({ message: "Id inválido" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function postPlan(req, res) {
	try {
		const newPlan = req.body;

		if (newPlan.name) {
			const createdPlan = await insertPlan(newPlan);
			return res.status(201).json(createdPlan);
		} else {
			return res.status(422).json({ message: "O campo nome é obrigatório" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function searchPlansByName(req, res) {
	try {
		const { name } = req.query;

		if (!name) {
			return res.status(400).json({ message: "Parâmetro 'name' é obrigatório" });
		}

		const plans = await getPlansByName(name);

		if (plans.length === 0) {
			return res.status(404).json({ message: "Nenhum plano encontrado com esse nome" });
		}

		return res.status(200).json(plans);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function patchPlan(req, res) {
	const id = req.params.id;
	const newinfo = req.body;

	try {
		const message = await updatePlan(newinfo, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deletePlan(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const message = await deletePlanById(id);

			if (message.message === "Plano não encontrado para exclusão!") {
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
	getPlans,
	getPlan,
	postPlan,
	searchPlansByName,
	patchPlan,
	deletePlan
};