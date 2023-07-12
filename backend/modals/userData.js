const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: [true, "One ID cannot be used multiple times"],
    // ref: "User",
  },
  teacher: [
    {
      id: {
        type: String,
        // ref: "Teacher",
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
    },
  ],
});

const userDM = mongoose.model("UserData", UserDataSchema);

module.exports = userDM;
