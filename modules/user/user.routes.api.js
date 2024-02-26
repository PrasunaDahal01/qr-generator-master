const router = require("express").Router();
const userController = require("./user.controller");
const otpController = require("../otp/otp.controller");
const { adminAuth } = require("../middlewares/authorization");
const userModel = require("./user.model");

router.post("/sendOtp", async (req, res, next) => {
  const email = req.body.email;
  try {
    const mailResult = await userController.sendOTP(email);
    res.json({
      success: mailResult.success,
      message: mailResult.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/registers", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const otp = req.body.otp;
  const role = "admin";

  try {
    const otpVerification = await otpController.verifyadminOTP(email, otp);
    if (otpVerification) {
      const registerResult = await userController.registerAdmin(
        email,
        password,
        otp,
        role
      );

      res.json({
        success: registerResult.success,
        message: registerResult.message,
        showOTPInput: false,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid OTP",
        showOTPInput: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const email = req.body.email;
    const user_id = req.params.id;
    const updateResult = await userController.updateProfile(email, user_id);
    res.json({
      success: updateResult.success,
      message: updateResult.message,
    });
  } catch (err) {
    next(err);
  }
});
//dashboard
router.get("/dashboard", adminAuth, async (req, res, next) => {
  try {
    const userData = await userModel.find({ role: "user" });
    if (userData) {
      res.render("users/adminDashboard", { user: userData });
    } else {
      res.status(401).send("No user found");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const email = req.body.email;
    const addUser = await userController.addNewUser(email);
    res.json({
      success: addUser.success,
      message: addUser.message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/editUser/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const verify = req.body.verify;
    const editResult = await userController.editUser(id, email, verify);
    res.json(editResult);
  } catch (err) {
    next(err);
  }
});

router.get("/archive/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userController.archiveUser(id);
    res.json({ result });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await userController.getUser(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

module.exports = router;
