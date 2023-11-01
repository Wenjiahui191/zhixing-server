const Question = require("../db/modal/question");

const getStatList = async ({ questionId, page, pageSize }) => {
    const result = await Question.findOne(
        { _id: questionId },
        { answers: 1, answerCount: 1 }
    )
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    const { answers = [], answerCount = 0 } = result;

    const list = answers.map((a) => {
        const { _id, answerList } = a
        let answerValues = {}
        answerList.forEach(i => {
            answerValues[i.componentId] = i.value
        });
        return {
            _id,
            ...answerValues
        }
    })

    return {
        total: answerCount,
        list,
    };
};

const getComponentStat = async (questionId, componentId) => {
    const result = await Question.findOne({ _id: questionId }, { componentList: 1, answers: 1 }).lean()

    const { componentList = [], answers = [] } = result;
    const answerList = answers.reduce((pre, cur) => {
        const { answerList: ans = [] } = cur
        return [...pre, ...ans]
    }, [])
    const currentComp = componentList.find(c => c.fe_id === componentId)
    let optionCount = []
    let optList = []
    if (currentComp) {
        const { props, type } = currentComp
        if (type === 'questionRadio') {
            const { optionList = [] } = props
            optList = optionList
        } else if (type === 'questionCheckbox') {
            const { list } = props
            optList = list
        }

        for (let i = 0; i < optList.length; i++) {
            const opt = optList[i];
            for (let j = 0; j < answerList.length; j++) {
                const answer = answerList[j];
                if (opt.value.indexOf(answer.value) > -1) {
                    let index = optionCount.findIndex(o => o.name&&o.name === opt.text)
                    //如何选项统计中有
                    if (index >= 0) {
                        optionCount[index]['name'] = optionCount[index]['count'] + 1
                    } else {
                        optionCount.push({
                            'name':opt.text,
                            'count':1
                        })
                    }
                }
            }
        }

        return {
            stat:optionCount
        }
    }
    return
}

module.exports = {
    getStatList,
    getComponentStat,
};
