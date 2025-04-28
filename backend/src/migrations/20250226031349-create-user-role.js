"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users_roles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id"
				},
				onDelete: "CASCADE",
				onUpdated: "CASCADE"
			},
			role_id: {
				type: Sequelize.UUID,
				references: {
					model: "roles",
					key: "id"
				},
				onDelete: "CASCADE",
				onUpdated: "CASCADE"
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("users_roles");
	}
};