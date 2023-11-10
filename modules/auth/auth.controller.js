const userModel = require("../user/user.model");
const { encryptPassword } = require("../../utils/bcrypt");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/jwtToken");
const { generateRefreshToken } = require("../../utils/jwtToken");
const { sendPasswordMail } = require("../../services/mail/mail.service");
const otpController = require("../otp/otp.controller");

const sendOTP = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email already in use.");

  const otpResult = await otpController.sendOtp(email);
  if (!otpResult) throw new Error("Failed To send OTP.");

  return {
    success: true,
    message: "Check your mail to get OTP.",
  };
};

const register = async (email, password) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email already in use.");

  const ePassword = await encryptPassword(password);
  const user = new userModel({
    email,
    password: ePassword,
  });

  return user.save();
};

const forgetPassword = async (email) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Couldnot Found Your Email");

  const token = generateAccessToken(user._id);
  await userModel.updateOne({ email }, { $set: { token: token } });

  sendPasswordMail(user.email, token);

  return {
    success: true,
    message: "Please check your mail to reset your password.",
  };
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("Could not Found Your Email");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Password is incorrect.");

  const token = generateAccessToken(user._id, user.role);

  return { success: true, message: "Login Successful", token };
};

const resetPass = async (token) => {
  const tokenData = await userModel.findOne({ token });
  if (!tokenData) throw new Error("Token Not Found");

  return tokenData;
};

const resetPassword = async (password, user_id) => {
  const ePassword = await encryptPassword(password);
  const updatedData = await userModel.findByIdAndUpdate(
    { _id: user_id },
    { $set: { password: ePassword, token: "" } }
  );

  return updatedData;
};

const changePassword = async (password, newpassword, user_id) => {
  const userData = await userModel
    .findById({ _id: user_id })
    .select("+password");
  const isPasswordMatch = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatch) throw new Error("Your current password is incorrect.");

  const ePassword = await encryptPassword(newpassword);
  await userModel.findByIdAndUpdate(
    { _id: user_id },
    { $set: { password: ePassword } }
  );

  return { success: true, message: "Password changed." };
};

module.exports = {
  sendOTP,
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  resetPass,
};
