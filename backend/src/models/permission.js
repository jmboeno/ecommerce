"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Permission extends Model {
		static associate(models) {
			Permission.belongsToMany(models.User, { through: models.User_Permission, as: "permissions_from_user", foreignKey: "permission_id" });
			Permission.belongsToMany(models.Role, { through: models.Role_Permission, as: "permissions_from_roles", foreignKey: "permission_id" });
		}
	}
	Permission.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
		sequelize,
		modelName: "Permission",
		tableName: "permissions"
	});
	return Permission;
};