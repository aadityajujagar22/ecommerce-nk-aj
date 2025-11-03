const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((e) => {
      console.log("Failed to connect to DB");
      console.error(e);
      process.exit(1);
    });
};
