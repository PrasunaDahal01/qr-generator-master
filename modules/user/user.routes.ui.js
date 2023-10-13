const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("userRegistration");
});

module.exports = router;
