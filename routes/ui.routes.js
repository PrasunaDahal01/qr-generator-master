const router = require("express").Router();

const qrRouting = require("../modules/qr/qr.routes.ui");
const mailRouting = require("../utilitis/mail.routes.ui");

router.use("/qr", qrRouting);
router.use("/mail", mailRouting);

module.exports = router;
