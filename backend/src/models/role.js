'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, { through: models.User_Role, as: "users_roles_rel", foreignKey: 'role_id' });
      Role.belongsToMany(models.Permission, { through: models.Role_Permission, as: "roles_permissions_rel", foreignKey: 'role_id' });
    }
  }
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
  });
  return Role;
};