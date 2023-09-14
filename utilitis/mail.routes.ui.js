const router = require("express").Router();
//const mailservice = require("../../utilitis/mail.service");

router.get("/", (req, res, next) => {
  res.render("qrGenerator");
});
module.exports = router;
