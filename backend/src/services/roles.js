const { Role } = require("../models");

async function insertRole(dto) {
    const role = await Role.findOne({
        where: { name: dto.name }
    });

    if (role) {
        return { message: "Role já cadastrada!" };
    }

    try {
        const newRole = await Role.create({
            name: dto.name,
            description: dto.description
        })

        return newRole;
    } catch (error) {
        throw new Error('Erro ao cadastrar role');
    }
};

module.exports = {
    insertRole
};