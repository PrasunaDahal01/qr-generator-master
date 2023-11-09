const userModel = require("../user/user.model");
const { securePassword } = require("../../utils/bcrypt");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/jwtToken");
const { generateRefreshToken } = require("../../utils/jwtToken");
const { sendPasswordMail } = require("../../services/mail/mail.service");
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

// forget password to generate token and update the database with token and sending the email.
const forgetPassword = async (email) => {
  const user = await userModel.findOne({ email });

  if (user) {
    const token = generateAccessToken(user._id);
    const updatedData = await userModel.updateOne(
      { email },
      { $set: { token: token } }
    );

    sendPasswordMail(user.email, token);
    return {
      success: true,
      message: "Please check your mail to reset your password.",
    };
  } else {
    return { success: false, message: "Couldnot found your email." };
  }
};

//logging in
const loginUser = async (email, password) => {
  //find user in DB
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return { success: false, message: "Couldnot found your email." };
  }

  //matching the password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    const token = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    return { success: true, message: "Login Successful", token, refreshToken };
  } else {
    return { success: false, message: "Password is incorrect." };
  }
};

//get for reset password
const resetPass = async (token) => {
  const tokenData = await userModel.findOne({ token });
  if (tokenData) {
    return tokenData;
  } else {
    return {
      success: false,
      message: " Token not found",
    };
  }
};

//now setting new password
const resetPassword = async (password, user_id) => {
  const secure_Password = await securePassword(password);
  const updatedData = await userModel.findByIdAndUpdate(
    { _id: user_id },
    { $set: { password: secure_Password, token: "" } }
  );
  return updatedData;
};

const changePassword = async (password, newpassword, user_id) => {
  const userData = await userModel
    .findById({ _id: user_id })
    .select("+password");
  if (userData) {
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (isPasswordMatch) {
      const secNewPassword = await securePassword(newpassword);
      const setPassword = await userModel.findByIdAndUpdate(
        { _id: user_id },
        { $set: { password: secNewPassword } }
      );
      return { success: true, message: "Password changed." };
    } else {
      return {
        success: false,
        message:
          " Your current password is incorrect. Write the correct one to change password.",
      };
    }
  }
};

module.exports = {
  sendOTP,
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  changePassword,
  resetPass,
};
