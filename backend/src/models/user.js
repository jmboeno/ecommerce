"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.belongsToMany(models.Role, {
				through: models.User_Role,
				as: "user_roles",
				foreignKey: "user_id",
			});

			User.belongsToMany(models.Permission, {
				through: models.User_Permission,
				as: "user_permissions",
				foreignKey: "user_id",
			});

			User.hasMany(models.Order, {
				foreignKey: "user_id",
				as: "orders",
			});
		}

		// Método de verificação de senha
		validPassword(password) {
			return bcrypt.compare(password, this.password_hash);
		}
	}

	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			password: {
				type: DataTypes.VIRTUAL,
				set(value) {
					this.setDataValue("password", value);
					this.setDataValue("password_hash", bcrypt.hashSync(value, 10));
				},
			},
			password_hash: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
			timestamps: true,
			defaultScope: {
				attributes: { exclude: ["password_hash"] },
			},
			scopes: {
				withPassword: {
					attributes: {},
				},
			},
		}
	);

	return User;
};