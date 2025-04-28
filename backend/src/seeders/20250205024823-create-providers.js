"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("providers", [
			{
				name: "Express",
				contact_info: "Slogan express",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Blue",
				contact_info: "Slogan blue",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Dune",
				contact_info: "Slogan dune",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("providers", null, {});
	},
};