const router = require("koa-router")();

const { login, getUserInfo, register } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { generateToken } = require("../utils/token");

router.prefix("/api/user");

router.post("/login", async function (ctx, next) {
  const { username, password } = ctx.request.body;

  const user = await login(username, password);

  if (user?.username) {
    // 设置 session
    const token = generateToken(user);
    ctx.body = new SuccessModel({ token }, "登录成功");
    return;
  }
  ctx.body = new ErrorModel("登陆失败，用户名或密码不正确");
});

router.post("/register", async function (ctx, next) {
  const { username, password, nickname } = ctx.request.body;

  const user = await register(username, password, nickname);

  if (user?.username) {
    ctx.body = new SuccessModel("注册成功");
    return;
  }
  ctx.body = new ErrorModel("注册失败");
});

router.get("/info", async function (ctx, next) {
  const { username } = ctx.state.user;
  const user = await getUserInfo(username);

  ctx.body = new SuccessModel(user);
});

module.exports = router;
