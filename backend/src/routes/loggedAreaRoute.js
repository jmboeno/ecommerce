const { Router } = require("express");
const { getProfile, patchProfile } = require("../controllers/loggedAreaController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/profile", getProfile);
router.patch("/profile/:id", patchProfile);

module.exports = router;