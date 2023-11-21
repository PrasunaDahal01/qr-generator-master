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
    console.log(loginResult);
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

    res.json({ token: result });
  } catch (err) {
    console.error("Token regeneration error:", err);
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

router.get("/resetPassword", async (req, res, next) => {
  try {
    const token = req.query.token;
    const result = await authController.resetPass(token);
    if (result) {
      res.render("auth/resetPassword", { user_id: result._id });
    } else {
      res.render("auth/404", { message: "Token is invalid" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/resetPassword", async (req, res, next) => {
  try {
    const password = req.body.password;
    const user_id = req.body.user_id;
    const resetPass = await authController.resetPassword(password, user_id);
    res.json({ success: true, resetPass });
  } catch (err) {
    next(err);
  }
});

router.get("/change", auth(), async (req, res, next) => {
  try {
    console.log("user:", req.user);
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
});

router.put("/changePassword", async (req, res, next) => {
  try {
    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const user_id = req.body.user_id;
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
