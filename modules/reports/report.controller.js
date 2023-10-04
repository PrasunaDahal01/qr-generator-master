const { default: mongoose } = require("mongoose");
const qrModel = require("../qr/qr.model");
const scanModel = require("../scan/scan.model");

class Report {
  async getQrCodes() {
    try {
      const qrCodes = await qrModel.find();
      return qrCodes;
    } catch (error) {
      throw error;
    }
  }

  async getQrDetails(uuid) {
    try {
      const qrDetails = await scanModel.findOne({ qrDocumentId: uuid });
      const pipeline = [
        {
          $match: { qrDocumentId: mongoose.Types.ObjectId(_id) },
        },
        {
          $lookup: {
            from: "qrscaninfos",
            localField: "_id",
            foreignField: "qrDocumentId",
            as: "ScanDetails",
          },
        },
        {
          $group: {
            _id: "$qrDocumentId",
            TextUrl: "$qrtext",
            IpAddress: "$IpAddress",
            UniqueScans: { $sum: { $size: "$ScanDetails" } },
            TotalScans: { $sum: "$count" },
          },
        },
      ];
      const result = await scanModel.aggregate(pipeline); //result is an array of documents that match the aggregation criteria.
      if (result.length > 0) {
        return result;
      }

      return qrDetails;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new Report();
