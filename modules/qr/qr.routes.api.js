const router = require("express").Router();
const QrController = require("./qr.controller");
const { auth } = require("../middlewares/authorization");

router.post("/", async (req, res, next) => {
  try {
    const qrTextValue = req.body.name;
    const qr = await QrController.generateQr(qrTextValue);

    res.json({ qr });
  } catch (err) {
    next(err);
  }
});

router.get("/", auth(), async (req, res, next) => {
  try {
    res.redirect("/qrs", { user: req.user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
