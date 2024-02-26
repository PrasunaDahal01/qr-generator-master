const router = require("express").Router();

router.get("/:name", async (req, res, next) => {
  try {
    res.json(`${req.params.name} Scanned Successfully`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
