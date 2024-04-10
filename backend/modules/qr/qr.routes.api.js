const router = require("express").Router();
const {
  generateQr,
  generateUserQr,
  generateLocationQr,
} = require("./qr.controller");
const { auth } = require("../middlewares/authorization");
const upload = require("../../services/multer/multer.service");

router.post("/", async (req, res, next) => {
  try {
    const qrTextValue = req.body.name;
    const qr = await generateQr(qrTextValue);

    res.json({ qr });
  } catch (err) {
    next(err);
  }
});

router.post("/userDetails", async (req, res, next) => {
  try {
    const { name, contact, profession, email } = req.body;

    if (!name || !contact || !profession || !email) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    // Concatenate fields with newlines
    const qrText = `${name}\n${contact}\n${profession}\n${email}`;
    const qr = await generateUserQr(qrText);
    res.json({ qr });
  } catch (err) {
    next(err);
  }
});

router.post("/location", async (req, res, next) => {
  try {
    const location = req.body.location;
    const qrData = `https://maps.google.com/maps?q=${encodeURIComponent(
      location
    )}`;

    const qr = await generateLocationQr(qrData);
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
