const express = require("express");
const app = express();

// To enable resources to collected from another domain
const cors = require("cors");
app.use(cors());

// To extract secret key without revealing
const dotenv = require("dotenv");
dotenv.config({ path: "./index.env" });

// To clean req form for cross site scripting
const xss = require("xss-clean");
app.use(xss());

// To control the header which come with http request
const hpp = require("hpp");
app.use(hpp());

// Data sanitization against NOSql Query injection
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize());

const path = require("path");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const mongoose = require("mongoose");
const userM = require("./modals/user");
mongoose
  .connect(
    `mongodb+srv://ashujn2del:${process.env.PASSWORD}@cluster2.ggzk2hx.mongodb.net/`,
    {
      useNewUrlParser: true,
    }
  )
  .then((con) => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log("Something went wrong on database server");
  });

// Routes for student
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

// Routes for teacher
const teacherRoute = require("./routes/teacherRoute");
app.use("/teacher", teacherRoute);

// Routes for parent
const parentRoute = require("./routes/parentRoute");
app.use("/parent", parentRoute);

app.get("/", async (req, res) => {
  const db = await userM.find();
  console.log(db);
  const data = res
    .status(200)
    .json({ status: "Success", message: "Hello this is get world!!" });
});
app.post("/", async (req, res) => {
  const db = await userM.create(req.body);

  res.status(200).json({ status: "Success", message: db });
});

// Making connection for backend server
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (!err) console.log("Successfully connectd to the port", PORT);
  else console.error("Failed to connect to server");
});
