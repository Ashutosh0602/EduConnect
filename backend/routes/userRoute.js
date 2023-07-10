const express = require("express");
const AuthControl = require("../controller/AuthController");
const loginControl = require("../controller/logInControl");
const studentClass = require("../controller/studentClass");
const studentHome = require("../controller/studentHome");

const router = express.Router();

router.route("/signUp").post(AuthControl.createUser);
router.route("/logIn").post(loginControl.logInUser);
router.route("/:id").get(studentHome.studentHome);
router.route("/:id/payment").post(studentHome.studentPayment); // For teachers payment to get access
router.route("/:id/payment/verify").post(studentHome.paymentVerify); // For teachers payment to verify
router.route("/:id/class").post(studentClass.studentAssignment);

module.exports = router;
