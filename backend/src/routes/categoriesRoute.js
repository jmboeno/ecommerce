const { Router } = require("express");
const { getCategories, getCategory, postCategory, searchCategoriesByName, patchCategory, deleteCategory } = require("../controllers/categoriesController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getCategories);
router.get("/search", searchCategoriesByName); 
router.get("/:id", getCategory);
router.post("/", postCategory);
router.patch("/:id", patchCategory);
router.delete("/:id", deleteCategory);

module.exports = router;