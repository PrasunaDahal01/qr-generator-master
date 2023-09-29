const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const scanSchema = new Schema({
  QrId: {
    type: ObjectId,
    ref: "QrCode",
  },
  IpAddress: String,
  count: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("QRScanInfo", scanSchema);
