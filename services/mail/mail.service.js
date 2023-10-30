const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Auth_EMAIL,
    pass: process.env.Auth_PASS,
  },
});
module.exports = transporter;
