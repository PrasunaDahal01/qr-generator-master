const router = require("express").Router();

const userController = require("./user.controller");
const auth = require("../auth/auth.controller");
const jwt = require("jsonwebtoken");

router.post("/registers", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const registerResult = await userController.registerUser(email, password);
    if (registerResult.token) {
      res.cookie("jwt", registerResult.token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
    }
    res.json({ message: registerResult.message });
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
    res.json({ loginResult });
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

module.exports = router;
