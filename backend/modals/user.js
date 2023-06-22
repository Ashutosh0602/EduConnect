const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
  },
  Uid: {
    type: String,
    unique: [true, "Unique id is required"],
    required: [true, "Unique id is required"],
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
    required: [true, "Provide your location"],
  },
});

UserSchema.pre("save", async function (next) {
  // Only when the password is modified not every time the queryv is updated
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12, function (err, hash) {
    console.log(hash);
  });

  this.passwordConfirm = undefined;
  next();
});

const userM = mongoose.model("User", UserSchema);

module.exports = userM;
