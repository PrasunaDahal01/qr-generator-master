const router = require("express").Router();

router.get("/registers", (req, res, next) => {
  res.render("auth/userRegistration");
});

router.get("/login", (req, res, next) => {
  res.render("auth/userLogin");
});

router.get("/forgetPassword", (req, res) => {
  res.render("auth/forgetPassword");
});

router.get("/changePassword", async (req, res) => {
  res.render("auth/changePassword");
});
module.exports = router;
