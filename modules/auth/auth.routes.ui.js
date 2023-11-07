const router = require("express").Router();

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