const { default: mongoose } = require("mongoose");
const Question = require("../db/modal/question");
const dayjs = require("dayjs");

const getList = async (query) => {
  const { keyword = "", isDeleted, isStar, page = 1, pageSize = 10 } = query;
  let params = {};
  if (isStar !== undefined) {
    params["isStar"] = isStar;
  }
  if (isDeleted !== undefined) {
    params["isDeleted"] = isDeleted;
  }

  const list = await Question.find({
    title: { $regex: keyword },
    ...params,
  })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const total = await Question.count();

  return {
    total,
    list,
  };
};

const newQuestion = async () => {
  const result = await Question.create({
    title: "标题",
    desc: "问卷描述",
    isStar: false,
    isDeleted: false,
    isPublished: false,
    createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
  return result;
};

const getDetail = async (id) => {
  const result = Question.findOne({ _id: id });
  return result;
};

const update = async (id, body) => {
  const result = await Question.updateOne({ _id: id }, { ...body });
  return result;
};

const deleteQuestion = async (id) => {
  const result = await Question.deleteOne({ _id: id });
  return result;
};

const copyQuestion = async (id) => {
  let copyItem = await Question.findOne({ _id: id }).lean();
  delete copyItem._id;
  const result = await Question.create(copyItem);

  return result;
};

module.exports = {
  getList,
  newQuestion,
  getDetail,
  update,
  deleteQuestion,
  copyQuestion,
};
