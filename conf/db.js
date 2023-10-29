const env = process.env.NODE_ENV;

let MONGODB_CONF = {};
let REDIS_CONF = {};

if (env === "dev") {
  // mongo
  MONGODB_CONF = {
    host: "116.205.226.220",
    port: 27107,
    database: "question",
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
    host: "116.205.226.220",
    port: 3306,
  };

  // redis
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
    password: "123456",
  };
}

module.exports = {
  MONGODB_CONF,
  REDIS_CONF,
};
