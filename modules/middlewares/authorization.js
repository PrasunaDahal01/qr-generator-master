const userModel = require("../user/user.model");
const jwt = require("jsonwebtoken");

//authentication middleware to verify the jwt token.
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("token", token);

    if (!token) {
      return res.status(401).send("No Token Provided");
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("verifyUser", verifyUser);

    const user = await userModel.findOne({ _id: verifyUser.id });

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = userAuth;
