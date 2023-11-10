const router = require("express").Router();
router.get("/", (req, res, next) => {
  res.render("userLogin");
});

module.exports = router;
