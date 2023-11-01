const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    username: user.username,
    nickname: user.nickname,
  };

  const token = jwt.sign(payload, "my-secret", { expiresIn: "24h" });

  return token;
}

module.exports = {
  generateToken,
};
