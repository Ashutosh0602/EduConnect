const express = require("express");
const AuthControl = require("../controller/AuthController");
const loginControl = require("../controller/logInControl");
const teacherHome = require("../controller/teacherHome");

const router = express.Router();

router.route("/signUp").post(AuthControl.createTeacher);
router.route("/logIn").post(loginControl.logInTeacher);
router.route("/:id/home").post(teacherHome.teacherHome);

module.exports = router;
