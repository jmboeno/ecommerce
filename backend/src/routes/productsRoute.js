const { Router } = require("express");
const { getProducts, getProduct, postProduct, patchProduct, deleteProduct } = require("../controllers/productsController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);
router.get("/"/* , roles(["Gerente", "Client"]) */, getProducts);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

module.exports = router;