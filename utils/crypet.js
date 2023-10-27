const crypto = require("crypto");

const SECRET_KY = "ADF_ji78";

function md5(content) {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}
function encrypt(password) {
  const content = `password=${password}&key=${SECRET_KY}`;
  return md5(content);
}

module.exports = {
  encrypt,
};
