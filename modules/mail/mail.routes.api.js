const router = require("express").Router();
const MailController = require("./mail.controller");

router.post("/", async (req, res, next) => {
  try {
    const email = await req.body;
    const info = await MailController.sendMail(email);

    console.log("Email sent:", info.messageId);

    res.status(200).json({ message: "QR code sent successfully," });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error sending QR code." });
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
