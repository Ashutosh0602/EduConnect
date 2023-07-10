const teacherM = require("../modals/teacher");
var studentM = require("../modals/user");

exports.studentHome = async (req, res) => {
  const teacher = await teacherM.find().select(["-password", "-_id"]);
  return res.status(200).json({ status: "success", data: teacher });
  console.log(teacher);
};
