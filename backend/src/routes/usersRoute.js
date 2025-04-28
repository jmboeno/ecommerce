const { Router } = require("express");
const { getUsers, getUser, postUser, patchUser, deleteUser } = require("../controllers/usersController");
const authenticated = require("../middleware/authenticated");
const { roles } = require("../middleware/roles");

const router = Router();

router.use(authenticated);
router.get("/", roles(["Gerente"]), getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;