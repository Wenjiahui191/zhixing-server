const User = require("../db/modal/user");
// const { encrypt } = require("../utils/crypet");

const login = async (username, password) => {
  username = escape(username);

  //   password = encrypt(password);
  password = escape(password);
  const result = await User.findOne({ username, password });
  return result;
};

const register = async (username, password, nickname) => {
  const result = await User.create({ username, password, nickname });
  return result;
};

// // 获取当前用户的信息
const getUserInfo = async (username) => {
  const result = await User.findOne({ username }, { username: 1, nickname: 1 });
  return result;
};

module.exports = {
  login,
  register,
  getUserInfo,
};
