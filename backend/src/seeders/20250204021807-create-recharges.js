"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("recharges", [
			{
				user_id: 1,
				plan_id: 1,
				smart_card_number: "01234456789",
				status: "active",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				user_id: 1,
				plan_id: 2,
				smart_card_number: "01234456799",
				status: "active",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				user_id: 1,
				plan_id: 2,
				smart_card_number: "01234456999",
				status: "active",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("recharges", null, {});
	},
};