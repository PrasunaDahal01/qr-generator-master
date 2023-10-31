const userModel = require("./user.model");
const { securePassword } = require("../../utils/bcrypt");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/jwtToken");
const otpModel = require("../otp/otp.model");
const otpController = require("../otp/otp.controller");

const sendOTP = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: "This email is already registered.",
    };
  } else {
    //generate OTP
    const otpResult = await otpController.sendOtp(email);
    if (otpResult.success) {
      return {
        success: true,
        message: "Check your mail to get OTP.",
      };
    } else {
      return {
        success: false,
        message: "Failed to send OTP",
      };
    }
  }
};

//to get the user data that user has inserted:
const registerUser = async (email, password, otp) => {
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "This email is already registered.",
        showOTPInput: false, // No need to show OTP input in this case
      };
    }

    const sPassword = await securePassword(password);
    const user = new userModel({
      email,
      password: sPassword,
      is_verified: true,
    });

    const userData = await user.save();

    if (userData) {
      return {
        success: true,
        message: "Your registration has been done successfully.",
        showOTPInput: true,
      };
    } else {
      return {
        success: false,
        message: "Your registration has been failed.",
        showOTPInput: false,
      };
    }
  } catch (error) {
    console.error(error.message);
    return {
      success: false,
      message: "Registration failed. Please try again.",
      showOTPInput: false,
    };
  }
};

const loginUser = async (email, password) => {
  //find user in DB
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return { success: false, message: "Couldnot found your email." };
  }

  //matching the paword
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    const token = generateAccessToken(user._id);
    return { success: true, message: "Login Successful", token };
  } else {
    return { success: false, message: "Password is incorrect." };
  }
};
const getUser = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = { sendOTP, registerUser, loginUser, getUser };
