const { Router } = require("express");
const { getRecharges, getRecharge, postRecharge, patchRecharge, deleteRecharge } = require("../controllers/recharges");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getRecharges);
router.get("/:id", getRecharge);
router.post("/", postRecharge);
router.patch("/:id", patchRecharge);
router.delete("/:id", deleteRecharge);

module.exports = router;