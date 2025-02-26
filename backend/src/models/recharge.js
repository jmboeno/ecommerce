"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Recharge extends Model {
    static associate(models) {
      Recharge.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Recharge.belongsTo(models.Plan, { foreignKey: "plan_id", as: "plan" });
      Recharge.hasOne(models.Payment, { foreignKey: "recharge_id", as: "payment" });
    }
  }

  Recharge.init(
    {
      user_id: DataTypes.INTEGER,
      plan_id: DataTypes.INTEGER,
      smart_card_number: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recharge",
      tableName: "recharges"
    }
  );

  return Recharge;
};