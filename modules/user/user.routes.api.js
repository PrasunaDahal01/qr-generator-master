const router = require("express").Router();
const userController = require("./user.controller");

router.get('/users')

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await userController.getUser(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

module.exports = router;
