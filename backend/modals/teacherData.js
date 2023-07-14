const mongoose = require("mongoose");

const teacherDataSchema = new mongoose.Schema({
  Tid: {
    type: String,
    // ref: "Teacher",
  },
  student: [
    {
      Uid: {
        type: String,
        // ref: "User",
      },
      assignment: [
        {
          title: String,
          description: String,
          file: String,
          SubmitFile: String,
          date: { type: String, default: Date.now() },
        },
      ],
      test: [
        {
          name: String,
          marks: String,
          date: { type: String, default: Date.now() },
        },
      ],
    },
  ],
});

const teacherDM = mongoose.model("TeacherData", teacherDataSchema);

module.exports = teacherDM;
