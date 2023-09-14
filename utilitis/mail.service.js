const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "prasuna.rumsan@gmail.com",
    pass: "lvshcymrdnupfmhj",
  },
});
module.exports = transporter;
