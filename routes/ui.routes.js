const router = require("express").Router();

const qrRouting = require("../modules/qr/qr.routes.ui");
const mailRouting = require("../modules/mail/mail.routes.ui");
const scanRouting = require("../modules/scan/scan.routes.ui");

router.use("/qrs", qrRouting);
router.use("/mails", mailRouting);
router.use("/scans", scanRouting);

router.get("/", (req, res) => {
  //res.render("homepage");
  res.redirect("/qrs");
});
module.exports = router;
