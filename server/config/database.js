const mongoose = require("mongoose");
// require('dotenv').config();
const url = "mongodb://127.0.0.1:27017/free-cards";

const connectDB = async (cb) => {
  try {
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
    cb();
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold);
  }
};

module.exports = connectDB;
