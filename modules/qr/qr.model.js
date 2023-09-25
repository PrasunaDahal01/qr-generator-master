const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrSchema = new Schema({
  scanread: String,
});
module.exports = mongoose.model("QrCode", qrSchema);
