"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("products", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "categories",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			supplier_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "suppliers",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			cod: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true,
			},
			status: {
				type: Sequelize.ENUM("ativo", "inativo"),
				allowNull: false,
				defaultValue: "ativo",
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
		await queryInterface.dropTable("products");
	},
};
