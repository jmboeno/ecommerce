const { Router } = require("express");
const {
	getDashboardData
} = require("../controllers/dashboardController");

const router = Router();

router.get("/data", getDashboardData);

module.exports = router;