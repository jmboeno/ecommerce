const { Router } = require("express");
const { getRoles, postRole } = require("../controllers/rolesController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);

router.route("/")
	.get(roles(["Administrador"]), getRoles)
	.post(roles(["Administrador"]), postRole);

/* router.route("/:id")
	.get(roles(["Administrador"]), getRole)
	.patch(roles(["Administrador"]), patchRole)
	.delete(roles(["Administrador"]), deleteRole); */

module.exports = router;