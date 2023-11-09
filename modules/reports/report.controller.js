const qrModel = require("../qr/qr.model");

class Report {
  async getQrCodes() {
    try {
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
      const result = await qrModel.aggregate(pipeline);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getQrDetails(uuid) {
    try {
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
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new Report();
