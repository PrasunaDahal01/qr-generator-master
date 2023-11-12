const otpModel = require("./otp.model");
const otpGenerator = require("otp-generator");
const userModel = require("../user/user.model");

async function sendOtp(email) {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) throw new Error("This email is taken.");
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
  await otpModel.create(otpPayload);
  return {
    success: true,
    otp,
  };
}

async function sendadminOtp(email) {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) throw new Error("This email is taken.");

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
  await otpModel.create(otpPayload);
  return {
    success: true,
    otp,
  };
}

async function verifyOTP(email, otp) {
  const otpRecord = await otpModel.findOne({ email: email, otp: otp });
  if (otpRecord) {
    await otpModel.deleteOne({ email, otp });
    return {
      success: true,
    };
  }
}

async function verifyadminOTP(email, otp) {
  const otpRecord = await otpModel.findOne({ email: email, otp: otp });
  if (otpRecord) {
    await otpModel.deleteOne({ email, otp });
    return {
      success: true,
    };
  }
}
module.exports = { sendOtp, verifyOTP, sendadminOtp, verifyadminOTP };
