const path = require("path");
const scanModel = require("../scan/scan.model");

class Scan {
  async scanQR(ipAddress) {
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
      const payload = { IpAddress: ipAddress };
      response = await scanModel.create(payload);
    }
    return response;
  }
}
/*async function createscan(qrId, ip, count) {
  try {
    const qr = await qr.findById(qrId);
    if (!qr) {
      console.log("QR code not found.");
      return;
    }
    const scaninfo = new ScanInfo({
      qrId: qrId,
      ip: ip,
      count: count,
    });
    const result = await scaninfo.save();
    console.log(result);
  } catch (error) {
    console.error("Error creating ScanInfo:", error);
  }
}
*/
module.exports = new Scan();
