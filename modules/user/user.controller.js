const { PassThrough } = require("nodemailer/lib/xoauth2");
const userModel = require("./user.model");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
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

    if (userData) {
      res.render("userRegistration", {
        message:
          "Your registration has been done successfully.Please Verify Your mail.",
      });
    } else {
      res.render("userRegistration", {
        message: "Your registration has been failed.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { insertedData };
