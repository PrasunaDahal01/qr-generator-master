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

  is_admin: {
    type: Boolean,
    required: true,
  },

  is_verified: {
    type: Boolean,
    default: true, //for email verification
  },
  access_token: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("userRegisters", userSchema);
