const { User } = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

async function authenticate(dto) {
	const user = await User.findOne({
		attributes: ["id", "email", "password_hash"],
		where: { email: dto.email }
	});

	if (!user) {
		return { message: "Usuário ou senha incorreta!" };
	}

	const equalPassword = await compare(dto.password, user.password_hash);

	if (!equalPassword) {
		return { message: "Usuário ou senha incorreta!"};
	}

	const accessToken = sign({
		id: user.id,
		email: user.email
	}, jsonSecret.secret, {
		expiresIn: 86400
	});

	return { accessToken };
};

module.exports = {
	authenticate
};