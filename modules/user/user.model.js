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
    default: 0, //for email verification
  },
});

module.exports = mongoose.model("User", userSchema);
