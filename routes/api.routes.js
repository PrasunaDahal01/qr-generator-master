const router = require("express").Router();

const qrRouter = require("../modules/qr/qr.routes.api");
const mailRouter = require("../modules/mail/mail.routes.api");
const scanRouter = require("../modules/scan/scan.routes.api");
const reportRouter = require("../modules/reports/report.routes.api");

router.use("/qrs", qrRouter);
router.use("/mails", mailRouter);
router.use("/scans", scanRouter);
router.use("/reports", reportRouter);
module.exports = router;
