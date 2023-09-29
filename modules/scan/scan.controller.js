const scanModel = require("../scan/scan.model");
const qrModel = require("../qr/qr.model");

class Scan {
  async scanQR(ipAddress) {
    let response;
    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    const qrDocument = await qrModel.findOne({ QrId: qrId });

    if (qrDocument) {
      const existingIp = await scanModel.findOne({
        IpAddress: ipAddress,
        QrId: qrId,
      });

      if (existingIp) {
        //if the IP address exists, increment the count
        response = await scanModel.findByIdAndUpdate(existingIp, {
          $inc: { count: 1 },
        });
      } else {
        const payload = { IpAddress: ipAddress, QrId: qrId };
        response = await scanModel.create(payload);
      }

      //commenting it out as it may not require.......response = await existingIp.save();
    } else {
      response = { error: "QR code not found" };
    }
    return response;
  }
}

module.exports = new Scan();
