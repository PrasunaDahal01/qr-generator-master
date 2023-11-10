const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    //get data from frontend
    const { email, password } = req.body;
    const userMessage = await userController.loginUser(email, password);
    res.json({ userMessage });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
