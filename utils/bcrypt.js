const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { encryptPassword };
