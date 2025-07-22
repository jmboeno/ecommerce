"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("blacklisted_tokens", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			token: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id"
				},
				onDelete: "CASCADE"
			},
			expires_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("blacklisted_tokens");
	}
};
