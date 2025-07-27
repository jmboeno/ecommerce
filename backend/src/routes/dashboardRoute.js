const { Router } = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getDashboardData);

module.exports = router;