const userModel = require("./user.model");
const { securePassword } = require("../../utils/bcrypt");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/jwtToken");

//to get the user data that user has inserted:
const registerUser = async (email, password) => {
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return { success: false, message: " This email is already registered." };
    }
    const sPassword = await securePassword(password);
    const user = new userModel({
      email,
      password: sPassword,
    });

    //generate a token for user and send it.
    const token = generateAccessToken(user._id);

    user.access_token = token;

    const userData = await user.save();

    if (userData) {
      return {
        success: true,
        message: "Your registration has been done successfully.",
        token,
      };
    } else {
      return { success: false, message: "Your registration has been failed." };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (email, password) => {
  //find user in DB
  const user = await userModel.findOne({ email }).select("+password");
  console.log("user", user);

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
module.exports = { registerUser, loginUser, getUser };
