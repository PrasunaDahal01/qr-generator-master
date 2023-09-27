//apps functions
// the controller will contain the code which you are going to send to the user.
//controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
const path = require("path");
const qrcode = require("qrcode");
const qrmodel = require("./qr.model");

class Qr {
  async generateQr(body) {
    //function to generate QR npm package
    const code = await qrcode.toDataURL(body.name);

    // create qr in db

    // save the qr id in scan info

    console.log("Hello", code);
    return code;
  }

  /* async createQr(code) {
    const qr = new Qr({
      code,
    });
    const result = await qr.save();
    console.log(result);
  }
  */
}

module.exports = new Qr();
