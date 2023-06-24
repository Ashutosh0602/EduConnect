const express = require("express");
const AuthControl = require("../controller/AuthController");
const loginControl = require("../controller/logInControl");

const router = express.Router();

router.route("/signUp").post(AuthControl.createUser);
router.route("/logIn").post(loginControl.logInUser);

module.exports = router;
