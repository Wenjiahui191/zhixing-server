const router = require("koa-router")();
const { answer } = require('../controller/answer');
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/answer");

router.post("/", async function (ctx, next) {
    try {
        const body = ctx.request.body;
        const { questionId, answerList } = JSON.parse(body)
        const result = await answer(questionId, answerList)

        if (result.matchedCount) {
            ctx.body = new SuccessModel("提交答卷成功")
            return
        }
        ctx.body = new ErrorModel("提交失败");
    } catch (error) {
        ctx.body = new ErrorModel("参数不正确");
    }
});


module.exports = router;
