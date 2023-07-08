exports.studentAssignment = async (req, res) => {
  let uploadPath;

  var files = req.files.newFile;
  var name = files.name;

  //   Upload path with file name
  uploadPath = __dirname + "/public/student/" + name;

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
