const router = require("express").Router();
const ScanController = require("./scan.controller");

router.post("/", async (req, res, next) => {
  try {
    const ipAddress = req.socket.remoteAddress;
    const Scan = await ScanController.scanQR(ipAddress);
    res.json(Scan); //sending the IP address in the response.
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
