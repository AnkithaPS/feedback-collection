require("dotenv").config();
const express = require("express");
const config = require("./config");
const Feedback = require("./models/Feedback");
const path = require("path");
const connectDB = require("./utils/connectDB");

const app = express();

//Connect to database
connectDB();
//middleware
app.use(express.json());

//view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Route
//home page
app.get("/", async (req, res) => {
  res.render("home");
});

//About page
app.get("/about", async (req, res) => {
  res.render("about");
});

//feedback form page
app.get("/submit", async (req, res) => {
  res.render("feedback-form");
});

//Server start
const PORT = config.port || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
