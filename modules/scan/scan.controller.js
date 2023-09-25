const path = require("path");
const model = require("../qr/qr.model");

class Scan {
  async scanQR(ip, code) {
    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    const existingIp = await model.ScanInfo.findOne({ ip: ipAddress });
    if (existingIp) {
      //if the IP address exists, increment the count
      count += 1;
      await existingIp.save();
    } else {
      const newIp = new IpAddress({ ip: ipAddress });
      await newIp.save();
    }
    //console.log("{ip, code}", { ip, code });
  }
}
module.exports = new Scan();
