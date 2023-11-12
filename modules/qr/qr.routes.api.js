const router = require("express").Router();
const QrController = require("./qr.controller");

router.post("/", async (req, res, next) => {
  try {
    const qrTextValue = req.body.name;
    const qr = await QrController.generateQr(qrTextValue);
    res.json({ qr });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
