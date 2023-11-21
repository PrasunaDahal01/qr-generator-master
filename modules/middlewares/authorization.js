const jwt = require("jsonwebtoken");
const userModel = require("../user/user.model");

const auth = (role = "user") => {
  return async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No Token Provided." });
    }
    try {
      const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);

      const user = await userModel.findOne({ _id: verifiedUser.id });
      if (!user) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      const isValidRole =
        verifiedUser.role === "admin" || verifiedUser.role == role;

      if (!isValidRole) {
        return res.status(401).json({ message: "No user found" });
      }

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = { auth };
