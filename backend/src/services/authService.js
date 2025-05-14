const { User } = require("../models");
const { compare } = require("bcryptjs");
const { sign, verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

function generatePairToken(user) {
	const accessToken = sign(
		{ id: user.id, email: user.email },
		jsonSecret.secret,
		{ expiresIn: "1h" }
	);

	const refreshToken = sign(
		{ id: user.id },
		jsonSecret.refreshSecret,
		{ expiresIn: "7d" }
	);

	return { accessToken, refreshToken };
}

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
		return { message: "Usuário ou senha incorreta!" };
	}

	return generatePairToken(user);
}

async function refreshToken(token) {
	if (!token) {
		return { error: "Refresh token não fornecido." };
	}

	try {
		verify(token, jsonSecret.refreshSecret);

		const { id } = decode(token);

		const user = await User.findOne({
			attributes: ["id", "email", "password_hash"],
			where: { id: id }
		});

		return generatePairToken(user);
	} catch (err) {
		return { error: "Refresh token inválido ou expirado." };
	}
}

module.exports = {
	authenticate,
	refreshToken
};