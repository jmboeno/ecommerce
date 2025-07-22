module.exports = (sequelize, DataTypes) => {
	const RefreshToken = sequelize.define("RefreshToken", {
		token: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		expires_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		is_revoked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		}
	}, {
		modelName: "Refresh_Tokens",
		tableName: "refresh_tokens",
		timestamps: true,
	});

	return RefreshToken;
};
