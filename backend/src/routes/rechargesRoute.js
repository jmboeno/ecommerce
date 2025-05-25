const { Router } = require("express");
const { getRecharges, getRecharge, postRecharge, patchRecharge, deleteRecharge } = require("../controllers/rechargesController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);
router.get("/", roles(["Gerente", "Client"]), getRecharges);
router.get("/:id", getRecharge);
router.post("/", postRecharge);
router.patch("/:id", patchRecharge);
router.delete("/:id", deleteRecharge);

module.exports = router;