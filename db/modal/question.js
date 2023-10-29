const mongoose = require("../mongo");

const QuestionSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    js: String,
    css: String,
    isPublished: Boolean,
    componentList: Array,
    createAt: Date,
    isDeleted: Boolean,
    isStar: Boolean,
  },
  { versionKey: false }
);

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
