//The router is going to be the bridge between app.js and the controllers.
const router = require("express").Router();

const uiRouter = require("./ui.routes");
const apiRouter = require("./api.routes");

router.use("/", uiRouter);
router.use("/api/v1", apiRouter);

module.exports = router;
