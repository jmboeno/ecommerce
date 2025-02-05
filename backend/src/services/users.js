const fs = require("fs");
const database = require("../models");

async function getAllUsers() {
    return database.User.findAll();
}

async function getUserById(id) {
    const user = await database.User.findByPk(id);
    if (!user) {
        return { message: "Usuário não encontrado!" };
    }
    return user;
}

async function insertUser(newUser) {
    try {
        const user = await database.User.create(newUser);
        return user;
    } catch (error) {
        return { message: "Erro ao criar usuário!", error: error.message };
    }
}

async function updateUser(updateInfo, id) {
    const updatedList = await database.User.update(updateInfo, { where: { id } });

    if (updatedList[0] === 0) {
        return { message: "Registro não atualizado!" };
    }

    return { message: "Registro atualizado!" };
}

async function deleteUserById(id) {
    const deletedUser = await database.User.destroy({ where: { id } });

    if (deletedUser === 0) {
        return { message: "Usuário não encontrado para exclusão!" };
    }

    return { message: "Usuário excluído com sucesso!" };
}

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUserById
};