const { Router } = require("express");
const { getUsers, getUser, postUser, patchUser, deleteUser } = require("../controllers/usersController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);
router.get("/", roles(["Gerente"]), getUsers);
router.get("/:id", roles(["Gerente"]), getUser);
router.post("/", roles(["Gerente"]), postUser);
router.patch("/:id", roles(["Gerente"]), patchUser);
router.delete("/:id", roles(["Gerente"]), deleteUser);

module.exports = router;