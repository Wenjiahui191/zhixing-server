const env = process.env.NODE_ENV;

let MONGODB_CONF = {};
let REDIS_CONF = {};

if (env === "dev") {
  // mongo
  MONGODB_CONF = {
    host: "121.37.243.163",
    port: 27017,
    database: "question",
    username:"question",
    password:"75wMiNLizkGwhMD5"
  };

  // redis
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}
if (env === "production") {
  // mongo
  MONGODB_CONF = {
    host: "127.0.0.1",
    port: 27017,
    database: "question",
    username:"question",
    password:"75wMiNLizkGwhMD5"
  };

  // redis
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MONGODB_CONF,
  REDIS_CONF,
};
