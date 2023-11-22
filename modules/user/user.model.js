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

  image: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  is_verified: {
    type: Boolean,
    default: false,
  },

  token: {
    type: String,
    default: "",
  },

  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
