const path = require("path");
const scanModel = require("../scan/scan.model");

class Scan {
  async scanQR(ipAddress, qrId) {
    let response;
    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    const existingIp = await scanModel.findOne({ IpAddress: ipAddress });
    console.log({ existingIp, ipAddress });
    if (existingIp) {
      //if the IP address exists, increment the count
      response = await scanModel.findByIdAndUpdate(existingIp, {
        $inc: { count: 1 },
      });
      response = await existingIp.save();
    } else {
      const payload = { IpAddress: ipAddress, qrId: qrId };
      response = await scanModel.create(payload);
    }
    return response;
  }
}

module.exports = new Scan();
