const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignment: [
    {
      title: {
        type: String,
        //   required:[true,"Please enter a name"]
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      submittedAt: {
        type: Date,
        default: null,
      },
      dueAt: {
        type: Date,
      },
      uploadFile: {
        type: String,
        default: null,
      },
      submitFile: {
        type: String,
        default: null,
      },
    },
  ],
});

const userDM = mongoose.model("UserData", UserSchema);

module.exports = userDM;
