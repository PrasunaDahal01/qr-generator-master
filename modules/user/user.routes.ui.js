const router = require("express").Router();
const { auth } = require("../middlewares/authorization");
const userController = require("./user.controller");

router.get("/registers", (req, res, next) => {
  res.render("users/adminregisters");
});

router.get("/profile", auth(), async (req, res) => {
  res.render("auth/userProfile", { user: req.user });
});

//get edit Profile
router.get("/edit", async (req, res, next) => {
  try {
    const id = req.query.id; ///to get data from url, we use query
    const userData = await userController.editProfile(id);
    if (userData) {
      res.render("auth/updateProfile", { user: userData });
    } else {
      res.json({
        success: userData.success,
        message: userData.message,
      });
    }
  } catch (err) {
    next(err);
  }
});

//CRUD operations by admin - Create
router.get("/add", auth("admin"), async (req, res, next) => {
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
