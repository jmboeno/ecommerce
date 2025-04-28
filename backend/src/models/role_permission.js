"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Role_Permission extends Model {
		static associate(models) {
		}
	}
	Role_Permission.init({
		role_id: DataTypes.UUID,
		permission_id: DataTypes.UUID
	}, {
		sequelize,
		modelName: "Role_Permission",
		tableName: "roles_permissions"
	});
	return Role_Permission;
};