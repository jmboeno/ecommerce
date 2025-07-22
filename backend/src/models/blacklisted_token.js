"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class BlacklistedToken extends Model {
		static associate(models) {
			BlacklistedToken.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user"
			});
		}
	}

	BlacklistedToken.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4, // Gera UUID automaticamente
				primaryKey: true
			},
			token: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			expires_at: {
				type: DataTypes.DATE,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: "BlacklistedToken",
			tableName: "blacklisted_tokens"
		}
	);

	return BlacklistedToken;
};