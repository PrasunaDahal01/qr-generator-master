const router = require("express").Router();

const qrRouter = require("../modules/qr/qr.routes.api");
const mailRouter = require("../services/mail/mail.routes.api");
const scanRouter = require("../modules/scan/scan.routes.api");
const reportRouter = require("../modules/reports/report.routes.api");
const userRouter = require("../modules/user/user.routes.api");

router.use("/qrs", qrRouter);
router.use("/mails", mailRouter);
router.use("/scans", scanRouter);
router.use("/reports", reportRouter);
router.use("/registers", userRouter);
module.exports = router;
