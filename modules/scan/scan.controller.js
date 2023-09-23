const path = require("path");

class Scan {
  async scanQR(ip, code) {
    // compare with code and ip if it exist, if it exist do not increase the count, if not increase it
    let count = 0;
    if (!count[ip]) {
      count = 1;
    } else {
      count[ip]++;
    }
    console.log("{ip,code}", { ip, code });
  }
}
module.exports = new Scan();
