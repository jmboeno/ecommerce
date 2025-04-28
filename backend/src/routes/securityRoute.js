const { Router } = require("express");
const { postAcl, postPermissionRole } = require("../controllers/securityController");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.post("/acl", postAcl);
router.post("/permission-role", postPermissionRole);

module.exports = router;