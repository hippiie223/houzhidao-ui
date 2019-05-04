<template>
    <div class="question">
        <div class="left">
            <el-card class="detail" :class="{'max_height':showMore}">
                <div class="mark">
                    <span class="iconfont">&#xe640;</span> / 问答
                </div>
                <div class="title">{{question.title}}</div>
                <el-tag
                    class="tag"
                    type="info"
                    size="small"
                    v-for="item in question.tags"
                    :key="item"
                >{{item}}</el-tag>
                <span class="time">{{question.time}}</span>
                <span class="author">{{question.author}}</span>
                <div class="content" v-html="question.content"></div>
                <div class="showMore" v-if="showMore" @click="showMoreContent">
                    点击查看详细描述
                    <span class="el-icon-arrow-down"></span>
                </div>
            </el-card>
            <h4>回答 ({{answer.length}})</h4>
            <el-card class="answer">
                <div class="accept_mark"></div>
                <div class="item" v-for="(item,index) in answer" :key="item.id">
                    <div class="item_pic" :style="'background-image:url(' + item.picture + ')'"></div>
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
                                <el-button @click="cancelReplay(index)">取消</el-button>
                                <el-button type="primary" @click="submitReplay(index)">回复</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="right">
            <el-card class="question_info">
                <div class="about">
                    <div class="answerNum">
                        {{answer.length}}
                        <div>回答</div>
                    </div>
                    <div class="attendNum">
                        {{question.attendNum}}
                        <div>关注</div>
                    </div>
                    <div class="viewNum">
                        {{question.viewNum}}
                        <div>浏览</div>
                    </div>
                </div>
                <div class="answer" @click="startAnswer">我来回答</div>
                <div class="attend">关注</div>
            </el-card>
            <h4>相关问题推荐</h4>
            <div class="item" v-for="item in relatedQuestion" :key="item.id">
                <div class="iconfont">&#xe640;</div>
                <div class="title">{{item.title}}</div>
            </div>
        </div>

        <el-dialog title="发表评论" :visible.sync="answerDialog" :before-close="cancelAnswer">
            <markdown-editor
                v-model="markdownContent"
                :language="'zh_CN'"
                :mode="'wysiwyg'"
                class="markdown"
                ref="markdown"
                height="200px"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAnswer">取 消</el-button>
                <el-button type="primary" @click="submitAnswer">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import { mapState } from 'vuex';
export default {
    data() {
        return {
            markdownContent: "",
            answerDialog: false,
            showMore: true,
            question: {
                id: 1,
                accepted: 123,
                title: "Chrome59到底支不支持forEach函数？",
                tags: ["JavaScript", "Vue.js"],
                author: "Angel_Kitty",
                time: "2019-04-24 13:14:15",
                content:
                    '<p>&lt;!DOCTYPE HTML&gt;</p><p>&lt;html&gt;</p><p>&lt;head&gt;</p><p>&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"&gt;</p><p>&lt;title&gt;无标题文档&lt;/title&gt;</p><p>&lt;/head&gt; &nbsp; &nbsp;</p><p>&lt;body&gt;</p><p>&lt;form&gt;</p><p>请选择你爱好:<br></p><p>&lt;input type="checkbox" name="hobby" id="hobby1"&gt; &nbsp;音乐</p><p>&lt;input type="checkbox" name="hobby" id="hobby2"&gt; &nbsp;登山</p><p>&lt;input type="checkbox" name="hobby" id="hobby3"&gt; &nbsp;游泳</p><p>&lt;input type="checkbox" name="hobby" id="hobby4"&gt; &nbsp;阅读</p><p>&lt;input type="checkbox" name="hobby" id="hobby5"&gt; &nbsp;打球</p><p>&lt;input type="checkbox" name="hobby" id="hobby6"&gt; &nbsp;跑步 &lt;br&gt;</p><p>&lt;input type="button" value = "全选" onclick = "checkall();"&gt;</p><p>&lt;/form&gt;</p><p>&lt;script type="text/javascript"&gt;</p><p>function checkall(){</p><p>var hobby = document.getElementsByTagName("input");</p><p>hobby.forEach(function(v){v.checked=true;}); //为什么chrome这句报函数forEach不存在？</p><p>[1,2,3].forEach(function(v){alert(v);});//而这句就不报错呢？</p><p>}</p><p>&lt;/script&gt;</p><p>&lt;/body&gt;</p><p>&lt;/html&gt;</p><p><br></p>',
                viewNum: 9661,
                attendNum: 123
            },
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
                },
                {
                    id: 3,
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
                    id: 4,
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
                            content: "正解！！",
                            picture: require("@/assets/images/icon.jpg"),
                            time: "2019.01.23"
                        }
                    ]
                },
                {
                    id: 5,
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
                    id: 6,
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
                    id: 7,
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
                    id: 8,
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
                    id: 9,
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
                    id: 10,
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
            showReplay: [],
            relatedQuestion: [
                {
                    id: 1,
                    title: "Chrome59到底支不支持forEach函数？鞍山市不必"
                },
                {
                    id: 2,
                    title: "Chrome59到底支不支持forEach函数？"
                },
                {
                    id: 3,
                    title: "Chrome59到底支不支持forEach函数？"
                },
                {
                    id: 4,
                    title: "Chrome59到底支不支持forEach函数？"
                },
                {
                    id: 5,
                    title: "Chrome59到底支不支持forEach函数？"
                },
                {
                    id: 6,
                    title: "Chrome59到底支不支持forEach函数？"
                },
                {
                    id: 7,
                    title: "Chrome59到底支不支持forEach函数？"
                }
            ],
            replayInfo: {
                sender: "",
                receiver: "",
                content: "",
                time: ""
            },
            answerInfo: {
                questionId: "",
                answerId: "",
                content: ""
            }
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
        showMoreContent() {
            this.showMore = false;
        },

        // 开始回答
        startAnswer() {
            this.answerDialog = true;
        },

        // 取消回答
        cancelAnswer() {
            this.answerDialog = false;
        },

        // 提交回答
        submitAnswer() {
            console.log(this.answer);
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
    },

    mounted() {
        this.showReplay = new Array(this.answer.length).fill(false);
    }
};
</script>

