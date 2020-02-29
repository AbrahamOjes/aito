const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("mongodb connected.....");
  } catch (error) {
    console.log(error.message);
    // Exit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
