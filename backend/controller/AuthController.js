const userM = require("../modals/user");
const parentM = require("../modals/parent");
const teacherM = require("../modals/teacher");
var jwt = require("jsonwebtoken");

const signToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_secret, {
    expiresIn: process.env.JWT_expires,
  });
};

// Sign up for student
exports.createUser = async (req, res) => {
  console.log(req.body);

  const newUser = await userM.create(req.body);

  const token = signToken(newUser._id);

  const cookie_option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookie_option.secure = true;

  // Sending token as cookie
  res.cookie("token", token, cookie_option);

  res.status(200).json({
    status: "success",
    token,
    data: newUser,
  });

  try {
  } catch (error) {
    res.status(400).json({ status: "Server error", message: error });
  }
};

// Sign Up for teacher
exports.createTeacher = async (req, res) => {
  console.log(req.body);

  const newUser = await teacherM.create(req.body);

  const token = signToken(newUser._id);

  const cookie_option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookie_option.secure = true;

  // Sending token as cookie
  res.cookie("token", token, cookie_option);

  res.status(200).json({
    status: "success",
    token,
    data: newUser,
  });

  try {
  } catch (error) {
    res.status(400).json({ status: "Server error", message: error });
  }
};

// Sign Up for parent
exports.createParent = async (req, res) => {
  console.log(req.body);

  const newUser = await parentM.create(req.body);

  const token = signToken(newUser._id);

  const cookie_option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookie_option.secure = true;

  // Sending token as cookie
  res.cookie("token", token, cookie_option);

  res.status(200).json({
    status: "success",
    token,
    data: newUser,
  });

  try {
  } catch (error) {
    res.status(400).json({ status: "Server error", message: error });
  }
};
