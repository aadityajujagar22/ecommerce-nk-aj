// 3.3

const mongoose = require("mongoose");
const mailSender = require("../emails/mailSender");
const { otpTemplate } = require("../emails/templates/otpEmail");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// 5
async function sendOTPEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification Mail from Instructor",
      otpTemplate(otp)
    );
  } catch (err) {
    console.log("Error while sending mail: ", err);
    throw err;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendOTPEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
