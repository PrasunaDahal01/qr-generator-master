require("dotenv").config();
const path = require("path");
const qrcode = require("qrcode");
const qrModel = require("./qr.model");
const { v4: uuidv4 } = require("uuid");

class Qr {
  async generateQr(qrTextValue) {
    const uuid = uuidv4();
    const hostUrl = process.env.HOST_URL;
    const code = qrcode.toDataURL(`${hostUrl}/scans/${uuid}`);
    const payload = { qrText: qrTextValue, qrId: uuid };
    await qrModel.create(payload);
    return code;
  }
}

module.exports = new Qr();
