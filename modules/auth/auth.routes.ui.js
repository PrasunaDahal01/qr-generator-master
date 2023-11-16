const router = require("express").Router();
const { auth } = require("../middlewares/authorization");

router.get("/registers", (req, res, next) => {
  res.render("auth/userRegistration");
});

router.get("/login", (req, res, next) => {
  res.render("auth/userLogin");
});

router.get("/forgetPassword", (req, res) => {
  res.render("auth/forgetPassword");
});

router.get("/changePassword", auth(), async (req, res) => {
  res.render("auth/changePassword", { user: req.user });
});
module.exports = router;