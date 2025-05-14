const { Router } = require("express");
const { postLogin, getRefresh, postUser } = require("../controllers/authController");

const router = Router();

router.post("/login", postLogin);
router.get("/refresh", getRefresh);
router.post("/register", postUser);

module.exports = router;