const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("auth/qrGenerator");
});

module.exports = router;
