//routes for ui // displaying html
const router = require("express").Router();
const { auth } = require("../middlewares/authorization");

router.get("/", auth(), (req, res, next) => {
  res.render("auth/qrGenerator", { user: req.user });
});

module.exports = router;
