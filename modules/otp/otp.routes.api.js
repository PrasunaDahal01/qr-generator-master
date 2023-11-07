const router = require("express").Router();
const otpController = require("./otp.controller");

router.post("/", async (req, res, next) => {
  const { email } = req.body;
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

router.post("/verify", async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const result = await otpController.verifyOTP(email, otp);
    res.json({
      success: result.success,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
