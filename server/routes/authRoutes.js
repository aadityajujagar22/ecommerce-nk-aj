const express = require("express");
const router = express.Router();

const { login, signup, sendOTP } = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/send-otp", sendOTP);

module.exports = router;
