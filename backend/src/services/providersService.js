const { Provider } = require("../models");
const { Sequelize, Op } = require("sequelize");


async function getAllProviders({ limit, offset, search, orderBy = "id", orderDirection = "ASC" }) {
	const where = search
		? {
			name: {
				[Op.iLike]: `%${search}%`
			}
		}
		: undefined;

	const { count, rows } = await Provider.findAndCountAll({
		where,
		limit,
		offset,
		order: [[orderBy, orderDirection]],
		attributes: ["id", "name", "createdAt", "updatedAt"],
		raw: true
	});

	return {
		total: count,
		data: rows
	};
}

async function getProviderById(id) {
	const plan = await Provider.findByPk(id);

	if (!plan) {
		return { message: "Provedor não encontrado!" };
	}

	return plan;
}

async function insertProvider(newProvider) {
	try {
		const plan = await Provider.create(newProvider);
		return plan;
	} catch (error) {
		return { message: "Erro ao criar usuário!", error: error.message };
	}
}

async function getProviderByName(name) {
	try {
		const plans = await Provider.findAll({
			where: {
				name: {
					[Sequelize.Op.iLike]: `%${name}%`
				}
			}
		});

		return plans;
	} catch (error) {
		return { message: "Erro ao buscar Provedors pelo nome!" };
	}
}

async function updateProvider(updateInfo, id) {
	const updatedList = await Provider.update(updateInfo, { where: { id } });

	if (updatedList[0] === 0) {
		return { message: "Registro não atualizado!" };
	}

	return { message: "Registro atualizado!" };
}

async function deleteProviderById(id) {
	const deletedProvider = await Provider.destroy({ where: { id } });

	if (deletedProvider === 0) {
		return { message: "Provedor não encontrado para exclusão!" };
	}

	return { message: "Provedor excluído com sucesso!" };
}

module.exports = {
	getAllProviders,
	getProviderById,
	insertProvider,
	getProviderByName,
	updateProvider,
	deleteProviderById
};