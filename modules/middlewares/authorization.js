const userModel = require("../user/user.model");
const jwt = require("jsonwebtoken");

//authentication middleware to verify the jwt token.
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("No Token Provided");
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findOne({ _id: verifyUser.id });
    if (!user) {
      return res.status(401).send("Invalid Token");
    }
    const userRole = verifyUser.role;

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("No Token Provided");
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findOne({ _id: verifyUser.id });
    if (!user) {
      return res.status(401).send("Invalid Token");
    }
    const userRole = verifyUser.role;

    if (userRole !== "admin") {
      return res.status(403).send("Access Forbidden");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { userAuth, adminAuth };
