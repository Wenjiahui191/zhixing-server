const router = require("koa-router")();

const {
  getList,
  newQuestion,
  getDetail,
  update,
  deleteQuestion,
  copyQuestion,
} = require("../controller/question");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/question");

// 获取列表
router.get("/", async function (ctx, next) {
  const { keyword, page, pageSize, isDeleted, isStar } = ctx.query;
  const data = await getList({
    keyword,
    page,
    pageSize,
    isDeleted,
    isStar,
  });

  ctx.body = new SuccessModel(data);
});

// 创建一条
router.post("/", async function (ctx, next) {
  const question = await newQuestion();

  ctx.body = new SuccessModel({
    id: question._id,
  });
});

// 获取单条信息
router.get("/:questionId", async function (ctx, next) {
  const { questionId } = ctx.params;
  if (!questionId) {
    ctx.body = new ErrorModel("问卷id不能为空");
  }

  const question = await getDetail(questionId);
  if (question.title) {
    ctx.body = new SuccessModel(question);
    return;
  }
  ctx.body = new ErrorModel("获取问卷信息失败");
});

// 更新问卷信息
router.patch("/:questionId", async function (ctx, next) {
  const { questionId } = ctx.params;
  if (!questionId) {
    ctx.body = new ErrorModel("问卷id不能为空");
  }

  const result = await update(questionId, ctx.request.body);
  if (result.matchedCount) {
    ctx.body = new SuccessModel({ id: questionId });
    return;
  }
  ctx.body = new ErrorModel("更新问卷信息失败");
});

// 删除问卷信息
router.delete("/", async function (ctx, next) {
  const questionIds = ctx.request.body;
  console.log(ctx.request.body);
  if (!questionIds.lenght) {
    ctx.body = new ErrorModel("问卷id不能为空");
  }

  const result = [];
  for await (const id of questionIds) {
    const data = await deleteQuestion(id);
    result.push(data);
  }

  console.log(result);

  //   if (result.matchedCount) {
  //     ctx.body = new SuccessModel({ id: questionId });
  //     return;
  //   }
  //   ctx.body = new ErrorModel("删除问卷失败");
});

// 复制问卷信息
router.post("/duplication/:questionId", async function (ctx, next) {
  const { questionId } = ctx.params;
  if (!questionId) {
    ctx.body = new ErrorModel("问卷id不能为空");
  }

  const result = await copyQuestion(questionId);
  if (result.title) {
    ctx.body = new SuccessModel(result);
    return;
  }
  ctx.body = new ErrorModel("复制问卷失败");
});

module.exports = router;
