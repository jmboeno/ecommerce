const { Op } = require("sequelize");
const { Payment } = require("../models");

async function getAllPayments({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
			payment_method: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const { count, rows } = await Payment.findAndCountAll({
		where,
		limit,
		offset,
		order: [[orderBy, orderDirection]],
		attributes: ["id", "amount", "payment_method", "status", "createdAt", "updatedAt"],
		raw: true
	});

	return {
		total: count,
		data: rows
	};
}

async function getPaymentById(id) {
	const payment = await Payment.findByPk(id);

	if (!payment) {
		return { message: "Pagamento não encontrado!" };
	}

	return payment;
}

async function insertPayment(newPayment) {
	try {
		const payment = await Payment.create(newPayment);
		return payment;
	} catch (error) {
		return { message: "Erro ao criar pagamento!", error: error.message };
	}
}

async function updatePayment(updateInfo, id) {
	const updatedList = await Payment.update(updateInfo, { where: { id } });

	if (updatedList[0] === 0) {
		return { message: "Registro não atualizado!" };
	}

	return { message: "Registro atualizado!" };
}

async function deletePaymentById(id) {
	const deletedPayment = await Payment.destroy({ where: { id } });

	if (deletedPayment === 0) {
		return { message: "Pagamento não encontrado para exclusão!" };
	}

	return { message: "Pagamento excluído com sucesso!" };
}

module.exports = {
	getAllPayments,
	getPaymentById,
	insertPayment,
	updatePayment,
	deletePaymentById
};