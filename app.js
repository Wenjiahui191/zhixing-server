// const session = require("koa-generic-session");
// const redisStore = require("koa-redis");
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
const jwt = require("koa-jwt");

const user = require("./routes/user");
const question = require("./routes/question");
const answer = require('./routes/answer');
const stat = require('./routes/stat');

const { ErrorModel } = require("./model/resModel");

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

app.use(async (ctx,next) => {
  const ipAddress = ctx.req.connection.remoteAddress;
  console.log(ipAddress)
  await next();
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
// 自定义401
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 200;
      ctx.body = new ErrorModel("未认证");
    } else {
      throw err;
    }
  });
});

// Token 验证中间件
// 配置JWT中间件
app.use(
  jwt({ secret: "my-secret" }).unless({
    path: [/\/login/, /\/register/], custom: (ctx) => {
      console.log(ctx.path)
      if (ctx.path.match(/^\/api\/question\/[a-zA-Z0-9]+$/) && ctx.method === 'GET') return true
      if (ctx.path.match(/^\/question\/[a-zA-Z0-9]+$/) && ctx.method === 'GET') return true
      if (ctx.path.match(/^\/api\/answer/) && ctx.method === 'POST') return true
      return false
    }
  })
);

// routes
app.use(user.routes(), user.allowedMethods());
app.use(question.routes(), question.allowedMethods());
app.use(answer.routes(), answer.allowedMethods());
app.use(stat.routes(), stat.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err);
});

module.exports = app;
