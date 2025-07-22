"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			// Uma categoria pertence a um fornecedor
			Category.belongsTo(models.Supplier, {
				foreignKey: "supplier_id",
				as: "supplier"
			});

			// Uma categoria pode ter vários produtos
			Category.hasMany(models.Product, {
				foreignKey: "category_id",
				as: "products"
			});
		}
	}

	Category.init(
		{
			supplier_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 100] // Nome entre 2 e 100 caracteres
				}
			}
		},
		{
			sequelize,
			modelName: "Category",
			tableName: "categories",
			timestamps: true,

			scopes: {
				// Escopo para buscar por fornecedor
				bySupplier(supplierId) {
					return {
						where: { supplier_id: supplierId }
					};
				}
			}
		}
	);

	return Category;
};
