const jwt = require("jsonwebtoken");
const userModel = require("../user/user.model");

const auth = (role = "user") => {
  return async (req, res, next) => {
    console.log({ as: req.headers });
    const token = req.headers.authorization.split(" ")[1];
    console.log({ token });
    if (!token) res.status(401).send("No Token Provided.");

    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("VerifiedUser", verifiedUser);
    const user = await userModel.findOne({ _id: verifiedUser.id });
    if (!user) res.status(401).send("Invalid Token");

    const isValidRole =
      verifiedUser.role === "admin" || verifiedUser.role == role;

    if (!isValidRole) {
      throw res.status(403).send("No user found");
    }

    req.token = token;
    req.user = user;
    next();
  };
};

module.exports = { auth };
