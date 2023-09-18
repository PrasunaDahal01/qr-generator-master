const router = require("express").Router();

const qrRouting = require("../modules/qr/qr.routes.ui");
const mailRouting = require("../modules/mail/mail.routes.ui");
const scanRouting = require("../modules/scan/scan.routes.ui");

router.use("/qr", qrRouting);
router.use("/mail", mailRouting);
router.use("/scan", scanRouting);

module.exports = router;
