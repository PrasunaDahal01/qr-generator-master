const userModel = require("./user.model");
const { securePassword } = require("../../utils/bcrypt");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/jwtToken");

//to get the user data that user has inserted:
const registerUser = async (email, password) => {
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return "This email is already registered.";
    }
    const sPassword = await securePassword(password);
    const user = new userModel({
      email,
      password: sPassword,
      is_admin: 0,
    });

    //generate a token for user and send it.
    const token = generateAccessToken(user._id);

    user.access_token = token;

    const userData = await user.save();

    return userData
      ? "Your registration has been done successfully. Please verify Your mail."
      : "Your registration has been failed.";
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (email, password) => {
  if (!(email && password)) {
    return { message: "Fields cannot be empty" };
  }

  //find user in DB
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return { message: "Couldnot found your email." };
  }

  //matching the paword
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (user && isPasswordMatch) {
    const token = generateAccessToken(user._id);

    return { message: "Login Successful", token };
  } else {
    return { message: "Password is incorrect." };
  }
};
module.exports = { registerUser, loginUser };
