const bcrypt = require("bcrypt");

const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

module.exports = { passwordHash: passwordHash };
