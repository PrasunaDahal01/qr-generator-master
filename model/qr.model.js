const mongoose = require("mongoose");
const QrCode = require("../modules/qr/qr.controller");

const Qr = new mongoose.model("QrCode", {
  code: String,
});

const ScanInfo = new mongoose.model("QRScanInfo", {
  qrId: mongoose.Schema.ObjectId,
  ipAddresses: Array, //array of strings
  count: Number,
});
module.exports = Qr;
