const { Router } = require("express");
const { getPayments, getPayment, postPayment, patchPayment, deletePayment } = require("../controllers/payments");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getPayments);
router.get("/:id", getPayment);
router.post("/", postPayment);
router.patch("/:id", patchPayment);
router.delete("/:id", deletePayment);

module.exports = router;