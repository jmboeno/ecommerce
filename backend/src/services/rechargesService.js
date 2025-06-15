const { Recharge, User, Plan } = require("../models");
const { Op } = require("sequelize");

async function getAllRecharges({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const whereUser = search
		? {
			"name": {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const order = (() => {
		if (orderBy.includes(".")) {
			const [association, field] = orderBy.split(".");
			if (association === "plan") {
				return [[{ model: Plan, as: "plan" }, field, orderDirection]];
			}
			if (association === "user") {
				return [[{ model: User, as: "user" }, field, orderDirection]];
			}
		}
		return [[orderBy, orderDirection]];
	})();

	const { count, rows } = await Recharge.findAndCountAll({
		include: [
			{
				model: User,
				as: "user",
				attributes: ["name"]
			},
			{
				model: Plan,
				as: "plan",
				attributes: ["name"],
				where: whereUser
			}
		],
		raw: true,
		limit,
		offset,
		attributes: ["id", "smart_card_number", "status", "createdAt", "updatedAt", "user_id", "plan_id", "user.name", "plan.name"],
		order,
	});

	return {
		total: count,
		data: rows
	};
}

async function getRechargeById(id) {
	const recharge = await Recharge.findByPk(id);
	if (!recharge) {
		return { message: "Recarga não encontrado!" };
	}
	return recharge;
}

async function insertRecharge(newRecharge) {
	try {
		const recharge = await Recharge.create(newRecharge);
		return recharge;
	} catch (error) {
		return { message: "Erro ao criar recarga!", error: error.message };
	}
}

async function updateRecharge(updateInfo, id) {
	const updatedList = await Recharge.update(updateInfo, { where: { id } });

	if (updatedList[0] === 0) {
		return { message: "Registro não atualizado!" };
	}

	return { message: "Registro atualizado!" };
}

async function deleteRechargeById(id) {
	const deletedRecharge = await Recharge.destroy({ where: { id } });

	if (deletedRecharge === 0) {
		return { message: "Recarga não encontrado para exclusão!" };
	}

	return { message: "Recarga excluída com sucesso!" };
}

module.exports = {
	getAllRecharges,
	getRechargeById,
	insertRecharge,
	updateRecharge,
	deleteRechargeById
};