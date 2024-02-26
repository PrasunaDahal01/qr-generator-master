const router = require("express").Router();
const ScanController = require("./scan.controller");

router.get("/", async (req, res, next) => {
  try {
    res.send("Hello!! Its working");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
