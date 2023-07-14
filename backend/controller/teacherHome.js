const teacherM = require("../modals/teacher");
const teacherDM = require("../modals/teacherData");

exports.teacherHome = async (req, res) => {
  // console.log(req.user);
  //   console.log(req.body);
  const body = {
    location: req.body.location,
    subject: req.body.subject,
    fees: req.body.fees,
  };

  const teacher = await teacherM.findOneAndUpdate({ Tid: req.params.id }, body);
  if (teacher) {
    return res.status(200).json({
      status: "success",
      message: "Teacher information succesfully updated",
    });
  }
};

exports.teacherHomePanel = async (req, res) => {
  console.log(req.params.id);
  try {
    const teacherData = await teacherDM.findOne({ Tid: req.params.id });
    console.log(teacherData);
    res.status(200).json({ status: "success", data: teacherData["student"] });
  } catch (error) {
    res.status(401).json({ status: "failed", message: "Something went wrong" });
  }
};
