const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrSchema = new Schema({
  qrtext: { type: String },
});

module.exports = mongoose.model("QrCode", qrSchema);
