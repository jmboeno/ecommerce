"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			Product.belongsTo(models.Category, {
				foreignKey: "category_id",
				as: "category"
			});

			Product.belongsTo(models.Supplier, {
				foreignKey: "supplier_id",
				as: "supplier"
			});

			Product.hasMany(models.Transaction, {
				foreignKey: "product_id",
				as: "transactions",
			});
		}
	}

	Product.init(
		{
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			supplier_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isDecimal: true,
					min: 0,
				}
			},
			sku: { // alterado de cod → sku
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
			status: {
				type: DataTypes.ENUM("ativo", "inativo"),
				allowNull: false,
				defaultValue: "ativo",
			}
		},
		{
			sequelize,
			modelName: "Product",
			tableName: "products",
			timestamps: true,
			scopes: {
				active: {
					where: { status: "ativo" }
				}
			}
		}
	);

	return Product;
};
