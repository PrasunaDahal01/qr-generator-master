const router = require("express").Router();

router.get("/registers", (req, res, next) => {
  res.render("userRegistration");
});

router.get("/login", (req, res, next) => {
  res.render("userLogin");
});

module.exports = router;
