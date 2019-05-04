<template>
    <div class="container">
        <div class="header">
            <span class="iconfont">&#xe621;</span>
            数据结构 / 武汉理工大学2019届数据结构期末试卷
        </div>
        <div class="main">
            <el-card class="left">
                <h4>评估报告</h4>
                <div class="result">
                    <div>正确题数: {{result.currentNum}}/{{result.totalNum}}</div>
                    <div>得分: {{result.score}}</div>
                    <div>用时: {{result.time}}</div>
                </div>
                <h4>答案解析</h4>
                <div class="analy">
                    <div class="title">每题得分情况</div>
                    <div class="score">
                        <div
                            class="item"
                            v-for="i in result.totalNum"
                            :key="i"
                            :class="[result.cAnswer[i-1] == result.sAnswer[i-1] ? 'current': 'incurrent', i-1 === index ? 'on' : '']"
                            @click="changeIndex(i-1)"
                        >{{i}}</div>
                    </div>
                    <div class="topic">{{index+1}}、{{exercise[index].topic}}</div>
                    <span class="cAnswer">正确答案: {{obj[result.cAnswer[index]]}}</span>
                    <span class="sAnswer">你的答案:{{obj[result.sAnswer[index]]}}</span>
                    <span
                        class="currentText"
                        v-if="result.cAnswer[index] === result.sAnswer[index]"
                    >(正确)</span>
                    <span class="incurrentText" v-else>(错误)</span>
                    <div
                        v-for="(option,j) in exercise[index].options"
                        :key="j"
                        class="answerItem"
                        :class="[{'cAnswer': result.cAnswer[index] === j+1}, {'icAnswer': result.sAnswer[index] === j+1 && result.cAnswer[index] !== j+1}]"
                    >{{obj[j+1]}}、{{option}}</div>
                    <div class="review_title">
                        解析讨论
                        <span class="reviewNum">共有{{review.length}}条讨论</span>
                        <div class="addReview" @click="startAnaly">添加解析</div>
                    </div>
                    <div class="review_content">
                        <div class="iconfont noReview" v-if="answer.length === 0">
                            &#xe66e;
                            <div>现在还没人回答，你来告诉大家答案吧！</div>
                        </div>
                        <div class="item" v-for="(item,index) in answer" :key="item.id">
                            <div
                                class="item_pic"
                                :style="'background-image:url(' + item.picture + ')'"
                            ></div>
                            <div class="item_right">
                                <div class="item_name">{{item.name}}</div>
                                <div class="item_content">{{item.content}}</div>
                                <span class="replayBtn" @click="startReplay(item.name,index)">回复</span>
                                <span class="item_time">{{item.time}}</span>
                                <div class="replay" v-for="replay in item.replay" :key="replay.id">
                                    <div
                                        class="replay_pic"
                                        :style="'background-image:url(' + replay.picture + ')'"
                                    ></div>
                                    <div class="replay_about">
                                        <div class="replay_name">
                                            <span class="item_name">{{replay.sender}}</span>
                                            <span class="replay_title">回复</span>
                                            <span class="item_name">{{replay.receiver}}</span>
                                        </div>
                                        <div class="item_content">{{replay.content}}</div>
                                        <span
                                            class="replayBtn"
                                            @click="startReplay(replay.sender, index)"
                                        >回复</span>
                                        <span class="item_time">{{replay.time}}</span>
                                    </div>
                                </div>
                                <div class="replay" v-if="showReplay[index]">
                                    <div
                                        class="replay_pic"
                                        :style="'background-image:url(' + userInfo.pic + ')'"
                                    ></div>
                                    <div class="replay_input">
                                        <el-input
                                            type="textarea"
                                            :placeholder="'回复 ' + replayInfo.receiver +': 写下你的回复'"
                                            v-model="replayInfo.content"
                                            :maxlength="100"
                                            :autosize="{minRows: 3}"
                                        ></el-input>
                                        <div class="button" @click="cancelReplay(index)">取消</div>
                                        <div class="button" @click="submitReplay(index)">回复</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="right">
                <h4>
                    排行榜
                    <span>TOP10</span>
                </h4>
                <div class="rank" v-for="(item,index) in rank" :key="index">
                    <div class="pic" :style="'background-image:url(' + item.pic +')'"></div>
                    <div class="name">{{item.name}}</div>
                    <span class="score">得分:{{item.score}}</span>
                    <span class="time">用时:{{item.time}}</span>
                    <div class="rank_mark"></div>
                </div>
            </el-card>
        </div>

        <el-dialog title="发表评论" :visible.sync="analyDialog" :before-close="cancelAnaly">
            <markdown-editor
                v-model="markdownContent"
                :language="'zh_CN'"
                :mode="'wysiwyg'"
                class="markdown"
                ref="markdown"
                height="200px"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAnaly">取 消</el-button>
                <el-button type="primary" @click="submitAnaly">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import MarkdownEditor from "@/components/MarkdownEditor";
