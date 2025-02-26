const { Router } = require("express");
const { getUsers, getUser, postUser, patchUser, deleteUser } = require("../controllers/users");
const authenticated = require("../middleware/authenticated");

const router = Router();

router.use(authenticated);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;