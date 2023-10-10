/*
router.post("/", async (req, res, next) => {
  try {
    const ipAddress = req.socket.remoteAddress;
    const qrId = req.body.qrtext;

    const Scan = await ScanController.scanQR(ipAddress, qrId);
    res.json(Scan); //sending the IP address in the response.
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/
const router = require("express").Router();
const ScanController = require("./scan.controller");

router.get("/", async (req, res, next) => {
  try {
    res.send("Hello!! Its working");
  } catch (error) {
    next(error);
  }
});
router.get("/:uuid", async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const result = await ScanController.handleScan(uuid);

    if (!result.url && !result.text) {
      return res.status(404).send(result.message);
    }
    if (result.url) {
      // If it's a URL, perform a redirect
      return res.redirect(result.url);
    } else {
      // If it's text, send it as a response
      return res.send(result.text);
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
