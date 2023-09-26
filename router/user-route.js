const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/signup", userController.signup);
router.get("/", userController.getUsers);
router.post("/login", userController.login);
router.delete("/deleteAll", userController.deleteAllUsers);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
