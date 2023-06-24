const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    maxlength: [30, "Maximum 25 characters"],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not same",
    },
  },
  location: {
    type: String,
    // required: [true, "Provide your location"],
  },
});

// Salting and hashing of password
TeacherSchema.pre("save", async function (next) {
  // Only when the password is modified not every time the queryv is updated
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const teacherM = mongoose.model("teacher", TeacherSchema);
module.exports = teacherM;
