const router = require("koa-router")();

const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");

// 获取列表
router.get("/list", async function (ctx, next) {
  const { author, keyword } = ctx.query;
  if (ctx.query.isAdmin) {
    if (!ctx.session.username) {
      console.log("not be asscess,need login");
      ctx.body = new ErrorModel("请登录");
    }
    author = ctx.session.username;
  }
  const data = await getList(author, keyword);
  ctx.body = new SuccessModel(data);
});

// 获取详情
router.get("/detail", async function (ctx, next) {
  const data = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(data);
});

// 创建博客
router.post("/new", loginCheck, async function (ctx, next) {
  ctx.request.body.author = ctx.session.username;
  const data = await createBlog(ctx.request.body);
  if (data) {
    ctx.body = new SuccessModel(data);
  } else {
    cxt.body = new ErrorModel("新建失败");
  }
});

// 更新博客
router.post("/update", loginCheck, async function (ctx, next) {
  const val = await updateBlog(ctx.query.id, ctx.request.body);
  if (val) {
    ctx.body = new SuccessModel("更新成功");
    return;
  }
  ctx.body = new ErrorModel("更新问卷失败");
});

// 删除
router.post("/del", loginCheck, async function (ctx, next) {
  const author = ctx.session.username;
  const result = delBlog(ctx.query.id, author);
  const val = await result;
  if (val) {
    ctx.body = new SuccessModel("删除成功");
    return;
  }
  ctx.body = new ErrorModel("删除问卷失败");
});

module.exports = router;
