const router = require("express").Router();

const userController = require("./user.controller");

router.post("/registers", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const message = await userController.registerUser(email, password);
    res.json({ message });
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
      res.cookie("access_token", loginResult.token, {
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
