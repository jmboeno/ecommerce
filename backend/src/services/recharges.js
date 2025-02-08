const { Recharge } = require("../models");

async function getAllRecharges() {
    return Recharge.findAll({
        order: [['id', 'ASC']],
    });
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

    return { message: "Recarga excluído com sucesso!" };
}

module.exports = {
    getAllRecharges,
    getRechargeById,
    insertRecharge,
    updateRecharge,
    deleteRechargeById
};