import exercise from "@/constant/exercise";
export default {
    data() {
        return {
            markdownContent: "",
            analyDialog: false,
            showReplay: [],
            index: 0,
            result: {
                currentNum: 6,
                totalNum: 20,
                score: 30,
                time: "00:18:20",
                cAnswer: [
                    1,
                    2,
                    3,
                    4,
                    1,
                    2,
                    3,
                    4,
                    1,
                    2,
                    3,
                    4,
                    1,
                    2,
                    3,
                    4,
                    1,
                    2,
                    3,
                    4
                ],
                sAnswer: [
                    1,
                    3,
                    1,
                    4,
                    3,
                    4,
                    1,
                    3,
                    2,
                    1,
                    3,
                    1,
                    3,
                    2,
                    3,
                    2,
                    1,
                    2,
                    4,
                    2
                ]
            },
            exercise,
            review: [],
            obj: ["", "A", "B", "C", "D"],
            answer: [
                {
                    id: 1,
                    picture: require("@/assets/images/icon.jpg"),
                    name: "正在进化的程序猿丶",
                    time: "2019.01.23",
                    content:
                        "阅读这篇文章，感觉受益匪浅，脚踏实地，慢慢进步！！",
                    replay: [
                        {
                            id: "1",
                            sender: "Angel_Kitty",
                            receiver: "正在进化的程序猿丶",
                            picture: require("@/assets/images/icon.jpg"),
                            content:
                                "道理就是这样，但是付出行动才是真正需要的，加油！！",
                            time: "2019.01.23"
                        },
                        {
                            id: "2",
                            sender: "正在进化的程序猿丶",
                            receiver: "Angel_Kitty",
                            picture: require("@/assets/images/icon.jpg"),
                            content: "正解！！",
                            time: "2019.01.23"
                        }
                    ]
                },
                {
                    id: 2,
                    picture: require("@/assets/images/icon.jpg"),
                    name: "正在进化的程序猿丶",
                    time: "2019.01.23",
                    content:
                        "阅读这篇文章，感觉受益匪浅，脚踏实地，慢慢进步！！",
                    replay: [
                        {
                            id: "1",
                            sender: "Angel_Kitty",
                            receiver: "正在进化的程序猿丶",
                            picture: require("@/assets/images/icon.jpg"),
                            content:
                                "道理就是这样，但是付出行动才是真正需要的，加油！！",
                            time: "2019.01.23"
                        },
                        {
                            id: "2",
                            sender: "正在进化的程序猿丶",
                            receiver: "Angel_Kitty",
                            picture: require("@/assets/images/icon.jpg"),
                            content: "正解！！",
                            time: "2019.01.23"
                        }
                    ]
                }
            ],
            replayInfo: {
                sender: "",
                receiver: "",
                content: "",
                time: ""
            },
            analyInfo: {
                questionId: "",
                answerId: "",
                content: ""
            },
            rank: [
                {
                    name: "Hello-Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    score: 100,
                    time: "10:20:11"
                },
                {
                    name: "Hello-Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    score: 90,
                    time: "11:20:11"
                },
                {
                    name: "Hello-Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    score: 80,
                    time: "10:20:11"
                },
                {
                    name: "Hello-Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    score: 20,
                    time: "10:20:11"
                },
                {
                    name: "Hello-Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    score: 20,
                    time: "10:20:11"
                },
                {
                    name: "Hello-Kitty",
                    pic: require("@/assets/images/icon.jpg"),
                    score: 20,
                    time: "10:20:11"
                }
            ]
        };
    },

    components: {
        MarkdownEditor
    },

    computed: {
        ...mapState({
            userInfo: state => state.user.info
        })
    },

    methods: {
        changeIndex(index) {
            this.index = index;
        },

        // 开始回答
        startAnaly() {
            this.analyDialog = true;
        },

        // 取消回答
        cancelAnaly() {
            this.analyDialog = false;
        },

        // 提交回答
        submitAnaly() {
            console.log(this.analyInfo);
        },

        // 开始回复
        startReplay(name, index) {
            this.replayInfo.sender = this.userInfo.name;
            this.replayInfo.receiver = name;
            this.showReplay.splice(index, 1, true);
        },

        // 取消回复
        cancelReplay(index) {
            this.replayInfo.sender = "";
            this.replayInfo.receiver = "";
            this.replayInfo.content = "";
            this.showReplay.splice(index, 1, false);
        },

        // 提交回复
        submitReplay(index) {
            this.replayInfo.time = new Date().getTime();
            console.log(this.replayInfo);
        }
    }
};
</script>


