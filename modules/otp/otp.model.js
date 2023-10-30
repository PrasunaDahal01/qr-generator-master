const mongoose = require("mongoose");
const { Schema } = mongoose;

const { sendVerificationEmail } = require("../../services/mail/sendotpmail");

const otpSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, //5 minutes
  },
});

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log("New document saved to the database");
    console.log("Email:", this.email);
    console.log("OTP:", this.otp);
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = mongoose.model("OTP", otpSchema);
