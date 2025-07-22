const { getAllUsers, getUserById, insertUser, updateUser, deleteUserById } = require("../services/usersService");

function isValidId(id) {
	return id && !isNaN(Number(id));
}

async function getUsers(req, res) {
	try {
		const users = await getAllUsers(req.query);
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ message: "Erro ao buscar usuários", detail: error.message });
	}
}

async function getUser(req, res) {
	const id = req.params.id;

	if (!isValidId(id)) {
		return res.status(422).json({ message: "Id inválido" });
	}

	try {
		const user = await getUserById(id);
		if (user.message) {
			return res.status(404).json(user);
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: "Erro ao buscar usuário", detail: error.message });
	}
}

async function postUser(req, res) {
	const newUser = req.body;

	if (!newUser.email || !newUser.password) {
		return res.status(422).json({ message: "Email e senha são obrigatórios" });
	}

	try {
		const createdUser = await insertUser(newUser);
		return res.status(201).json(createdUser);
	} catch (error) {
		return res.status(500).json({ message: "Erro ao criar usuário", detail: error.message });
	}
}

async function patchUser(req, res) {
	const id = req.params.id;

	if (!isValidId(id)) {
		return res.status(422).json({ message: "Id inválido" });
	}

	try {
		const message = await updateUser(req.body, id);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: "Erro ao atualizar usuário", detail: error.message });
	}
}

async function deleteUser(req, res) {
	const id = req.params.id;

	if (!isValidId(id)) {
		return res.status(422).json({ message: "Id inválido" });
	}

	try {
		const message = await deleteUserById(id);
		if (message.message === "Usuário não encontrado para exclusão!") {
			return res.status(404).json(message);
		}
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({ message: "Erro ao deletar usuário", detail: error.message });
	}
}

module.exports = {
	getUsers,
	getUser,
	postUser,
	patchUser,
	deleteUser
};