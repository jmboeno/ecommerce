"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Permission extends Model {
		static associate(models) {
			Permission.belongsToMany(models.User, {
				through: models.User_Permission,
				as: "permissions_from_user",
				foreignKey: "permission_id"
			});

			Permission.belongsToMany(models.Role, {
				through: models.Role_Permission,
				as: "permissions_from_roles",
				foreignKey: "permission_id"
			});
		}
	}

	Permission.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 100]
				}
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true
			}
		},
		{
			sequelize,
			modelName: "Permission",
			tableName: "permissions",
			timestamps: true
		}
	);

	return Permission;
};