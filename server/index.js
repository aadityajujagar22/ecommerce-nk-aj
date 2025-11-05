// 2

const express = require("express");
const app = express();
const { dbConnect } = require("./config/database");
const PORT = process.env.PORT || 4000;

require("dotenv").config();
dbConnect();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is live on port: ${PORT}`);
});
