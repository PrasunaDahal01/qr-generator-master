const qrModel = require("../qr/qr.model");
const scanModel = require("../scan/scan.model");

class Scan {
  async scanQR(ipAddress, qrId) {
    let response;

    const qrDocument = await qrModel.findOne({ qrId });

    if (qrDocument) {
      const existingDocument = await scanModel.findOne({
        IpAddress: ipAddress,
        qrDocumentId: qrDocument._id,
      });

      if (existingDocument) {
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
    } else {
      throw new Error("QR code not found");
    }
    return { response, qrDocument };
  }
}

module.exports = new Scan();
