const router = require("express").Router();
const userAuth = require("../auth/auth.controller");
const userModel = require("../user/user.model");

router.get("/registers", (req, res, next) => {
  res.render("userRegistration");
});

router.get("/login", (req, res, next) => {
  res.render("userLogin");
});

router.get("/forgetPassword", (req, res) => {
  res.render("forgetPassword");
});

module.exports = router;
