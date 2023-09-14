const router = require("express").Router();

const qrRouter = require("../modules/qr/qr.routes.api");
const mailRouter = require("../utilitis/mail.routes.api");
const userRouter = require("../model/users.routes.api");
router.use("/qr", qrRouter);
router.use("/mail", mailRouter);
router.use("/scan", userRouter);
module.exports = router;
