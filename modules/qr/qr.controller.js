//apps functions
// the controller will contain the code which you are going to send to the user.
//controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
const path = require("path");
const qrcode = require("qrcode");
const qrModel = require("./qr.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
class Qr {
  async generateQr(qrTextValue) {
    console.log(qrTextValue);
    //generating a UUIdv4
    const uuid = uuidv4();

    const hostUrl = process.env.HOST_URL;
    const code = qrcode.toDataURL(`${hostUrl}/scans/${uuid}`);
    const payload = { qrText: qrTextValue, qrId: uuid };
    console.log(payload);
    await qrModel.create(payload);
    return code;
  }
}

module.exports = new Qr();
