const router = require("express").Router();
const ScanController = require("./scan.controller");

const Scanmodel = require("../qr/qr.model");

router.post("/", async (req, res, next) => {
  try {
    const ip = req.socket.remoteAddress;
    const code = req.params.code;
    //const qrScan = await ScanController.scanQR(ip, code);
    const scanners = await Scanmodel.find();
    res.json(scanners);
    res.status(200).json({
      message: "IP address saved successfully",
    });
    res.send("Working");
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
