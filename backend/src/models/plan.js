"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.belongsTo(models.TvProvider, { foreignKey: "provider_id", as: "provider" });
      Plan.hasMany(models.Recharge, { foreignKey: "plan_id", as: "recharges" });
    }
  }

  Plan.init(
    {
      provider_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      duration_days: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Plan",
      tableName: "plans"
    }
  );

  return Plan;
};