const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrSchema = new Schema({
  qrtext: String,
});

module.exports = mongoose.model("QrCode", qrSchema);
