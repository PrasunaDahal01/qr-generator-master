const authModel = require("../auth/auth.model");

//getting the user by Id.
const getUser = async (userId) => {
  try {
    const user = await authModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getUser,
};
