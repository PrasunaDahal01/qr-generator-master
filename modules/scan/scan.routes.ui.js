const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("scan");
});

module.exports = router;
