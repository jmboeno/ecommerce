const { Router } = require("express");
const { getProfile, patchProfile } = require("../controllers/profileController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);
router.get("/"/* , roles(["Gerente", "Client"]) */, getProfile);
router.patch("/:id", patchProfile);

module.exports = router;