const router = require("express").Router();
const userController = require("./user.controller");

router.post("/", userController.insertedData);
router.get("/", async (req, res, next) => {
  try {
    res.send("Hello");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
