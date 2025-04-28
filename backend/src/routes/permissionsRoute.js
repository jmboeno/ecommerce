const { Router } = require("express");
const { getPermissions, postPermission } = require("../controllers/permissionsController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getPermissions);
//router.get("/:id", getRecharge);
router.post("/", postPermission);
//router.patch("/:id", patchRecharge);
//router.delete("/:id", deleteRecharge);

module.exports = router;