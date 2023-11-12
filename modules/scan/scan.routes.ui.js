const ip = require("ip");
const router = require("express").Router();
const ScanController = require("./scan.controller");

router.get("/:uuid", async (req, res, next) => {
  try {
    const ipAddress = ip.address();
    const qrId = req.params.uuid;

    const Scan = await ScanController.scanQR(ipAddress, qrId);
    res.redirect(Scan.qrDocument.qrText);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
