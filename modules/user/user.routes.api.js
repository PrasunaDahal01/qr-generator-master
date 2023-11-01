const router = require("express").Router();
const userController = require("./user.controller");
const otpController = require("../otp/otp.controller");
const userAuth = require("../auth/auth.controller");
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

  try {
    const otpVerification = await otpController.verifyOTP(email, otp);
    if (otpVerification) {
      const registerResult = await userController.registerUser(
        email,
        password,
        otp
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

router.get("/registers", async (req, res, next) => {
  try {
    res.send("Hello");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  //get all data from frontend
  const { email, password } = req.body;
  try {
    const loginResult = await userController.loginUser(email, password);

    if (loginResult.message === "Login Successful") {
      //cookie
      res.cookie("jwt", loginResult.token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
    }
    res.json({
      success: loginResult.success,
      message: loginResult.message,
      token: loginResult.token,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    res.send("Hello");
  } catch (err) {
    next(err);
  }
});

router.post("/forgetPassword", async (req, res, next) => {
  const email = req.body.email;
  try {
    const forgetP = await userController.forgetPassword(email);
    res.json({
      success: forgetP.success,
      message: forgetP.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/forgetPassword", async (req, res, next) => {
  try {
    res.send("Hello");
  } catch (err) {
    next(err);
  }
});

router.get("/resetPassword", async (req, res, next) => {
  try {
    const token = req.query.token;
    const tokenData = await userModel.findOne({ token });
    if (tokenData) {
      res.render("resetPassword", { user_id: tokenData._id });
    } else {
      res.render("404", { message: "Token is invalid" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/resetPassword", async (req, res, next) => {
  try {
    const password = req.body.password;
    const user_id = req.body.user_id;
    const resetPass = await userController.resetPassword(password, user_id);
    if (resetPass) {
      res.redirect("/users/login");
    } else {
      res.json({
        success: false,
        message: "update failed.",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/profile", userAuth, async (req, res) => {
  res.render("userProfile", { user: req.user });
});

//update profile
router.get("/edit", userAuth, async (req, res, next) => {
  try {
    const id = req.query.id; ///to get data from url, we use query
    const userData = await userController.editProfile(id);
    if (userData) {
      res.render("updateProfile", { user: userData });
    } else {
      res.json({
        success: userData.success,
        message: userData.message,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/edit", async (req, res, next) => {
  try {
    const email = req.body.email;
    const user_id = req.body.user_id;
    const updateResult = await userController.updateProfile(email, user_id);
    res.json({
      success: updateResult.success,
      message: updateResult.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", userAuth, async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    console.log("logout successfully.");
    await req.user.save();
    res.redirect("/users/login");
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
