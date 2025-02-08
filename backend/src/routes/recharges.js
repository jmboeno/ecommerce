const { Router } = require("express");
const { getRecharges, getRecharge, postRecharge, patchRecharge, deleteRecharge } = require("../controllers/recharges");

const router = Router();

router.get("/", getRecharges);

router.get("/:id", getRecharge);

router.post("/", postRecharge);

router.patch("/:id", patchRecharge);

router.delete("/:id", deleteRecharge);

module.exports = router;