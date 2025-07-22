"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("transactions", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "products",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "orders",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			transaction_method: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transaction_id: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true,
			},
			status: {
				type: Sequelize.ENUM("pending", "completed", "failed", "refunded"),
				allowNull: false,
				defaultValue: "pending",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("transactions");
	},
};