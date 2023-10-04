const { default: mongoose } = require("mongoose");
const qrModel = require("../qr/qr.model");
const scanModel = require("../scan/scan.model");

class Report {
  async getQrCodes() {
    try {
      const qrCodes = await qrModel.find();
      const pipeline = [
        {
          $lookup: {
            from: "qrscaninfos",
            localField: "_id",
            foreignField: "qrDocumentId",
            as: "scanDetails",
          },
        },
        {
          $addFields: {
            uniqueScans: {
              $size: "$scanDetails",
            },
            totalCount: {
              $sum: "$scanDetails.count",
            },
          },
        },
        {
          $project: {
            _id: 0,
            qrId: 1,
            qrText: 1,
            scanDetails: 1,
            uniqueScans: 1,
            totalCount: 1,
          },
        },
      ];
      const result = await qrModel.aggregate(pipeline); //result is an array of documents that match the aggregation criteria.
      if (result.length > 0) {
        return result;
      }

      return qrCodes;
    } catch (error) {
      throw error;
    }
  }

  async getQrDetails(uuid) {
    try {
      //const qrDetails = await scanModel.findOne({ qrDocumentId: uuid });
      const pipeline = [
        {
          $match: { qrId: uuid },
        },
        {
          $lookup: {
            from: "qrscaninfos",
            localField: "_id",
            foreignField: "qrDocumentId",
            as: "scanDetails",
          },
        },
        {
          $addFields: {
            uniqueScans: {
              $size: "$scanDetails",
            },
            totalCount: {
              $sum: "$scanDetails.count",
            },
          },
        },
        {
          $project: {
            _id: 0,
            qrId: 1,
            qrText: 1,
            scanDetails: 1,
            uniqueScans: 1,
            totalCount: 1,
          },
        },
      ];
      const result = await qrModel.aggregate(pipeline); //result is an array of documents that match the aggregation criteria.
      if (result.length > 0) {
        return result;
      }

      // return qrDetails;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new Report();
