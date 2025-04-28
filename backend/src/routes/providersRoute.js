const { Router } = require("express");
const { getProviders, getProvider, postProvider, searchProviderByName, patchProvider, deleteProvider } = require("../controllers/providersController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getProviders);
router.get("/search", searchProviderByName); 
router.get("/:id", getProvider);
router.post("/", postProvider);
router.patch("/:id", patchProvider);
router.delete("/:id", deleteProvider);

module.exports = router;