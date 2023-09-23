const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrSchema = new Schema({
  code: String,
});
const Qr = mongoose.model("QrCode", qrSchema);

const scanSchema = new Schema({
  qrId: mongoose.Schema.ObjectId,
  ip: [String], //array of strings
  count: Number,
});
const ScanInfo = mongoose.model("QRScanInfo", scanSchema);

module.exports = {
  Qr,
  ScanInfo,
};
