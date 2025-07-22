"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Supplier extends Model {
		static associate(models) {
			Supplier.hasMany(models.Category, {
				foreignKey: "supplier_id",
				as: "categories"
			});
		}
	}

	Supplier.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 100]
				}
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isEmail: true
				}
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true
			},
			cnpj: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [14, 18]
				}
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true
			}
		},
		{
			sequelize,
			modelName: "Supplier",
			tableName: "suppliers",
			timestamps: true
		}
	);

	return Supplier;
};
