const { Router } = require("express");
const { postPermission } = require("../controllers/permissions");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
/* router.get("/", getRecharges);
router.get("/:id", getRecharge); */
router.post("/", postPermission);
/* router.patch("/:id", patchRecharge);
router.delete("/:id", deleteRecharge); */

module.exports = router;