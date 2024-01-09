// getting-started.js
const mongoose = require("mongoose");
const { MONGODB_CONF } = require("../conf/db");

// const url = `mongodb://${MONGODB_CONF.host}:${MONGODB_CONF.port}/${MONGODB_CONF.database}`;
const {host,port,database,username,password}=MONGODB_CONF

const url=`mongodb://${username}:${password}@${host}:${port}/${database}`
console.log("连接数据库："+url)
async function main() {
  await mongoose.connect(url);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => console.error(err));

module.exports = mongoose;
