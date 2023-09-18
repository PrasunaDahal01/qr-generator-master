const mongoose = require("mongoose");
const QrCode = require("./qr.controller");
const { Schema } = mongoose;

const qrSchema = new Schema({
  code: String,
});
const Qr = new mongoose.model("QrCode", qrSchema);
// const qr = mongoose.model("qr", Qr);
async function createQr(code) {
  const qr = new Qr({
    code,
  });
  const result = await qr.save();
  console.log(result);
}

const scanSchema = new Schema({
  qrId: mongoose.Schema.ObjectId,
  ip: [String], //array of strings
  count: Number,
});
const ScanInfo = new mongoose.model("QRScanInfo", scanSchema);

async function createscan(qrId, ip, count) {
  const scaninfo = new ScanInfo({
    qrId,
    ip,
    count,
  });
  const result = await scaninfo.save();
  console.log(result);
}

module.exports = Qr;
module.exports = ScanInfo;
