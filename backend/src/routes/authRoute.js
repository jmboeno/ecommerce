const { Router } = require("express");
const {
	postLogin,
	getRefresh,
	postUser,
	activateUser,
	logoutUser,
	resendActivationToken
} = require("../controllers/authController");

const router = Router();

router.post("/login", postLogin);
router.get("/refresh", getRefresh);
router.post("/register", postUser);
router.post("/logout", logoutUser);
router.get("/activate/:token", activateUser);
router.post("/resend-activation-token", resendActivationToken); 

module.exports = router;
