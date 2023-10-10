const scanModel = require("../scan/scan.model");
const qrModel = require("../qr/qr.model");
const splitContent = require("../../utils/splitcontent");

class Scan {
  async handleScan(uuid) {
    try {
      const qrData = await qrModel.findOne({ qrId: uuid });

      if (!qrData) {
        return { message: "QR code not found" };
      }
      const scannedContent = qrData.qrtext;

      if (
        scannedContent.startsWith("http://") ||
        scannedContent.startsWith("https://")
      ) {
        // If original content is a URL, you can redirect
        return { url: originalContent };
      } else {
        // If original content is text, send it as a response
        return { text: originalContent };
      }
    } catch (err) {
      throw err;
    }
  }
  async scanQR(ipAddress, qrId) {
    let response;

    const qrDocument = await qrModel.findOne({ qrId });

    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    if (qrDocument) {
      const existingDocument = await scanModel.findOne({
        IpAddress: ipAddress,
        qrDocumentId: qrDocument._id,
      });

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
    } else {
      response = { error: "QR code not found" };
    }
    return response;
  }
}

module.exports = new Scan();
