module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("suppliers", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: false,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			cnpj: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("suppliers");
	},
};
