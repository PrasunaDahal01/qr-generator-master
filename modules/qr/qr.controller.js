//apps functions
// the controller will contain the code which you are going to send to the user.
//controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
const path = require("path");
const qrcode = require("qrcode");
const QrCode = require("./qr.model");
const { v4: uuidv4 } = require("uuid");
const splitContent = require("../../utils/splitcontent");

class Qr {
  async generateQr(qrTextValue) {
    try {
      //generating a UUIdv4
      const uuid = uuidv4();

      const code = qrcode.toDataURL(qrTextValue);

      const qrText = new QrCode({ qrtext: qrTextValue, qrId: uuid });
      await qrText.save();
      return code;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Qr();
