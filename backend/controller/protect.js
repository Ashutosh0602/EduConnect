const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const userM = require("../modals/user");

exports.protect = async (req, res, next) => {
  //Get token to check if it's there

  console.log(req.headers.authorization.split(" ")[1]);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: "Failed", message: "No token found" });
  }

  // Validation of token

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_secret);
    console.log(decoded);
  } catch (error) {
    return res
      .status(401)
      .json({ status: "Failed", message: "Irregular token found" });
  }

  // Check if the user still exist

  const freshUser = await userM.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({ status: "failed", message: "Invalid User" });
  }

  // Check if the user changes password after the issue of jwt

  //   if (freshUser.changedPasswordAfter(decoded.id)) {
  //     return res
  //       .status(401)
  //       .json({ status: "failed", message: "User recently changed Passowrd" });
  //   }
  req.user = freshUser;
  next();
};
