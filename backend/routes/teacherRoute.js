const express = require("express");
const AuthControl = require("../controller/AuthController");
const loginControl = require("../controller/logInControl");
const teacherHome = require("../controller/teacherHome");
const { protect } = require("../controller/protect");

const router = express.Router();

router.route("/signUp").post(AuthControl.createTeacher);
router.route("/logIn").post(loginControl.logInTeacher);

// router.use(protect);

router
  .route("/:id/home")
  .get(teacherHome.teacherHomePanel)
  .post(teacherHome.teacherHome);

module.exports = router;
