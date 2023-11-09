const userModel = require("../user/user.model");
const jwt = require("jsonwebtoken");
const {
  regenerateAccessToken,
  regenerateAdminAccessToken,
} = require("../auth/tokenRegeneration");

//authentication middleware to verify the jwt token.
const userAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("No Token Provided");
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return regenerateAccessToken(req, res, next);
        } else {
          return res.status(401).send("Invalid Token");
        }
      } else {
        // Token is valid;
        const user = await userModel.findOne({ _id: decoded.id });

        if (!user) {
          return res.status(401).send("User not found");
        }

        req.user = user;
        req.token = token;

        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
const adminAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("No Token Provided");
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          // Access token has expired, regenerate it using the refresh token
          return regenerateAdminAccessToken(req, res, next);
        } else {
          return res.status(401).send("Invalid Token");
        }
      } else {
        // Token is valid; fetch user and verify the user role
        const user = await userModel.findOne({ _id: decoded.id });

        if (!user) {
          return res.status(401).send("User not found");
        }
        const userRole = decoded.role;

        if (userRole !== "admin") {
          return res.status(403).send("Access Forbidden");
        }

        req.user = user;
        req.token = token;

        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { userAuth, adminAuth };
