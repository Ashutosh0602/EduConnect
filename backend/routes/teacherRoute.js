const express = require("express");
const AuthControl = require("../controller/AuthController");

const router = express.Router();

router.route("/signUp").post(AuthControl.createTeacher);

module.exports = router;
