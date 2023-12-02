const router = require("express").Router();
const reportController = require("./report.controller");

router.get("/qrs", async (req, res) => {
  try {
    const qrCodes = await reportController.getQrCodes();

    res.json(qrCodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/qrs/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const qrDetails = await reportController.getQrDetails(uuid);

    res.json(qrDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
