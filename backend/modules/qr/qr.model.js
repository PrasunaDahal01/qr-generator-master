const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const qrSchema = new Schema({
  qrText: { type: String },
  qrId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
});

module.exports = mongoose.model("QrCode", qrSchema);
