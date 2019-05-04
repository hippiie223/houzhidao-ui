<template>
    <div class="detail">
        <div class="left">
            <el-card class="content" :class="{'max_height' : showMore}">
                <div class="content_mark"></div>
                <div class="content_icon iconfont">&#xe615; 文章 / {{article.tag}}</div>
                <div class="content_title">{{article.title}}</div>
                <span class="content_time">{{article.time}}</span>
                <span class="content_pageView iconfont">&#xe633; {{article.pageView}} 浏览</span>
                <div class="content_main" v-html="article.content"></div>
                <div
                    class="showMore"
                    :style="'display:' + (showMore ? 'block' : 'none')"
                    @click="showMoreContent"
                >
                    点击查看全部内容
                    <span class="el-icon-arrow-down"></span>
                </div>
            </el-card>
            <h4>评论 ( {{recommend.length}} )</h4>
            <el-card class="recommend">
                <span class="publish">发表评论</span>
                <el-input @focus="startReview" placeholder="写下你的评论，共同探讨看法"></el-input>
                <div class="item" v-for="(item,index) in recommend" :key="item.id">
                    <div class="item_left">
                        <div class="item_pic" :style="'background-image:url(' + item.picture + ')'"></div>
                        <div class="item_floor">{{index + 1}} 楼</div>
                    </div>
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
            <el-card class="author">
                <h4>作者信息</h4>
                <div class="info">
                    <div class="left">
                        <div
                            class="info_pic"
                            :style="'background-image:url(' + author.picture + ')'"
                        ></div>
                        <div class="info_attend el-icon-plus">关注</div>
                    </div>
                    <div class="info_about">
                        <div class="info_name" :title="author.name">{{author.name}}</div>
                        <div class="info_job">{{author.job}}</div>
                        <div class="info_articleNum iconfont">&#xe605; {{author.articleNum}}篇文章</div>
                        <div class="info_fansNum iconfont">&#xe650; {{author.fansNum}}个粉丝</div>
                    </div>
                </div>
            </el-card>
            <el-card class="articles">
                <h4>作者相关文章</h4>
                <div v-for="item in relatedArticle" :key="item.id" class="item">
                    <div class="iconfont">&#xe615;</div>
                    <div class="title" :title="item.title">{{item.title}}</div>
                </div>
                <div class="more">
                    查看更多
                    <span class="el-icon-arrow-right"></span>
                </div>
            </el-card>
        </div>

        <el-dialog title="发表评论" :visible.sync="reviewDialog" :before-close="cancelReview">
            <markdown-editor
                v-model="markdownContent"
                :language="'zh_CN'"
                :mode="'wysiwyg'"
                class="markdown"
                ref="markdown"
                height="200px"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelReview">取 消</el-button>
                <el-button type="primary" @click="submitReview">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import Article from "@/constant/article";
