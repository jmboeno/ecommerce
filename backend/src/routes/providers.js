const { Router } = require("express");
const { getProviders, getProvider, postProvider, searchProviderByName, patchProvider, deleteProvider } = require("../controllers/providers");

const router = Router();

router.get("/", getProviders);

router.get("/search", searchProviderByName); 

router.get("/:id", getProvider);

router.post("/", postProvider);

router.patch("/:id", patchProvider);

router.delete("/:id", deleteProvider);

module.exports = router;