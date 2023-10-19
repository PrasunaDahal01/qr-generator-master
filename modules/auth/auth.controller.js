const userModel = require("../user/user.model");
const jwt = require("jsonwebtoken");

//auth middleware
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findOne({ _id: verifyUser.id });
    console.log(user);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = userAuth;
