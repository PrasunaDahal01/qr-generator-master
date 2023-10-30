const userModel = require("../user/user.model");
const otpModel = require("./otp.model");
const otpGenerator = require("otp-generator");

async function sendOtp(email) {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      message: "User is already registered.",
    };
  }

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  let result = await otpModel.findOne({ otp: otp });
  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
    });
    result = await otpModel.findOne({ otp: otp });
  }

  const otpPayload = { email, otp };
  const otpBody = await otpModel.create(otpPayload);
  return {
    success: true,
    message: "OTP sent successfully.",
    otp,
  };
}

module.exports = { sendOtp };
