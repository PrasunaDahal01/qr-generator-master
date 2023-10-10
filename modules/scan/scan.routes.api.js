const router = require("express").Router();
const ScanController = require("./scan.controller");

router.get("/", async (req, res, next) => {
  try {
    res.send("Hello!! Its working");
  } catch (err) {
    next(err);
  }
});

/*
router.get("/:uuid", async (req, res, next) => {
  try {
    console.log("scan route called");
    const uuid = req.params.uuid;
    const result = await ScanController.handleScan(uuid);

    if (!result.url && !result.text) {
      return res.status(404).send(result.message);
    }
    if (result.url) {
      // If it's a URL, perform a redirect
      return res.redirect(result.url);
    } else {
      // If it's text, send it as a response
      return res.send(result.text);
    }
  } catch (err) {
    next(err);
  }
});
*/
module.exports = router;
