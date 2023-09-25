//routes for fetching data from controller
const router = require("express").Router();

const QrController = require("./qr.controller");

router.post("/", async (req, res, next) => {
  const scanread = req.body.scanread;
  console.log("Received scanread:", scanread);
  res.json(scanread);
});

router.post("/", async (req, res, next) => {
  try {
    const qr = await QrController.generateQr(req.body);
    res.json({ qr });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send("Hello");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
