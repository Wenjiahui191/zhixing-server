const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const Koa = require("koa");
const app = new Koa();
// const views = require('koa-views')
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const fs = require("fs");
const path = require("path");
const morgan = require("koa-morgan");

const blog = require("./routes/blog");
const user = require("./routes/user");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  app.use(morgan("dev"));
} else {
  const fileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(fileName, {
    flags: "a",
  });
  // 线上
  app.use(
    morgan("combined", {
      stream: writeStream,
    })
  );
}

// session
const redisClient = require("./db/redis");
const { REDIS_CONF } = require("./conf/db");
app.keys = ["@ADjec_187#9_"];
app.use(
  session({
    store: redisStore({
      // Options specified here
      // client: redisClient,
      all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    }),
  })
);

// routes
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
