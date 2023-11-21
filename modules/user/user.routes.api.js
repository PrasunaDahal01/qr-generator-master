const userModel = require("./user.model");
const router = require("express").Router();
const userController = require("./user.controller");
const otpController = require("../otp/otp.controller");
const { auth } = require("../middlewares/authorization");
const upload = require("../../services/multer/multer.service");

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

router.post("/registers", upload.single("image"), async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const otp = req.body.otp;
  const role = "admin";
  const image = req.file.filename;

  try {
    const otpVerification = await otpController.verifyadminOTP(email, otp);
    if (!otpVerification || !otpVerification.success)
      throw new Error("Invalid OTP");

    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const registerResult = await userController.register(
      email,
      password,
      role,
      image
    );

    return res.json({
      success: registerResult.success,
      message: registerResult.message,
      showOTPInput: false,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/qrs", auth(), async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

router.get("/me", auth(), async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

router.get("/update", auth(), async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
});

router.get("/edit", auth("admin"), async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
});

router.put("/edit/:id", upload.single("image"), async (req, res, next) => {
  try {
    const email = req.body.email;
    const user_id = req.params.id;
    const image = req.file ? req.file.filename : undefined;
    console.log("image", image);
    const updateResult = await userController.updateProfile(
      email,
      user_id,
      image
    );

    res.json({
      success: updateResult.success,
      message: updateResult.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/users", auth("admin"), async (req, res, next) => {
  try {
    const userData = await userModel.find({ role: "user", archived: false });

    res.status(200).json({ user: userData });
  } catch (err) {
    next(err);
  }
});

router.post("/add", upload.single("image"), async (req, res, next) => {
  try {
    const email = req.body.email;
    const image = req.file.filename;
    const addUser = await userController.addNewUser(email, image);

    res.json({
      success: addUser.success,
      message: addUser.message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/editUser/:id", upload.single("image"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const verify = req.body.verify;
    const role = req.body.role;
    const image = req.file.filename;

    const editResult = await userController.editUser(
      id,
      email,
      verify,
      role,
      image
    );

    res.json(editResult);
  } catch (err) {
    next(err);
  }
});

router.delete("/archive/:id", async (req, res, next) => {
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
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

module.exports = router;
