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
      return res.status(500).send(err);
    }
  });
  const data = await userDM.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    {
      teacher: { tid: req.params.tid },
      assignment: { $push: { title: name } },
    }
  );
  console.log(data);
  res
    .status(200)
    .json({ status: "success", message: "Image Uploaded Successfully" });
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
    const data = await userDM.find(
      { userID: req.params.id },
      { teacher: { $elemMatch: { tid: { $in: req.params.tid } } } }
    );

    // const data = await userDM.find({
    //   userID: req.params.id,
    //   teacher: { $elemMatch: { tid: { $in: req.params.tid } } },
    // });
    console.log("ehlo", data);
    res.status(200).json({ status: "success", message: data[0]["teacher"][0] });
    // res.status(200).json({ status: "success", message: data[0]["teacher"] });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "Something went wrong " });
  }
};
