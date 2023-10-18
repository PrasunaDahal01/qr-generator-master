const router = require("express").Router();
const userAuth = require("../auth/auth.controller");

router.get("/registers", (req, res, next) => {
  res.render("userRegistration");
});

router.get("/login", (req, res, next) => {
  res.render("userLogin");
});

router.get("/profile", userAuth, async (req, res) => {
  res.render("userProfile");
});
module.exports = router;
