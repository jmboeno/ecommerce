const { User } = require("../models");
const { compare } = require("bcryptjs");
const { sign, verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

const MIN_LOGIN_TIME_MS = 2000;

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

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function authenticate(dto) {
	const startTime = Date.now();

	const user = await User.findOne({
		attributes: ["id", "email", "password_hash"],
		where: { email: dto.email }
	});

	let response;

	if (!user) {
		response = { message: "Usuário ou senha incorreta!" };
	} else {
		const equalPassword = await compare(dto.password, user.password_hash);

		if (!equalPassword) {
			response = { message: "Usuário ou senha incorreta!" };
		} else {
			response = generatePairToken(user);
		}
	}

	const elapsed = Date.now() - startTime;

	if (elapsed < MIN_LOGIN_TIME_MS) {
		await wait(MIN_LOGIN_TIME_MS - elapsed);
	}

	return response;
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
