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
  console.log("otpEmailInfo", mailOptions);
  try {
    const mailResponse = transporter.sendMail(mailOptions);
    console.log("Email sent successfully.", mailResponse);
    return mailResponse;
  } catch (error) {
    console.log("Error occured while sending email.", error);
  }
}
module.exports = { sendEmail, transporter };
