const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  is_verified: {
    type: Boolean,
    default: false, //for email verification
  },

  access_token: {
    type: String,
  },
});

module.exports = mongoose.model("userRegisters", userSchema);
