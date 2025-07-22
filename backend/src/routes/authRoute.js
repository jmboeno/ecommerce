const { Router } = require("express");
const {
	postLogin,
	getRefresh,
	postUser,
	activateUser,
	logout
} = require("../controllers/authController");

const router = Router();

router.post("/login", postLogin);
router.get("/refresh", getRefresh);
router.post("/register", postUser);
router.post("/logout", logout);
router.get("/activate/:token", activateUser);

module.exports = router;
