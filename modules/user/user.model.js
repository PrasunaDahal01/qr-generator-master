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
    default: "user",
    required: true,
  },

  is_verified: {
    type: Boolean,
    default: true, //for email verification
  },

  access_token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userRegisters", userSchema);
