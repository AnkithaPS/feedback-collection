require("dotenv").config();
const express = require("express");
const config = require("./config");
const Feedback = require("./models/Feedback");
const path = require("path");
const connectDB = require("./utils/connectDB");
const feedbackEmail = require("./utils/emailService");
const app = express();

//Connect to database
connectDB();
//middleware
app.use(express.urlencoded({ extended: true }));
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

//send feedback
app.post("/submit-feedback", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    //send mail
    await feedbackEmail(feedback);
    res.render("success", { message: "Thank you for your feedback" });
  } catch (error) {
    res.render("error", {
      message: "An error occurred while sending feedback",
    });
  }
});
//fetch all feedback
app.get("/admin", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.render("admin", { feedbacks });
  } catch (error) {
    res.render("error", {
      message: "An error occurred while fetching feedback",
    });
  }
});
//Server start
const PORT = config.port || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
