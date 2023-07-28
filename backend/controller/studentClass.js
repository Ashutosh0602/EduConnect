const userDM = require("../modals/userData");

exports.studentAssignment = async (req, res) => {
  let uploadPath;

  var files = req.files.newFile;
  var name = files.name;

  //   Upload path with file name
  uploadPath =
    "/Users/ashutoshrai/nextJs/e-class/e-class/e-class/backend/public/" + name;

  files.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res
        .status(200)
        .json({ status: "success", message: "Image Uploaded Successfully" });
    }
  });
};

exports.assignmentRetrive = async (req, res) => {
  try {
    const user = await userDM.findOne({ userID: req.params.id });
    res.status(200).json({ status: "success", data: user["teacher"] });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "Something went wrong " });
  }
};

exports.teacherAssignment = async (req, res) => {
  try {
    const assig = userDM.find({
      userID: req.params.id,
      "teacher.id": req.params.tid,
    });
    console.log(assig);

    res.status(200).json({ status: "success", message: "yahoo" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "Something went wrong " });
  }
};
