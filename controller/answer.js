const Question = require("../db/modal/question");

const answer = async (questionId, answerInfo) => {
    const result = await Question.findOne({ _id: questionId }, { answers: 1 })
    const { answers=[] } = result
    answers.push({ answerList: answerInfo })
    const updateStatus = await Question.updateOne({ _id: questionId }, { answers, answerCount: answers.length })
    return updateStatus
}

module.exports = {
    answer
};
