const { exec, escape } = require("../db/mysql");
const { encrypt } = require("../utils/crypet");

const login = (username, password) => {
  username = escape(username);

  password = encrypt(password);
  password = escape(password);
  const sql = `select * from users where username=${username} and password=${password}`;
  return exec(sql).then((selectData) => {
    console.log(sql);
    return selectData[0] || {};
  });
};

// 获取当前用户的信息
const getUserInfo = (username) => {
  const sql = `select * from component`;
  return exec(sql).then((userData) => {
    let componentList = userData;
    let arr = [];
    arr = componentList.map((i) => {
      return new Promise((resolve) => {
        const { id } = i;
        exec(`select * from component_props where c_id = ${id}`).then(
          (props) => {
            resolve(props[0]);
          }
        );
      });
    });
    return Promise.all(arr).then((data) => {
      componentList.forEach((a) => {
        const index = data.findIndex((i) => a.id === i.c_id);
        if (index >= 0) {
          a.props = data[index];
          delete a.props.c_id;
        }
      });
      return componentList;
    });
    // return componentList;
  });
};

module.exports = {
  login,
  getUserInfo,
};
