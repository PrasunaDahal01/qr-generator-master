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
      return qrDetails;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new Report();
