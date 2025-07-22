"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		static associate(models) {
			Transaction.belongsTo(models.Product, {
				foreignKey: "product_id",
				as: "product",
			});

			Transaction.belongsTo(models.Order, {
				foreignKey: "order_id",
				as: "order",
			});
		}
	}

	Transaction.init(
		{
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isDecimal: true,
					min: 0,
				},
			},
			payment_method: { // renomeado
				type: DataTypes.STRING,
				allowNull: false,
			},
			transaction_id: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			status: {
				type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
				allowNull: false,
				defaultValue: "pending",
			},
		},
		{
			sequelize,
			modelName: "Transaction",
			tableName: "transactions",
			timestamps: true,
			scopes: {
				pending: {
					where: { status: "pending" }
				},
				completed: {
					where: { status: "completed" }
				}
			}
		}
	);

	return Transaction;
};