const router = require("express").Router();
const ip = require("ip");
const ScanController = require("./scan.controller");
const qrModel = require("../qr/qr.model");

router.get("/test", async (req, res, next) => {
  try {
    res.json("successful");
  } catch (err) {
    next(err);
  }
});

router.get("/:uuid", async (req, res, next) => {
  try {
    const ipAddress = ip.address();
    const qrId = req.params.uuid;

    const Scan = await ScanController.scanQR(ipAddress, qrId);
    res.redirect(Scan.qrDocument.qrtext);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
