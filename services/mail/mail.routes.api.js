const router = require("express").Router();
const MailController = require("./mail.controller");

router.post("/", async (req, res, next) => {
  try {
    const email = await req.body;
    const info = await MailController.sendMail(email);
    res.status(200).json({ message: "QR code sent successfully," });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send("Hello");
  } catch (err) {}
});
module.exports = router;
