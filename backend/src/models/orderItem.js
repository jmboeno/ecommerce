"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class OrderItem extends Model {
		static associate(models) {
			// Item pertence a um pedido
			OrderItem.belongsTo(models.Order, {
				foreignKey: "order_id",
				as: "order",
			});

			// Item refere-se a um produto
			OrderItem.belongsTo(models.Product, {
				foreignKey: "product_id",
				as: "product",
			});
		}
	}

	OrderItem.init(
		{
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
				validate: {
					min: 1,
				},
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isDecimal: true,
					min: 0,
				},
			},
			subtotal: {
				type: DataTypes.VIRTUAL,
				get() {
					return parseFloat(this.price) * this.quantity;
				},
			}
		},
		{
			sequelize,
			modelName: "OrderItem",
			tableName: "order_items",
			timestamps: true,

			scopes: {
				byOrder(orderId) {
					return { where: { order_id: orderId } };
				}
			}
		}
	);

	return OrderItem;
};
