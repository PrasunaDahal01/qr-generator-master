const jwt = require("jsonwebtoken");
const jwtToken = require("../../utils/jwtToken");
const userModel = require("../user/user.model");

const regenerateAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send("Refresh token not provided");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    const newAccessToken = jwtToken.generateAccessToken(
      decoded.id,
      decoded.role
    );

    res.cookie("jwt", newAccessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;

    req.token = newAccessToken;

    next();
  } catch (error) {
    return res.status(401).send("Invalid refresh token");
  }
};
const regenerateAdminAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send("Refresh token not provided");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    const newAccessToken = jwtToken.generateAccessToken(
      decoded.id,
      decoded.role
    );

    res.cookie("jwt", newAccessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).send("User not found");
    }
    const userRole = decoded.role;

    if (userRole !== "admin") {
      return res.status(403).send("Access Forbidden");
    }

    req.user = user;

    req.token = newAccessToken;

    next();
  } catch (error) {
    return res.status(401).send("Invalid refresh token");
  }
};
module.exports = { regenerateAccessToken, regenerateAdminAccessToken };
