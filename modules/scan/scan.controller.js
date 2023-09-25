const path = require("path");
const scanmodel = require("../scan/scan.model");

class Scan {
  async scanQR(IpAddress) {
    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    const existingIp = await scanmodel.ScanInfo.findOne({ ip: IpAddress });
    if (existingIp) {
      //if the IP address exists, increment the count
      count += 1;
      await existingIp.save();
    } else {
      const newIp = new IpAddress({ ip: IpAddress });
      await newIp.save();
    }
  }
}
module.exports = new Scan();
