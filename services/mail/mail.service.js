const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Auth_EMAIL,
    pass: process.env.Auth_PASS,
  },
});

//for otp
async function sendEmail(email, title, body) {
  //send email to users
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: title,
    html: body,
  };

  try {
    const mailResponse = transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
    return mailResponse;
  } catch (error) {
    console.log("Error occured while sending email.", error);
  }
}

//for reset password
const sendPasswordMail = async (email, token) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "For Reset Password:",
    html: `<p>Hello!! Please click  <a href = "http://localhost:3000/api/v1/auth/resetPassword?token=${token}">here </a>to reset your password.</p> `,
  };
  try {
    const mailResponse = transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
    return mailResponse;
  } catch (error) {
    console.log("Error occured while sending email.", error);
  }
};

//for the new user verification mail added by admin.
const addUserMail = async (email, password) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject:
      "Please verify your email because admin has added your email as users.",
    html: `<p>Hello!! Please click  <a href = "http://localhost:3000/auth/login">here </a>to login your email.</p> <br>
    <br>
    
    <b>Email: ${email} <br>
    <b> Password: ${password}`,
  };
  try {
    const mailResponse = transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail, transporter, sendPasswordMail, addUserMail };
