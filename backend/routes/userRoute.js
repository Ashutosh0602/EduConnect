const express = require("express");
const AuthControl = require("../controller/AuthController");
const loginControl = require("../controller/logInControl");
const studentClass = require("../controller/studentClass");

const router = express.Router();

router.route("/signUp").post(AuthControl.createUser);
router.route("/logIn").post(loginControl.logInUser);
router.route("/:id/class").post(studentClass.studentAssignment);

module.exports = router;
