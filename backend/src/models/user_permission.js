'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Permission extends Model {
    static associate(models) {
    }
  }
  User_Permission.init({
    user_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Permission',
    tableName: 'users_permissions',
  });
  return User_Permission;
};