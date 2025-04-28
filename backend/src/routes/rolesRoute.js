const { Router } = require("express");
const { getRoles, postRole } = require("../controllers/rolesController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getRoles);
// router.get("/:id", getRecharge);
router.post("/", postRole);
// router.patch("/:id", patchRecharge);
// router.delete("/:id", deleteRecharge);

module.exports = router;