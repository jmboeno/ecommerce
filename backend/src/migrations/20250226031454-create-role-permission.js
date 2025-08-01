"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("roles_permissions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
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
			permission_id: {
				type: Sequelize.UUID,
				references: {
					model: "permissions",
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
		await queryInterface.dropTable("roles_permissions");
	}
};