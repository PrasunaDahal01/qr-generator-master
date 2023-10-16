const userModel = require("./user.model");
const bcrypt = require("bcrypt");

const securePassword = (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error.message);
  }
};

//to get the user data that user has inserted:
const insertedData = async (req, res) => {
  try {
    const sPassword = await securePassword(req.body.password);
    const user = new userModel({
      email: req.body.email,
      password: sPassword,
      is_admin: 0,
    });
    const userData = await user.save();

    const message = userData
      ? "Your registration has been done successfully. Please verify Your mail."
      : "Your registration has been failed.";

    res.render("userRegistration", { message });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { insertedData };
