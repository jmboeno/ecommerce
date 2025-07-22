const { Op } = require("sequelize");
const { Transaction } = require("../models");

async function getAllTransactions({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
			transaction_method: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const { count, rows } = await Transaction.findAndCountAll({
		where,
		limit,
		offset,
		order: [[orderBy, orderDirection]],
		attributes: ["id", "product_id", "amount", "transaction_method", "transaction_id", "status", "createdAt", "updatedAt"],
	});

	return {
		total: count,
		data: rows
	};
}

async function getTransactionById(id) {
	const transaction = await Transaction.findByPk(id);

	if (!transaction) {
		return { message: "Transação não encontrada!" };
	}

	return transaction;
}

async function insertTransaction(newTransaction) {
	try {
		const transaction = await Transaction.create(newTransaction);
		return transaction;
	} catch (error) {
		return { message: "Erro ao criar transação!", error: error.message };
	}
}

async function updateTransaction(updateInfo, id) {
	const [updatedCount] = await Transaction.update(updateInfo, { where: { id } });

	if (updatedCount === 0) {
		return { message: "Transação não atualizada!" };
	}

	return { message: "Transação atualizada com sucesso!" };
}

async function deleteTransactionById(id) {
	const deletedCount = await Transaction.destroy({ where: { id } });

	if (deletedCount === 0) {
		return { message: "Transação não encontrada para exclusão!" };
	}

	return { message: "Transação excluída com sucesso!" };
}

module.exports = {
	getAllTransactions,
	getTransactionById,
	insertTransaction,
	updateTransaction,
	deleteTransactionById
};
