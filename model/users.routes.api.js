const router = require("express").Router();
const QrCode = require("./qr.model");

module.exports = router;
/* const router = require("express").Router();
const User = require("./user");

router.get("/", async (req, res) => {
  const IP =
    request.headers["x-real-ip"] ||
    request.headers["x-forwarded-for"] ||
    request.socket.remoteAddress ||
    "";

  return response.json({
    IP,
  });
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    size: req.body.size,
    email: req.body.email,
  });
  try {
    const a1 = await user.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});
module.exports = router;
*/
