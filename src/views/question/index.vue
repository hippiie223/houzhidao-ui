<template>
    <div class="question">
        <div class="question_header">
            <el-input placeholder="请输入你的问题" prefix-icon="el-icon-search" v-model="questionKey"></el-input>
            <el-button type="primary el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" @click="ask">提问</el-button>
        </div>
        <div class="question_main">
            <div class="left">
                <div class="tabs" @click="changeTab">
                    <span :class="tabName === 'all' ? 'actived' : ''">全部问题</span>
                    <span :class="tabName === 'hot' ? 'actived' : ''">热门问题</span>
                    <span :class="tabName === 'ask' ? 'actived' : ''">我提问的</span>
                    <span :class="tabName === 'attend' ? 'actived' : ''">我关注的</span>
                    <span :class="tabName === 'answer' ? 'actived' : ''">我回答的</span>
                </div>
                <el-card class="list">
                    <div
                        v-for="item in questionList"
                        :key="item.id"
                        class="item"
                        @click="questionDetail(item.id)"
                    >
                        <div class="title">{{item.question}}</div>
                        <div class="answerNum">
                            <div>{{item.answerNum}}</div>
                            <div>问答数</div>
                        </div>
                        <div class="viewNum">
                            <div>{{item.viewNum}}</div>
                            <div>浏览量</div>
                        </div>
                        <div class="time">
                            <div>{{item.time}}</div>
                            <div>发表时间</div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="right">
                <el-card class="userInfo">
                    <div class="basic">
                        <div class="pic" :style="'background-image:url(' + user.pic + ')'"></div>
                        <div class="name">{{user.name}}</div>
                    </div>
                    <div class="about">
                        <div class="questionNum" @click="changeTab('我提问的')">
                            {{askQuestion.length}}
                            <div>我提问的</div>
                        </div>
                        <div class="attendNum" @click="changeTab('我关注的')">
                            {{attendQuestion.length}}
                            <div>我关注的</div>
                        </div>
                        <div class="answerNum" @click="changeTab('我回答的')">
                            {{answerQuestion.length}}
                            <div>我回答的</div>
                        </div>
                    </div>
                </el-card>
                <h4>回答排行榜</h4>
                <div class="item" v-for="item in answerRank" :key="item.id">
                    <div class="pic" :style="'background-image:url(' + item.pic +')'"></div>
                    <div class="info">
                        <div class="name">{{item.name}}</div>
                        <span class="accepted">被采纳 {{item.acceptedNum}}</span>
                        <span class="answer">回答 {{item.answerNum}}</span>
                    </div>
                    <div class="el-icon-plus attendBtn">关注</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    data() {
        return {
            questionKey: "",
            tabName: "all",
            questionList: [
                {
                    id: 1,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 2,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 3,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 4,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 5,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 6,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 7,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 8,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 9,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ],
            allQuestion: [
                {
                    id: 1,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 2,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 3,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 4,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 5,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 6,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 7,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 8,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 9,
                    question: "Chrome59到底支不支持forEach函数？",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ],
            hotQuestion: [
                {
                    id: 1,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 2,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 3,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 4,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 5,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 6,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 7,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 8,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 9,
                    question: "慕课网适合非计算机专业的人学习吗",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ],
            askQuestion: [
                {
                    id: 1,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 2,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 3,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 4,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 5,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 6,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 7,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 8,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 9,
                    question: "这是我自己问的问题！！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ],
            answerQuestion: [
                {
                    id: 1,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 2,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 3,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 4,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 5,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 6,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 7,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 8,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 9,
                    question: "这是我回答的问题！！！",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ],
            attendQuestion: [
                {
                    id: 1,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 2,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 3,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 4,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 5,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 6,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 7,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 8,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: 9,
                    question: "这是我所关注的问题",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ],
            answerRank: [
                {
                    id: 1,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 2,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 3,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 4,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 5,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 6,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 7,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                },
                {
                    id: 8,
                    name: "Angel_Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    acceptedNum: 23,
                    answerNum: 123
                }
            ]
        };
    },

    computed: {
        ...mapState({
            user: state => state.user.info
        })
    },

    methods: {
        search() {},
        ask() {
            this.$router.push("/question/ask");
        },
        changeTab(e) {
            const newTab = e.target ? e.target.innerText : e;
            if (newTab === "全部问题") {
                this.tabName = "all";
                this.questionList = this.allQuestion;
            } else if (newTab === "热门问题") {
                this.tabName = "hot";
                this.questionList = this.hotQuestion;
            } else if (newTab === "我回答的") {
                this.tabName = "answer";
                this.questionList = this.answerQuestion;
            } else if (newTab === "我关注的") {
                this.tabName = "attend";
                this.questionList = this.attendQuestion;
            } else if (newTab === "我提问的") {
                this.tabName = "ask";
                this.questionList = this.askQuestion;
            }
        },
        questionDetail(id) {
            this.$router.push("/question/detail/" + id);
        }
    }
};
</script>

<style lang="stylus" scoped>
.question {
    padding: 30px 20px;

    .question_header {
        width: 40%;
        position: relative;
        display: flex;
        left: 50%;
        transform: translateX(-50%);

        >>> .el-input__inner:focus {
            border-color: #1FAD4E;
        }

        >>> .el-button {
            margin-left: 10px;
            background: #1FAD4E;
            border-color: #1FAD4E;
        }
    }

    .question_main {
        margin: 40px 60px 0;
        display: flex;

        .left {
            width: 70%;
            margin-right: 40px;

            .tabs {
                font-size: 14px;
                color: #545C63;
                margin-bottom: 20px;
                letter-spacing: 2px;

                span {
                    margin: 0 10px;
                    padding: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .actived {
                    background-color: #1FAD4E;
                    color: #fff;
                }
            }

            >>> .el-card__body {
                padding: 0px;
            }

            .list {
                padding: 20px 40px;

                .item {
                    border-bottom: 1px solid #eee;
                    padding: 10px 0;
                    display: flex;
                    color: #9199A1;
                    font-size: 14px;

                    .title {
                        padding: 10px 0;
                        font-size: 16px;
                        color: #07111B;
                        position: relative;
                        font-weight: 600;
                        flex: 1;
                        cursor: pointer;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        border-right: 1px solid #eee;

                        &:hover {
                            color: #1FAD4E;

                            &:after {
                                display: block;
                                content: '我来回答';
                                position: absolute;
                                bottom: 0;
                                right: 20px;
                                font-size: 12px;
                            }
                        }
                    }

                    .answerNum, .time, .viewNum {
                        width: 80px;
                        line-height: 24px;
                        text-align: center;
                        cursor: pointer;
                    }

                    .answerNum {
                        color: #1FAD4E;
                    }

                    .viewNum:hover {
                        color: #1FAD4E;
                    }
                }
            }
        }

        .right {
            flex: 1;

            .userInfo {
                padding: 0 8px;
                background-color: #eceff1;

                .basic {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #1c1f212a;
                    line-height: 48px;

                    .pic {
                        float: left;
                        width: 48px;
                        height: 48px;
                        background-size: 100% 100%;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    .name {
                        font-weight: 600;
                    }
                }

                .about {
                    display: flex;
                    padding-top: 10px;

                    & div {
                        text-align: center;
                        color: #545C63;
                        line-height: 24px;
                        cursor: pointer;

                        div {
                            font-size: 12px;
                        }
                    }

                    .attendNum {
                        flex: 1;
                    }
                }
            }

            .item {
                display: flex;
                margin: 16px 0;
                cursor: pointer;

                .pic {
                    width: 48px;
                    height: 48px;
                    background-size: 100% 100%;
                    border-radius: 50%;
                    border: 1px solid #eee;
                }

                .info {
                    flex: 1;
                    margin: 0 20px;
                    line-height: 24px;

                    .name {
                        font-weight: 600;
                    }

                    span {
                        color: #9199A1;
                        font-size: 12px;

                        &:nth-child(2) {
                            margin-right: 16px;
                        }
                    }
                }

                .attendBtn {
                    height: 16px;
                    line-height: 16px;
                    color: #93999f;
                    letter-spacing: 2px;
                    font-size: 12px;
                    border: 1px solid;
                    padding: 6px 8px;
                    border-radius: 5px;
                    text-align: center;
                    margin-top: 10px;

                    &:hover {
                        color: #1FAD4E;
                    }
                }
            }
        }
    }
}
</style>