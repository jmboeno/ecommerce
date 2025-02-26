"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Recharge, { foreignKey: "user_id", as: "recharges" });
      User.belongsToMany(models.Role, { through: models.User_Role, as: "users_roles_rel", foreignKey: 'user_id' });
      User.belongsToMany(models.Permission, { through: models.User_Permission, as: "users_permissions_rel", foreignKey: 'user_id' });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password_hash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users"
    }
  );

  return User;
};