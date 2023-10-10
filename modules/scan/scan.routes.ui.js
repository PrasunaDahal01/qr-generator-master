const router = require("express").Router();
const ip = require("ip");
const ScanController = require("./scan.controller");

router.get("/:url", async (req, res, next) => {
  try {
    const ipAddress = ip.address();
    const qrId = req.params.url;

    const Scan = await ScanController.scanQR(ipAddress, qrId);
    res.json(Scan); //sending the IP address in the response.
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
