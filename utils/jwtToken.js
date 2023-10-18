const jwt = require("jsonwebtoken");
//generate a token for user and send it.
const generateAccessToken = (userId, email) => {
  return jwt.sign(
    {
      id: userId,
      email,
    },
    process.env.SECRET_KEY, //process.env.jwtsecret
    {
      expiresIn: "2h",
    }
  );
};

module.exports = {
  generateAccessToken,
};
