const { Permission } = require("../models");

async function insertPermission(dto) {
    const permission = await Permission.findOne({
        where: { name: dto.name }
    });

    if (permission) {
        return { message: "Permission já cadastrada!" };
    }

    try {
        const newPermission = await Permission.create({
            name: dto.name,
            description: dto.description
        })

        return newPermission;
    } catch (error) {
        throw new Error('Erro ao cadastrar permission');
    }
};

module.exports = {
    insertPermission
};