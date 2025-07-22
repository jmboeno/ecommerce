const { Router } = require("express");
const { getUsers, getUser, postUser, patchUser, deleteUser } = require("../controllers/usersController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);

router.route("/")
	.get(roles(["Administrador"]), getUsers)
	.post(roles(["Administrador"]), postUser);

router.route("/:id")
	.get(roles(["Administrador"]), getUser)
	.patch(roles(["Administrador"]), patchUser)
	.delete(roles(["Administrador"]), deleteUser);

module.exports = router;
