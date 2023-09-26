//routes for fetching data from controller
const router = require("express").Router();
const QrCode = require("./qr.model");

const QrController = require("./qr.controller");

router.post("/", async (req, res, next) => {
  try {
    const qr = await QrController.generateQr(req.body);
    res.json({ qr });

    const qrTextValue = req.body.name;

    console.log("qrtext:", qrTextValue);
    const qrText = new QrCode({ qrtext: qrTextValue });
    await qrText.save();
    //res.status(200).json(qrText);
    //res.json(qr, qrText);
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
