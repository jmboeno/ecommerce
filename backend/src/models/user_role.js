"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User_Role extends Model {
		static associate(models) {
		}
	}
	User_Role.init({
		user_id: DataTypes.INTEGER,
		role_id: DataTypes.UUID
	}, {
		sequelize,
		modelName: "User_Role",
		tableName: "users_roles",
	});
	return User_Role;
};