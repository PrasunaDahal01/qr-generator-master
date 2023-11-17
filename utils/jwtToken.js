const jwt = require("jsonwebtoken");

//generate a token for user and send it.
const generateAccessToken = (userId, userRole) => {
  return jwt.sign(
    {
      id: userId,
      role: userRole,
    },
    process.env.SECRET_KEY, //process.env.jwtsecret
    {
      expiresIn: "20m",
    }
  );
};

const generateRefreshToken = (userId, userRole) => {
  return jwt.sign(
    {
      id: userId,
      role: userRole,
    },
    process.env.REFRESH_SECRET_KEY, //process.env.jwtsecret
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
