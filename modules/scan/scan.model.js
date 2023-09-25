const mongoose = require("mongoose");
const { Schema } = mongoose;

const scanSchema = new Schema({
  qrId: mongoose.Schema.ObjectId,
  ip: [String], //array of strings
  count: { type: Number, default: 1 },
});
const ScanInfo = mongoose.model("QRScanInfo", scanSchema);

module.exports = ScanInfo;
