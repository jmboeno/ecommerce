"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			// Quem fez o pedido
			Order.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});

			// Transações relacionadas
			Order.hasMany(models.Transaction, {
				foreignKey: "order_id",
				as: "transactions",
			});

			// Itens do pedido
			Order.hasMany(models.OrderItem, {
				foreignKey: "order_id",
				as: "items",
			});

			// Produtos do pedido via pivot
			Order.belongsToMany(models.Product, {
				through: models.OrderItem,
				foreignKey: "order_id",
				otherKey: "product_id",
				as: "products",
			});
		}
	}

	Order.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			order_date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isDecimal: true,
					min: 0,
				},
			},
			status: {
				type: DataTypes.ENUM("pending", "paid", "canceled"),
				allowNull: false,
				defaultValue: "pending",
			},
		},
		{
			sequelize,
			modelName: "Order",
			tableName: "orders",
			timestamps: true,
			scopes: {
				paid: { where: { status: "paid" } },
				pending: { where: { status: "pending" } },
				withItems: {
					include: [{ association: "items" }]
				}
			}
		}
	);

	return Order;
};