import { mapState } from "vuex";
export default {
    data() {
        return {
            showMore: true,
            showReplay: [],
            reviewDialog: false,
            markdownContent: "",
            article: {
                id: 1,
                title: "【干货推荐】java工程师从零进阶，大牛带你轻松上路",
                time: "2019-01-09 14:49",
                pageView: 12521,
                content: Article,
                tag: "java后端开发"
            },
            author: {
                picture: require("@/assets/images/icon.jpg"),
                name: "Angel_Kitty",
                articleNum: 234,
                fansNum: 1112,
                job: "全栈工程师"
            },
            relatedArticle: [
                {
                    id: 1,
                    title: "【干货推荐】java工程师从零进阶，大牛带你轻松上路"
                },
                {
                    id: 2,
                    title: "【干货推荐】java工程师从零进阶，大牛带你轻松上路"
                },
                {
                    id: 3,
                    title: "【干货推荐】java工程师从零进阶，大牛带你轻松上路"
                },
                {
                    id: 4,
                    title: "【干货推荐】java工程师从零进阶，大牛带你轻松上路"
                },
                {
                    id: 5,
                    title: "【干货推荐】java工程师从零进阶，大牛带你轻松上路"
                }
            ],
            recommend: [
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
            replayInfo: {
                sender: "",
                receiver: "",
                content: "",
                time: ""
            },
            reviewInfo: {
                articleId: "",
                reviewName: "",
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
        },

        // 开始评论
        startReview() {
            this.reviewDialog = true;
        },

        // 取消评论
        cancelReview() {
            this.reviewDialog = false;
            this.markdownContent = "";
        },

        // 提交评论
        submitReview() {
            this.reviewInfo.articleId = this.article.id;
            this.reviewInfo.reviewName = this.userInfo.name;
            this.reviewInfo.content = this.$refs.markdown.getHtml();
            this.reviewInfo.time = new Date().getTime();
            console.log(this.reviewInfo);
        }
    },

    mounted() {
        this.showReplay = new Array(this.recommend.length).fill(false);
    }
};
</script>


<style lang="stylus" scoped>
.detail {
    margin: 40px 150px;
    display: flex;

    .left {
        width: 70%;

        .content {
            padding: 30px 40px;
            position: relative;

            .content_icon {
                font-size: 14px;
                color: #93999f;
                margin-bottom: 16px;
                color: #409FEE;
                opacity: 0.8;
            }

            .content_mark {
                width: 0;
                border: 36px solid #409FEE;
                border-right-color: transparent;
                border-bottom-color: transparent;
                position: absolute;
                top: 0;
                left: 0;

                &:after {
                    content: '文章';
                    position: absolute;
                    top: -28px;
                    left: -34px;
                    width: 50px;
                    transform: rotate(-45deg);
                    letter-spacing: 4px;
                    color: #fff;
                }
            }

            .content_title {
                font-size: 32px;
                font-weight: 700;
                line-height: 40px;
                margin-bottom: 10px;
            }

            .content_time, .content_pageView {
                font-size: 12px;
                color: #9199A1;
                margin-right: 24px;
            }

            .content_main {
                >>> .cl-preview-section {
                    font-size: 16px;
                    color: #1c1f21;
                    word-wrap: break-word;
                    background-color: #fff;
                    line-height: 32px;

                    img {
                        max-width: 90%;
                        margin: 20px auto;
                    }
                }
            }

            .showMore {
                position: absolute;
                bottom: 0;
                color: #409FEE;
                font-size: 18px;
                letter-spacing: 4px;
                padding: 24px 0;
                width: 100%;
                text-align: center;
                transform: translate(-10%);
                background: #fff;
                box-shadow: 0 -10px 120px 54px #fff;
                cursor: pointer;

                &:hover {
                    color: blue;
                }
            }
        }

        .max_height {
            max-height: 1000px;
        }

        .recommend {
            padding: 30px 30px 0;

            .publish {
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 4px;
                margin-right: 20px;
            }

            >>> .el-input {
                width: 60%;
                margin-bottom: 40px;
            }

            .item {
                padding: 30px 0;
                border-top: 1px solid #ddd;
                display: flex;
                position: relative;

                .item_left {
                    margin-right: 20px;

                    .item_pic {
                        width: 56px;
                        height: 56px;
                        background-size: 100% 100%;
                        border-radius: 50%;
                        border: 1px solid;
                        margin-top: 3px;
                    }

                    .item_floor {
                        text-align: center;
                        margin-top: 10px;
                        color: #9199A1;
                    }
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
        margin-left: 40px;

        .author {
            margin-bottom: 50px;

            h4 {
                margin-top: 0;
            }

            .info {
                display: flex;

                .info_pic {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-size: 100% 100%;
                    border: 1px solid;
                    margin-left: 5px;
                    margin-top: 5px;
                }

                .info_attend {
                    border: 1px solid;
                    color: #9199A1;
                    padding: 8px 10px;
                    font-size: 14px;
                    letter-spacing: 3px;
                    border-radius: 4px;
                    margin-top: 13px;
                    cursor: pointer;

                    &:hover {
                        color: #409FEE;
                        opacity: 0.8;
                    }
                }

                .info_about {
                    flex: 1;
                    line-height: 30px;

                    .info_name {
                        width: 120px;
                        font-size: 20px;
                        font-weight: 600;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                    }

                    .info_job, .info_articleNum, .info_fansNum {
                        font-size: 14px;
                        color: #9199A1;
                    }
                }
            }
        }

        .articles {
            h4 {
                margin-top: 0;
            }

            .item {
                display: flex;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
                font-size: 14px;
                color: #545C63;

                .iconfont {
                    margin-right: 10px;
                }

                .title {
                    letter-spacing: 2px;
                    cursor: pointer;
                    word-wrap: break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                &:hover {
                    color: #409FEE;
                }
            }

            .more {
                font-size: 14px;
                text-align: center;
                color: #545C63;
                cursor: pointer;

                &:hover {
                    color: #409FEE;
                }
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

