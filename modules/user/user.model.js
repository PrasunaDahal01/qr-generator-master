const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

  is_verified: {
    type: Boolean,
    default: true, //for email verification
  },
});

module.exports = mongoose.model("User", userSchema);
