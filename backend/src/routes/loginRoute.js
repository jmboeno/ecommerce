const { Router } = require("express");
const { postLogin } = require("../controllers/loginController");

const router = Router();

router.post("/", postLogin);

module.exports = router;