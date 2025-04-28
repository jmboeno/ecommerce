"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("users", [
			{
				name: "Admin User",
				email: "admin@example.com",
				phone: "11999999999",
				password_hash: await bcrypt.hash("123456", 10), // Senha criptografada
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "João Silva",
				email: "joao.silva@example.com",
				phone: "11988888888",
				password_hash: await bcrypt.hash("senha123", 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Maria Souza",
				email: "maria.souza@example.com",
				phone: "11977777777",
				password_hash: await bcrypt.hash("mari@2023", 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("users", null, {});
	},
};