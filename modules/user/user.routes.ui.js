const router = require("express").Router();
const userController = require("./user.controller");
const { auth } = require("../middlewares/authorization");

router.get("/registers", (req, res, next) => {
  res.render("users/adminregisters");
});

router.get("/profile", async (req, res) => {
  res.render("auth/userProfile");
});

router.get("/edit", async (req, res, next) => {
  try {
    res.render("auth/updateProfile");
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard", async (req, res, next) => {
  try {
    res.render("users/adminDashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.render("users/addUsers");
  } catch (err) {
    next(err);
  }
});

router.get("/editUser", auth("admin"), async (req, res, next) => {
  try {
    const id = req.query.id;
    const data = await userController.getEditUser(id);
    if (data) {
      res.render("users/editUser", { user: data });
    } else {
      res.redirect("/api/v1/users/dashboard");
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
