const { Plan } = require("../models");
const { Sequelize } = require("sequelize");

async function getAllPlans() {
	return Plan.findAll({
		order: [["id", "ASC"]],
	});
}

async function getPlanById(id) {
	const plan = await Plan.findByPk(id);

	if (!plan) {
		return { message: "Plano não encontrado!" };
	}

	return plan;
}

async function insertPlan(newPlan) {
	try {
		const plan = await Plan.create(newPlan);
		return plan;
	} catch (error) {
		return { message: "Erro ao criar usuário!", error: error.message };
	}
}

async function getPlansByName(name) {
	try {
		const plans = await Plan.findAll({
			where: {
				name: {
					[Sequelize.Op.iLike]: `%${name}%`
				}
			}
		});

		return plans;
	} catch (error) {
		return { message: "Erro ao buscar planos pelo nome!" };
	}
}

async function updatePlan(updateInfo, id) {
	const updatedList = await Plan.update(updateInfo, { where: { id } });

	if (updatedList[0] === 0) {
		return { message: "Registro não atualizado!" };
	}

	return { message: "Registro atualizado!" };
}

async function deletePlanById(id) {
	const deletedUser = await Plan.destroy({ where: { id } });

	if (deletedUser === 0) {
		return { message: "Plano não encontrado para exclusão!" };
	}

	return { message: "Plano excluído com sucesso!" };
}

module.exports = {
	getAllPlans,
	getPlanById,
	insertPlan,
	getPlansByName,
	updatePlan,
	deletePlanById
};