const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

// 4
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already signed up",
      });
    }

    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    } else if (otp !== recentOTP[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP didnt match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileDetails = await Profile.create({
      dateOfBirth: null,
      about: null,
      contactNumber,
    });

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      accountType,
      additionalData: profileDetails._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    const savedUser = await user.save();

    return res.status(200).json({
      success: true,
      savedUser,
      message: "User signed up successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const ifUserExists = await User.findOne({ email });

    if (ifUserExists) {
      return res.status(401).json({
        success: false,
        message: "User already signed up",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    var result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        specialChars: false,
      });
    }

    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & password are required",
      });
    }

    const user = await User.findOne({ email }).populate("additionalData");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please sign up",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const userObject = user.toObject();
      userObject.token = token;
      userObject.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: userObject,
        message: "User logged in successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};
