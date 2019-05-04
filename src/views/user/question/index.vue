<template>
    <div class="question">
        <el-menu :default-active="index" class="menu" mode="horizontal" @select="changeIndex">
            <el-menu-item index="1">我的提问</el-menu-item>
            <el-menu-item index="2">我的回答</el-menu-item>
        </el-menu>
        <div class="my_question" v-if="index === '1'">
            <el-timeline v-if="questions.length > 0">
                <el-timeline-item
                    v-for="item in questions"
                    :key="item.id"
                    :timestamp="item.time"
                    color="#409EFF"
                    placement="top"
                >
                    <el-card>
                        <h3>{{item.question}}</h3>
                        <p class="answer_number">{{item.answerNum}} 个回答</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <div v-else class="no_question">
                你暂时还没有提过任何问题，可以先去
                <span>问答讨论区</span>看看
            </div>
        </div>
        <div class="my_answer" v-if="index === '2'">
            <el-timeline v-if="answers.length > 0">
                <el-timeline-item
                    v-for="item in answers"
                    :key="item.id"
                    :timestamp="item.time"
                    color="#409EFF"
                    placement="top"
                >
                    <el-card>
                        <h3>{{item.question}}</h3>
                        <p>我的回答</p>
                        <h4>{{item.myAnswer}}</h4>
                        <p class="replay_number">{{item.replayNum}} 个回复</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <div v-else class="no_answer">
                你暂时还没有回答过任何问题，可以先去
                <span>问答讨论区</span>看看
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            index: "1",
            questions: [
                {
                    id: 1,
                    time: "2018-4-12",
                    question: "猴指导适合非计算机专业的人学习吗?",
                    answerNum: 123
                },
                {
                    id: 2,
                    time: "2018-3-12",
                    question: "猴指导适合非计算机专业的人学习吗?",
                    answerNum: 123
                }
            ],
            answers: [
                {
                    id: 1,
                    time: "6秒以前",
                    question: "Vue.js和React.js的区别是什么？",
                    myAnswer: "没有什么太大的区别，都是前端框架。。哈哈哈",
                    replayNum: 4
                },
                {
                    id: 2,
                    time: "6秒以前",
                    question: "Vue.js和React.js的区别是什么？",
                    myAnswer: "没有什么太大的区别，都是前端框架。。哈哈哈",
                    replayNum: 14
                }
            ]
        };
    },
    methods: {
        changeIndex(index) {
            this.index = index;
        }
    }
};
</script>

<style lang="stylus" scoped>
.question {
    .menu {
        height: 59px;
    }

    & >>> .el-menu-item {
        padding: 0;
        margin: 0 20px;
        letter-spacing: 4px;
        font-size: 16px;

        &:hover {
            background-color: transparent;
            color: #409EFF;
        }
    }

    & >>> .is-active {
        color: #409EFF !important;
    }

    .my_question, .my_answer {
        padding-top: 20px;

        >>> .el-timeline-item__tail {
            border-left-color: #409EFF;
        }

        >>> .el-card {
            margin-right: 50px;
        }

        .answer_number, .replay_number {
            color: #B5B9BC;
        }

        .no_question, .no_answer {
            color: #B5B5B5;
            font-size: 18px;
            text-align: center;
            padding-top: 130px;

            span {
                color: #F01400;
                cursor: pointer;
            }
        }
    }
}
</style>

