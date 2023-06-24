const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const parentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    maxlength: [30, "Maximum 25 characters"],
  },
  email: {
    type: String,
    unique: true,
  },
});

// Salting and hashing of password
parentSchema.pre("save", async function (next) {
  // Only when the password is modified not every time the queryv is updated
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const parentM = mongoose.model("parent", parentSchema);
module.exports = parentM;
