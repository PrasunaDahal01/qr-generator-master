const mongoose = require("mongoose");
const { Schema } = mongoose;

const scanSchema = new Schema({
  qrId: mongoose.Schema.ObjectId,
  IpAddress: {
    type: [String], //array of strings
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

async function createscan(qrId, ip, count) {
  try {
    const qr = await qr.findById(qrId);
    if (!qr) {
      console.log("QR code not found.");
      return;
    }
    const scaninfo = new ScanInfo({
      qrId: qrId,
      ip: ip,
      count: count,
    });
    const result = await scaninfo.save();
    console.log(result);
  } catch (error) {
    console.error("Error creating ScanInfo:", error);
  }
}

module.exports = mongoose.model("QRScanInfo", scanSchema);
