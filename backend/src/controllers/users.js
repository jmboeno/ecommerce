const { getAllUsers, getUserById, insertUser, updateUser, deleteUserById } = require("../services/users");

async function getUsers(req, res) {
    try {
        const listAllUsers = await getAllUsers();
        return res.status(200).json(listAllUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getUser(req, res) {
    try {
        const id = req.params.id;

        if (id && Number(id)) {
            const user = await getUserById(id);

            if (user.message) {
                return res.status(404).json(user);
            }

            return res.status(200).json(user);
        } else {
            return res.status(422).json({ message: "Id inválido" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function postUser(req, res) {
    try {
        const newUser = req.body;

        if (newUser.name) {
            const createdUser = await insertUser(newUser);
            return res.status(201).json(createdUser);
        } else {
            return res.status(422).json({ message: "O campo nome é obrigatório" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function patchUser(req, res) {
    const id = req.params.id;
    const newinfo = req.body;

    try {
        const message = await updateUser(newinfo, id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        if (id && Number(id)) {
            const message = await deleteUserById(id);

            if (message.message === "Usuário não encontrado para exclusão!") {
                return res.status(404).json(message);
            }

            return res.status(200).json(message);
        } else {
            return res.status(422).json({ message: "Id inválido" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser
};