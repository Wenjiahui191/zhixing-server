const router = require("koa-router")();
const { getStatList, getComponentStat } = require("../controller/stat");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/stat");

router.get("/:questionId", async function (ctx, next) {
    const { page = 1, pageSize = 10 } = ctx.query;
    const { questionId } = ctx.params;
    const result = await getStatList({ questionId, page, pageSize })

    if (result) {
        ctx.body = new SuccessModel(result);
        return;
    }
    ctx.body = new SuccessModel([]);
});

router.get("/:questionId/:componentId", async function (ctx, next) {
    const { questionId, componentId } = ctx.params;
    const result = await getComponentStat(questionId, componentId)

    if (result) {
        ctx.body = new SuccessModel(result);
        return;
    }
    ctx.body = new SuccessModel([]);
});

module.exports = router;
