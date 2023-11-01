const mongoose = require("../mongo");

const AnswerSchema = new mongoose.Schema(
  {
      userId: String,
      answerList: [
          { componentId: String, value: String }
      ]
  },
  { versionKey: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    js: String,
    css: String,
    isPublished: Boolean,
    componentList: Array,
    answerCount:Number,
    answers:[{type:AnswerSchema}],
    createAt: String,
    isDeleted: Boolean,
    isStar: Boolean,
  },
  { versionKey: false }
);

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
