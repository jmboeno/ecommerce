const { Router } = require("express");
const {
	getDashboardData
} = require("../controllers/dashboardController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);
router.get("/data", roles(["Administrador"]), getDashboardData);

module.exports = router;