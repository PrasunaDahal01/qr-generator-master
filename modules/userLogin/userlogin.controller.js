const userModel = require("../userRegisters/user.model");
const jwt = require("jsonwebtoken");

const loginUser = async (email, password) => {
  try {
    if (!(email && password)) {
      res.status(400).send("Fields cannot be empty.");
    }

    //finding user in db
    const user = await userModel.findOne({ email });

    //matching the password
    if (user && (await bcrypt.compare(password, user.password))) {
      jwt.sign(
        {
          id: user._id,
        },
        "shhh",
        {
          expiresIn: "2h",
        }
      );
      user.access_token = token;
    }
  } catch (error) {
    console.log(error.message);
  }
};
