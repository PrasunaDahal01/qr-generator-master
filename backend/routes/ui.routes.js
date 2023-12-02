const router = require("express").Router();

const qrRouting = require("../modules/qr/qr.routes.ui");
const mailRouting = require("../services/mail/mail.routes.ui");
const scanRouting = require("../modules/scan/scan.routes.ui");
const testRouting = require("../modules/test/test.routes.ui");
const authRouting = require("../modules/auth/auth.routes.ui");
const userRouting = require("../modules/user/user.routes.ui");

router.use("/qrs", qrRouting);
router.use("/mails", mailRouting);
router.use("/scans", scanRouting);
router.use("/tests", testRouting);
router.use("/auth", authRouting);
router.use("/users", userRouting);

router.get("/", (req, res) => {
  res.redirect("/auth/login");
});
module.exports = router;