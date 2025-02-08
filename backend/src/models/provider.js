"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    static associate(models) {
      Provider.hasMany(models.Plan, { foreignKey: "provider_id", as: "plans" });
    }
  }

  Provider.init(
    {
      name: DataTypes.STRING,
      contact_info: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Provider",
      tableName: "providers"
    }
  );

  return Provider;
};