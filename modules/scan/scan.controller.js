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
      const pipeline = [
        {
          $match: { qrDocumentId: qrDocument._id },
        },
        {
          $group: {
            _id: "$qrDocumentId",
            TextUrl: "$qrDocument.qrtext",
            IpAddress: "$IpAddress",
            UniqueScans: { $sum: 1 },
            TotalScans: { $sum: "$count" },
          },
        },
      ];
      const result = await scanModel.aggregate(pipeline); //result is an array of documents that match the aggregation criteria.
      if (result.length > 0) {
        response = result[0];
      }
    } else {
      response = { error: "QR code not found" };
    }
    return response;
  }
}

module.exports = new Scan();
