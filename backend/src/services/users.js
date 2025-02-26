const { User } = require("../models");
const { hash } = require("bcryptjs");

async function getAllUsers() {
    return User.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt'],
        order: [['id', 'ASC']],
    });
}

async function getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
        return { message: "Usuário não encontrado!" };
    }

    return user;
}

async function insertUser(dto) {
    const userByEmail = await User.findOne({
        where: { email: dto.email }
    });

    if (userByEmail) {
        return { message: "Usuário já cadastrado"}
    }

    const password_hash = await hash(dto.password, 8);

    const newUser = await User.create({
        ...dto,
        password_hash
    });

    try {
        return newUser;
    } catch (error) {
        return { message: "Erro ao criar usuário!", error: error.message };
    }
}

async function updateUser(updateInfo, id) {
    const updatedList = await User.update(updateInfo, { where: { id } });

    if (updatedList[0] === 0) {
        return { message: "Registro não atualizado!" };
    }

    return { message: "Registro atualizado!" };
}

async function deleteUserById(id) {
    const deletedUser = await User.destroy({ where: { id } });

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