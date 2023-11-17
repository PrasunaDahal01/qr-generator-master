const userModel = require("./user.model");
const randomstring = require("randomstring");
const otpController = require("../otp/otp.controller");
const { encryptPassword } = require("../../utils/bcrypt");
const { addUserMail } = require("../../services/mail/mail.service");

const sendOTP = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("This email is taken.");
  const otpResult = await otpController.sendadminOtp(email);
  if (!otpResult) throw new Error("Failed To Send OTP.");
  return {
    success: true,
    message: "Check your mail to get OTP.",
  };
};

const register = async (email, password, role, image) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("This email is taken.");

  const ePassword = await encryptPassword(password);
  const user = new userModel({
    email,
    password: ePassword,
    role: role,
    is_verified: true,
    image,
  });
  await user.save();
  return {
    success: true,
    message: "Registration Done.",
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

const updateProfile = async (email, user_id, image) => {
  if (!image) {
    await userModel.findByIdAndUpdate(
      { _id: user_id },
      { $set: { email: email } }
    );
  }
  const userData = await userModel.findByIdAndUpdate(
    { _id: user_id },
    { $set: { email: email, image: image } }
  );

  if (!userData) throw new Error("Cannot Update Profile. ");
  return {
    success: true,
    message: "Profile updated.",
  };
};

const addNewUser = async (email, image) => {
  const password = randomstring.generate(8);
  const ePassword = await encryptPassword(password);
  const user = new userModel({
    email: email,
    password: ePassword,
    is_verified: true,
    image,
  });
  const userData = await user.save();
  if (!userData) throw new Error("Unable to add new User");
  addUserMail(email, password);
  return {
    success: true,
    message: "New user added.",
  };
};

const getEditUser = async (id) => {
  const userData = await userModel.findById({ _id: id });
  if (!userData) throw Error("Update failed.");
  return userData;
};

const editUser = async (id, email, verify, role, image) => {
  const userData = await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: { email: email, is_verified: verify, role: role, image: image } }
  );
  if (!userData) throw new Error("Unable to update user.");
  return {
    success: true,
    message: "Updated.",
  };
};

const archiveUser = async (id) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: { archived: true } }
  );
  if (!updatedUser) throw new Error("User not found");
  return {
    success: true,
  };
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
