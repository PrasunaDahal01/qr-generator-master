const scanModel = require("../scan/scan.model");
const qrModel = require("../qr/qr.model");

class Scan {
  async scanQR(ipAddress, qrId) {
    let response;
    console.log("recieved", qrId);
    const qrDocument = await qrModel.findOne({ qrId });
    console.log("qrDocument:", qrDocument);

    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    if (qrDocument) {
      const existingDocument = await scanModel.findOne({
        IpAddress: ipAddress,
        qrDocumentId: qrDocument._id,
      });
      console.log("existingDocument", existingDocument);

      if (existingDocument) {
        //if the IP address exists, increment the count
        response = await scanModel.findByIdAndUpdate(existingDocument._id, {
          $inc: { count: 1 },
        });
      } else {
        const payload = {
          IpAddress: ipAddress,
          qrDocumentId: qrDocument._id,
        };
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
