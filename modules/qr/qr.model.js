const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrSchema = new Schema({
  code: String,
});
const Qr = mongoose.model("QrCode", qrSchema);

module.exports = Qr;
