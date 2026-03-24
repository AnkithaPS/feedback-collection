const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(`Error connecting mongodb: ${error.message}`);
  }
};

module.exports = connectDB;
