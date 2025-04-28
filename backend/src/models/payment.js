"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		static associate(models) {
			Payment.belongsTo(models.Recharge, { foreignKey: "recharge_id", as: "recharge" });
		}
	}

	Payment.init(
		{
			recharge_id: DataTypes.INTEGER,
			amount: DataTypes.DECIMAL,
			payment_method: DataTypes.STRING,
			transaction_id: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Payment",
			tableName: "payments"
		}
	);

	return Payment;
};