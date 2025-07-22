const { Router } = require("express");
const { getTransactions, getTransaction, postTransaction, patchTransaction, deleteTransaction } = require("../controllers/transactionsController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", postTransaction);
router.patch("/:id", patchTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;