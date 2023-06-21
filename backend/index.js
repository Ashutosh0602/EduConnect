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

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "Success", message: "Hello this is get world!!" });
});
app.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  const arr = [body.name, body.branch, body.year];
  res.status(200).json({ status: "Success", message: arr?.[1] });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (!err) console.log("Successfully connectd to the port", PORT);
  else console.error("Failed to connect to server");
});
