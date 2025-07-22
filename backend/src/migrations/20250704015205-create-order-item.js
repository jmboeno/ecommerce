'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('order_items', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'orders',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'products',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'RESTRICT',
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
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
			},
		});

		await queryInterface.addIndex('order_items', ['order_id', 'product_id'], {
			unique: true,
			name: 'unique_order_product',
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('order_items');
	}
};