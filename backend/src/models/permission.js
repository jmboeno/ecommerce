'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.User, { through: models.User_Permission, as: "users_roles_rel", foreignKey: 'permission_id' });
      Permission.belongsToMany(models.Permission, { through: models.Role_Permission, as: "roles_permissions_rel", foreignKey: 'permission_id' });
    }
  }
  Permission.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions'
  });
  return Permission;
};