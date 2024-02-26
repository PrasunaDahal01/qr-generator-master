const mongoose = require("mongoose");
const { Schema } = mongoose;
const { sendVerificationEmail } = require("../../services/mail/sendotpmail");

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 3,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = mongoose.model("OTP", otpSchema);
