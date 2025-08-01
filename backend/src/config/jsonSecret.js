require("dotenv").config();

module.exports = {
	secret: process.env.SECRET,
	refreshSecret: process.env.REFRESH_SECRET,
	activationSecret: process.env.ACTIVATION_SECRET
};