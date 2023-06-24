const userM = require("../modals/user");
const parentM = require("../modals/parent");
const teacherM = require("../modals/teacher");
var jwt = require("jsonwebtoken");

// Create / sing up new user
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_secret, {
    expiresIn: process.env.JWT_expires,
  });
};

// LogIn of student
exports.logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // If any email or password is missing
    if (!email || !password) {
      return res.status(404).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const user = await userM.findOne({ email: email }).select("+password");

    //To check if the password provided is right or wrong
    if (!user || !user.correctPassword(password, user.password)) {
      return res.status(404).json({
        status: "failed",
        message: "Incorrect email or password",
      });
    }

    // Generating token for user with correct credential
    const token = signToken(user._id);
    return res.status(200).json({
      status: "success",
      token: token,
      user: user["id"],
    });
  } catch (error) {}
};

// LogIn of teacher
exports.logInTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    // If any email or password is missing
    if (!email || !password) {
      return res.status(404).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const user = await teacherM.findOne({ email: email }).select("+password");

    //To check if the password provided is right or wrong
    if (!user || !user.correctPassword(password, user.password)) {
      return res.status(404).json({
        status: "failed",
        message: "Incorrect email or password",
      });
    }

    // Generating token for user with correct credential
    const token = signToken(user._id);
    return res.status(200).json({
      status: "success",
      token: token,
      user: user["id"],
    });
  } catch (error) {}
};

// LogIn of parent
exports.logInParent = async (req, res) => {
  const { email, password } = req.body;
  try {
    // If any email or password is missing
    if (!email || !password) {
      return res.status(404).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const user = await parentM.findOne({ email: email }).select("+password");

    //To check if the password provided is right or wrong
    if (!user || !user.correctPassword(password, user.password)) {
      return res.status(404).json({
        status: "failed",
        message: "Incorrect email or password",
      });
    }

    // Generating token for user with correct credential
    const token = signToken(user._id);
    return res.status(200).json({
      status: "success",
      token: token,
      user: user["id"],
    });
  } catch (error) {}
};
