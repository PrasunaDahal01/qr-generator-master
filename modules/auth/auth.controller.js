const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwtToken");
const userModel = require("../user/user.model");
const { encryptPassword } = require("../../utils/bcrypt");
const otpController = require("../otp/otp.controller");
const { sendPasswordMail } = require("../../services/mail/mail.service");

const sendOTP = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("This email is taken.");
  const otpResult = await otpController.sendOtp(email);
  if (!otpResult) throw new Error("Failed to send OTP.");

  return {
    success: true,
    message: "Check your mail to get OTP.",
  };
};

const register = async (email, password, image) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("This email is taken.");
  const ePassword = await encryptPassword(password);

  const user = new userModel({
    email,
    password: ePassword,
    is_verified: true,
    image,
  });
  await user.save();
  return {
    success: true,
    message: "Registration Done",
  };
};

const forgetPassword = async (email) => {
  const user = await userModel.findOne({ email });
  console.log("user");
  if (!user) throw new Error("Couldnot found your email");

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
  if (!user) throw new Error("Please register first and then log in.");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Password is incorrect.");
  console.log(isPasswordMatch);
  const token = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);

  return { success: true, message: "Login Successful", token, refreshToken };
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

const regenerateToken = async (refreshToken) => {
  console.log("Attempting to regenerate token...");
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
  console.log("Token regenerated successfully.");
  return generateAccessToken(decoded.id, decoded.role);
};

module.exports = {
  sendOTP,
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  resetPass,
  regenerateToken,
};
