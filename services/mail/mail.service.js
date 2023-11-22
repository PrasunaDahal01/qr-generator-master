const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Auth_EMAIL,
    pass: process.env.Auth_PASS,
  },
});

async function sendEmail(email, title, body) {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: title,
    html: body,
  };

  try {
    const mailResponse = transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw error;
  }
}

const sendPasswordMail = async (email, token) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "For Reset Password:",
    html: `<p>Hello!! Please click  <a href = "http://localhost:3000/api/v1/auth/resetPassword?token=${token}">here </a>to reset your password.</p> `,
  };
  try {
    const mailResponse = transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw error;
  }
};

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
