const router = require("express").Router();
const QRScanInfo = require("./scan.model");

const ScanController = require("./scan.controller");

router.post("/", async (req, res, next) => {
  try {
    const ipAddress = req.socket.remoteAddress;
    const Scan = await ScanController.scanQR(ipAddress);

    //saving the ip address to mongodb
    const ip = new QRScanInfo({
      IpAddress: ipAddress,
    });
    await ip.save();

    res.json({ Scan, ipAddress }); //sending the IP address in the response.
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send("Hello!! Its working");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
