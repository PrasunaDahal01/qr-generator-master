const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("qrGenerator");
});
module.exports = router;
