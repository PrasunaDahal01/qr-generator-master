const router = require("express").Router();
const otpController = require("./otp.controller");

router.post("/generate", async (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  try {
    const result = await otpController.sendOtp(email);
    res.json({
      success: result.success,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
