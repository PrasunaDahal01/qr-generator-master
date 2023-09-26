const path = require("path");
const scanmodel = require("../scan/scan.model");

class Scan {
  async scanQR(IpAddress) {
    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    const existingIp = await scanmodel.ScanInfo.findOne({ ip: IpAddress });
    if (existingIp) {
      //if the IP address exists, increment the count
      existingIp.count += 1;
      await existingIp.save();
    } else {
      const newIp = new IpAddress({ ip: IpAddress });
      await newIp.save();
    }

    return {
      ip: IpAddress,
      count: count,
    };
  }
}
async function createscan(qrId, ip, count) {
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

module.exports = new Scan();