<style lang="stylus" scoped>
.container {
    margin: 20px 40px 0;

    .header {
        margin: 20px 0;
        color: #25BB9B;
    }

    .main {
        display: flex;

        h4 {
            margin: 0;

            span {
                margin-left: 5px;
                color: #F54545;
            }
        }

        .left {
            width: 75%;
            margin-right: 40px;

            .result {
                display: flex;
                padding-bottom: 20px;
                border-bottom: 1px dashed #ccc;
                margin-bottom: 20px;

                div {
                    flex: 1;
                    color: #9199A1;
                    margin-top: 10px;
                    letter-spacing: 2px;
                }
            }

            .analy {
                .title {
                    font-size: 14px;
                    font-weight: 300;
                    margin: 30px 0px 20px;
                }

                .score {
                    display: flex;
                    align-items: center;
                    padding-bottom: 40px;
                    border-bottom: 1px dashed #ccc;

                    .item {
                        flex: 1;
                        height: 36px;
                        text-align: center;
                        color: #fff;
                        line-height: 36px;
                        background: #25BB9B;
                        margin-right: 5px;
                        cursor: pointer;
                    }

                    .current {
                        background: #25BB9B;
                    }

                    .incurrent {
                        background: #FF431E;
                    }

                    .on {
                        flex: none;
                        width: 48px;
                        height: 48px;
                        line-height: 48px;
                    }
                }

                .topic {
                    padding: 20px 0 10px 10px;
                }

                .cAnswer, .sAnswer, .currentText, .incurrentText {
                    color: #9a99A1;
                    font-size: 14px;
                    letter-spacing: 2px;
                    margin: 0 10px;
                }

                .currentText {
                    color: #25BB9B;
                }

                .incurrentText {
                    color: #FF431E;
                }

                .answerItem {
                    margin: 20px 0;
                    padding: 10px;
                    border: 1px solid #DDDDDDAA;
                    border-radius: 5px;
                    font-size: 14px;
                    letter-spacing: 1px;
                }

                .cAnswer {
                    color: #25BB9B;
                    border-color: #25BB9B;
                }

                .icAnswer {
                    color: #FF431E;
                    border-color: #FF431E;
                }

                .review_title {
                    border-top: 1px dashed #ccc;
                    padding-top: 30px;
                    color: #303133;
                    font-weight: bold;
                    font-size: 20px;
                    height: 36px;
                    line-height: 36px;

                    .reviewNum {
                        color: #666;
                        font-weight: normal;
                        font-size: 14px;
                        margin-left: 20px;
                    }

                    .addReview {
                        float: right;
                        font-size: 16px;
                        color: #FFF;
                        background: #25BB9B;
                        padding: 0px 14px;
                        letter-spacing: 2px;
                        border-radius: 4px;
                        font-weight: normal;
                        cursor: pointer;
                    }
                }

                .review_content {
                    margin: 10px;
                    min-height: 300px;
                    border-bottom: 1px dashed #ccc;

                    .noReview {
                        font-size: 100px;
                        height: 300px;
                        color: #9199A1;
                        text-align: center;
                        padding-top: 75px;
                        box-sizing: border-box;

                        div {
                            font-size: 18px;
                        }
                    }

                    .item {
                        padding: 30px 0;
                        border-bottom: 1px solid #ddd;
                        display: flex;
                        position: relative;

                        &:last-child {
                            border: none;
                        }

                        .item_pic {
                            width: 56px;
                            height: 56px;
                            background-size: 100% 100%;
                            border-radius: 50%;
                            border: 1px solid;
                            margin-top: 3px;
                            margin-right: 20px;
                        }

                        .item_right {
                            flex: 1;
                            line-height: 32px;

                            .item_name {
                                font-weight: 600;
                            }

                            .item_content {
                                font-size: 14px;
                            }

                            .replayBtn, .item_time {
                                color: #9199A1;
                                font-size: 12px;
                            }

                            .replayBtn {
                                cursor: pointer;

                                &:hover {
                                    color: #666;
                                }
                            }

                            .item_time {
                                position: absolute;
                                right: 10px;
                            }

                            .replay {
                                display: flex;
                                padding: 10px 0;

                                .replay_pic {
                                    width: 56px;
                                    height: 56px;
                                    background-size: 100% 100%;
                                    border-radius: 50%;
                                    border: 1px solid;
                                    margin-right: 20px;
                                    margin-top: 3px;
                                }

                                .replay_title {
                                    color: #9199A1;
                                    padding: 0 10px;
                                }

                                .replay_input {
                                    text-align: right;

                                    .button {
                                        display: inline-block;
                                        padding: 4px 20px;
                                        margin: 10px 0 0 10px;
                                        border: 1px solid #25BB9B;
                                        border-radius: 6px;
                                        cursor: pointer;
                                        color: #606266;
                                        letter-spacing: 2px;

                                        &:hover {
                                            background: #25BB9B;
                                            color: #FFF;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .right {
            flex: 1;

            .rank {
                height: 50px;
                padding: 14px 0;
                line-height: 24px;
                border-bottom: 1px dashed #ccc;
                position: relative;

                .pic {
                    float: left;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background-size: 100% 100%;
                    margin-right: 20px;
                }

                .name {
                    font-weight: 600;
                }

                .score, .time {
                    font-size: 12px;
                    color: #9199A1;
                }

                .score {
                    margin-right: 20px;
                }

                .rank_mark {
                    width: 0;
                    border: 12px solid #409FEE;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                    position: absolute;
                    top: 10px;
                    left: 0;

                    &:after {
                        position: absolute;
                        font-size: 8px;
                        top: -18px;
                        left: -8px;
                        width: 10px;
                        transform: rotate(-45deg);
                        letter-spacing: 4px;
                        color: #fff;
                    }
                }
            }

            for index in 2 3 4 5 6 7 8 9 10 11 {
                .rank:nth-child({index}) {
                    .rank_mark {
                        color = #8eb9f5;

                        if (index == 2) {
                            color = #F54545;
                        } else if (index == 3) {
                            color = #FF8547;
                        } else if (index == 4) {
                            color = #FFAC38;
                        }

                        border-top-color: color;
                        border-left-color: color;

                        &:after {
                            content: '' + (index - 1);
                        }
                    }
                }
            }
        }
    }
}
</style>
