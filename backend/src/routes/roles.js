const { Router } = require("express");
const { postRole } = require("../controllers/roles");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
/* router.get("/", getRecharges);
router.get("/:id", getRecharge); */
router.post("/", postRole);
/* router.patch("/:id", patchRecharge);
router.delete("/:id", deleteRecharge); */

module.exports = router;