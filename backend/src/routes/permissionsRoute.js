const { Router } = require("express");
const { getPermissions, postPermission } = require("../controllers/permissionsController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getPermissions);
//router.get("/:id", getProduct);
router.post("/", postPermission);
//router.patch("/:id", patchProduct);
//router.delete("/:id", deleteProduct);

module.exports = router;