const teacherM = require("../modals/teacher");

exports.teacherHome = async (req, res) => {
  //   console.log(req.body);
  const body = {
    location: req.body.location,
    subject: req.body.subject,
    fees: req.body.fees,
  };

  const teacher = await teacherM.findOneAndUpdate({ Tid: req.params.id }, body);
  if (teacher) {
    return res
      .status(200)
      .json({
        status: "success",
        message: "Teacher information succesfully updated",
      });
  }
};
