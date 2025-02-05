"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TvProvider extends Model {
    static associate(models) {
      TvProvider.hasMany(models.Plan, { foreignKey: "provider_id", as: "plans" });
    }
  }

  TvProvider.init(
    {
      name: DataTypes.STRING,
      contact_info: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "TvProvider",
      tableName: "tv_providers"
    }
  );

  return TvProvider;
};