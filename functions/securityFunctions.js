const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log("Error hashing password: ", passwordHash);
  }
};

const jwt_token = (userId) => {
  return jwt.sign({ user: userId }, process.env.JWT_PRIVATE_KEY);
};

module.exports = { passwordHash: passwordHash, jwt_token: jwt_token };
