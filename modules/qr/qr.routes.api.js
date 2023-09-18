//routes for fetching data from controller
const router = require("express").Router();
const QrController = require("./qr.controller");

router.get("/:code/scan", async (req, res, next) => {
  const ip = req.socket.remoteAddress;
  const code = req.params.code;
  const qrScan = await QrController.scanQR(ip, code);
  res.send("Working");
});
/*
router.post("/:code/scan", async(req, res, next) =>{
  try{
    const scan = await
  }
})
*/
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
