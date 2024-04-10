const router = require("express").Router();
const authController = require("./auth.controller");
const otpController = require("../otp/otp.controller");
const { auth } = require("../middlewares/authorization");
const upload = require("../../services/multer/multer.service");

router.post("/sendOtp", async (req, res, next) => {
  const email = req.body.email;
  try {
    const mailResult = await authController.sendOTP(email);
    res.json({
      success: mailResult.success,
      message: mailResult.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/registers", upload.single("image"), async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const otp = req.body.otp;
  const image = req.file.filename;

  try {
    const otpVerification = await otpController.verifyOTP(email, otp);
    if (!otpVerification || !otpVerification.success)
      throw new Error("Invalid OTP");
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    const registerResult = await authController.register(
      email,
      password,
      image
    );
    res.json({
      success: registerResult.success,
      message: registerResult.message,
      showOTPInput: false,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loginResult = await authController.login(email, password);

    res.status(200).json({
      success: loginResult.success,
      message: loginResult.message,
      token: loginResult.token,
      refreshToken: loginResult.refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/regenerate", async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  try {
    const result = await authController.regenerateToken(refreshToken);

    res.status(200).json({ token: result });
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
});

router.post("/forgetPassword", async (req, res, next) => {
  const email = req.body.email;
  console.log("email", email);
  try {
    const forgetP = await authController.forgetPassword(email);

    res.json({
      success: forgetP.success,
      message: forgetP.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/resetPassword/:id/:token", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const token = req.params.token;
    const password = req.body.password;

    const resetPass = await authController.resetPassword(
      password,
      userId,
      token
    );
    res.json({ success: true, resetPass });
  } catch (err) {
    next(err);
  }
});

router.get("/change", auth(), async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
});

router.put("/changePassword/:id", async (req, res, next) => {
  try {
    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const user_id = req.params.id;

    const changeResult = await authController.changePassword(
      password,
      newpassword,
      user_id
    );

    res.status(200).json({
      success: changeResult.success,
      message: changeResult.message,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