<style lang="stylus" scoped>
.question {
    display: flex;
    margin: 40px 80px;

    .left {
        width: 70%;
        margin-right: 40px;

        .detail {
            padding: 0 20px;
            position: relative;

            .mark {
                font-size: 12px;
                color: #1c1f2199;
                line-height: 24px;

                .iconfont {
                    font-size: 12px;
                    color: #1FAD4E;
                }
            }

            .title {
                color: #07111B;
                font-size: 24px;
                margin: 10px 0;
                font-weight: 600;
            }

            .tag {
                margin-right: 10px;
            }

            .author, .time {
                float: right;
                color: #93999F;
                font-size: 12px;
            }

            .author {
                margin-right: 20px;
            }

            .showMore {
                text-align: center;
                color: #1FAD4E;
                letter-spacing: 2px;
                position: absolute;
                bottom: 0;
                background-color: #fff;
                width: 90%;
                height: 48px;
                line-height: 48px;
                padding-bottom: 20px;
                cursor: pointer;
                box-shadow: 0 -10px 120px 54px #fff;

                &:hover {
                    color: green;
                }
            }
        }

        .max_height {
            height: 280px;
        }

        .answer {
            padding: 0 30px;
            position: relative;

            .accept_mark {
                width: 0;
                border: 36px solid #1FAD4E;
                border-right-color: transparent;
                border-bottom-color: transparent;
                position: absolute;
                top: 0;
                left: 0;

                &:after {
                    content: '已采纳';
                    font-size: 14px;
                    font-weight: 600;
                    position: absolute;
                    top: -22px;
                    left: -36px;
                    width: 50px;
                    transform: rotate(-45deg);
                    letter-spacing: 2px;
                    color: #fff;
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

                            >>> .el-button {
                                margin-top: 10px;
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

    .right {
        flex: 1;

        .question_info {
            padding: 0 8px;
            background-color: #eceff1;

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

            .answer, .attend {
                width: 80%;
                text-align: center;
                margin: 16px auto 0;
                padding: 8px 0;
                border-radius: 8px;
                cursor: pointer;
            }

            .answer {
                color: #fff;
                background-color: #1FAD4E;
            }

            .attend {
                color: #545c63;
                background-color: #545c631a;
            }
        }

        h4 {
            margin-top: 40px;
        }

        .item {
            display: flex;
            margin-top: 20px;
            cursor: pointer;

            .iconfont {
                font-size: 18px;
                margin-right: 10px;
                margin-top: 1 px;
            }

            .title {
                flex: 1;
                font-size: 14px;
                border-bottom: 1px solid #eee;
                padding-bottom: 12px;
                letter-spacing: 2px;
            }

            &:hover {
                color: #1FAD4E;
            }
        }
    }

    >>> .el-dialog__body {
        padding: 15px 40px;
    }

    >>> .el-dialog__footer {
        padding-right: 40px;
    }
}
</style>

