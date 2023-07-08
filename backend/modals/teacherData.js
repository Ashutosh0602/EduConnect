const mongoose = require("mongoose");

const teacherDataSchema = mongoose.Schema({
  teacherID: {
    Tid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    student: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        classroom: {
          assignment: [
            {
              date: new Date.now(),
              title: String,
              description: String,
            },
          ],
          test: [
            {
              date: new Date.now(),
              name: String,
              marks: String,
            },
          ],
        },
      },
    ],
  },
});

const teacherDM = mongoose.model("TeacherData", teacherDataSchema);

module.exports = teacherDM;
