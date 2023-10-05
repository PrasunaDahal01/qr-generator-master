const router = require("express").Router();

const qrRouter = require("../modules/qr/qr.routes.api");
const mailRouter = require("../modules/mail/mail.routes.api");
const scanRouter = require("../modules/scan/scan.routes.api");
const reportRouter = require("../modules/reports/report.routes.api");

router.use("/qr", qrRouter);
router.use("/mail", mailRouter);
router.use("/scan", scanRouter);
router.use("/report", reportRouter);
module.exports = router;
