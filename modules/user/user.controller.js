const userModel = require("./user.model");
const { encryptPassword } = require("../../utils/bcrypt");
const otpController = require("../otp/otp.controller");
const randomstring = require("randomstring");
const { addUserMail } = require("../../services/mail/mail.service");

const sendOTP = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email already in use.");
  const otpResult = await otpController.sendadminOtp(email);
  if (!otpResult) throw new Error("Failed To Send OTP.");
  return {
    success: true,
    message: "Check your mail to get OTP.",
  };
};

const register = async (email, password, role) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email already in use.");

  const ePassword = await encryptPassword(password);
  const user = new userModel({
    email,
    password: ePassword,
    role: role,
  });
  const userData = await user.save();

  if (!userData) throw new Error("Your registration has failed.");

  return {
    success: true,
    message: "Your registration has been done successfully.",
    showOTPInput: true,
  };
};

const getUser = async (userId) => {
  const user = await userModel.findById(userId);
  return user;
};

const editProfile = async (id) => {
  const userData = await userModel.findById({ _id: id });
  if (!userData) throw new Error("User not found");
  return userData;
};

const updateProfile = async (email, user_id) => {
  const userData = await userModel.findByIdAndUpdate(
    { _id: user_id },
    { $set: { email: email } }
  );
  if (!userData) throw new Error("Cannot Update Profile. ");
  return {
    success: true,
    message: "Your Profile has been updated.",
  };
};

const addNewUser = async (email) => {
  const password = randomstring.generate(8);
  const ePassword = await encryptPassword(password);
  const user = new userModel({
    email: email,
    password: ePassword,
    is_verified: true,
  });
  const userData = await user.save();
  if (!userData) throw new Error("Unable to add new User");
  addUserMail(email, password);
  return {
    success: true,
    message: "New user is added.",
  };
};

const getEditUser = async (id) => {
  const userData = await userModel.findById({ _id: id });
  if (!userData) throw Error("Couldnot find your Id for update");
  return userData;
};

const editUser = async (id, email, verify) => {
  const userData = await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: { email: email, is_verified: verify } }
  );
  if (!userData) throw new Error("Unable to update user.");
  return {
    success: true,
    message: "User is updated.",
  };
};

const archiveUser = async (id) => {
  const userData = await userModel.findById(id);
  if (userData) {
    userData.status = "archived";
    const updatedData = await userData.save();
    return updatedData;
  }
};
module.exports = {
  getUser,
  sendOTP,
  register,
  addNewUser,
  editUser,
  editProfile,
  updateProfile,
  getEditUser,
  archiveUser,
};
