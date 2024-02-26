const userModel = require("./user.model");
const { securePassword } = require("../../utils/bcrypt");
const otpController = require("../otp/otp.controller");
const randomstring = require("randomstring");
const { addUserMail } = require("../../services/mail/mail.service");

const sendOTP = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: "This email is already registered.",
    };
  } else {
    //generate OTP
    const otpResult = await otpController.sendadminOtp(email);
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
//admin registers
const registerAdmin = async (email, password, otp, role) => {
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
      role: role,
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
//getting the user by Id.
const getUser = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

//finding the id to update the profile
const editProfile = async (id) => {
  const userData = await userModel.findById({ _id: id });
  if (userData) {
    return userData;
  } else {
    return {
      success: false,
      message: "User not found.",
    };
  }
};

//now updating the profile
const updateProfile = async (email, user_id) => {
  const userData = await userModel.findByIdAndUpdate(
    { _id: user_id },
    { $set: { email: email } }
  );
  if (userData) {
    return {
      success: true,
      message: "Your Profile has been updated.",
    };
  } else {
    return {
      success: false,
      message: "Cannot Update Profile.",
    };
  }
};

//create new user and send to email for verification
const addNewUser = async (email) => {
  const password = randomstring.generate(8);
  const sPassword = await securePassword(password);

  const user = new userModel({
    email: email,
    password: sPassword,
    is_verified: true,
  });
  const userData = await user.save();
  if (userData) {
    addUserMail(email, password);
    return {
      success: true,
      message: "New user is added.",
    };
  } else {
    return {
      success: false,
      message: "Unable to add new user.",
    };
  }
};

//get user for editing
const getEditUser = async (id) => {
  const userData = await userModel.findById({ _id: id });
  if (userData) {
    return userData;
  } else {
    return {
      success: false,
      message: "Could not find your ID for update.",
    };
  }
};

//edit user by admin
const editUser = async (id, email, verify) => {
  const userData = await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: { email: email, is_verified: verify } }
  );
  if (userData) {
    return {
      success: true,
      message: "User is updated.",
    };
  } else {
    return {
      success: false,
      message: "Unable to update user.",
    };
  }
};

//delete user by admin
const archiveUser = async (id) => {
  const userData = await userModel.findById(id);
  console.log("userData", userData);
  if (userData) {
    userData.status = "archived";
    const updatedData = await userData.save();
    return updatedData;
  }
};
module.exports = {
  getUser,
  sendOTP,
  registerAdmin,
  addNewUser,
  editUser,
  editProfile,
  updateProfile,
  getEditUser,
  archiveUser,
};
