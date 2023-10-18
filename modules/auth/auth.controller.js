const userModel = require("../user/user.model"); //register
const jwt = require("jsonwebtoken");

//auth middleware
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);

    const user = await userModel.findOne({ _id: verifyUser._id });
    console.log(user);

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = userAuth;
