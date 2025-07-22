'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('orders', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'RESTRICT',
			},
			order_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM('pending', 'paid', 'canceled'),
				allowNull: false,
				defaultValue: 'pending',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			}
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('orders');
	}
};