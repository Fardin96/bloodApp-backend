const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

const jwt_token = (userId) => {
  return jwt.sign({ user: userId }, process.env.JWT_PRIVATE_KEY);
};

module.exports = { passwordHash: passwordHash, jwt_token: jwt_token };
