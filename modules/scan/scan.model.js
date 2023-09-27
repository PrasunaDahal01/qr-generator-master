const mongoose = require("mongoose");
const { Schema } = mongoose;

const scanSchema = new Schema({
  qrId: mongoose.Schema.ObjectId,
  IpAddress: String,
  count: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("QRScanInfo", scanSchema);
