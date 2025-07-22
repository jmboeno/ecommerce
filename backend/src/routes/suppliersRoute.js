const { Router } = require("express");
const { getSuppliers, getSupplier, postSupplier, searchSupplierByName, patchSupplier, deleteSupplier } = require("../controllers/suppliersController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getSuppliers);
router.get("/search", searchSupplierByName); 
router.get("/:id", getSupplier);
router.post("/", postSupplier);
router.patch("/:id", patchSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;