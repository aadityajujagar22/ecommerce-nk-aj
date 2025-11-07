// 2

const express = require("express");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

require("dotenv").config();
dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running...",
  });
});

app.listen(PORT, () => {
  console.log(`App is live on PORT: ${PORT}`);
});
