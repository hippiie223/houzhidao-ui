<template>
    <div class="topic">
        <el-card class="info">
            <div class="pic" :style="'background-image:url(' + topic.pic +')'"></div>
            <div class="about">
                <div class="mark">
                    <span class="iconfont">&#xe67a;</span>话题
                </div>
                <div class="title">{{topic.title}}</div>
                <div class="content">{{topic.content}}</div>
                <span class="time iconfont">&#xe61e; {{topic.startTime}} - {{topic.endTime}}</span>
                <span class="partNum iconfont">&#xe61f; {{topic.partNum}}</span>
                <span class="viewNum iconfont">&#xe633; {{topic.viewNum}}</span>
            </div>
        </el-card>
        <h4>全部讨论 ({{discuss.length}})</h4>
        <el-card class="discuss">
            <div
                v-for="item in discuss"
                :key="item.id"
                class="item"
                @click="questionDetail(item.id)"
            >
                <div class="question">{{item.question}}</div>
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
</template>

<script>
export default {
    data() {
        return {
            topic: {
                id: 1,
                pic: require("@/assets/images/topic.jpg"),
                title:
                    "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                content:
                    "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？阿法发顺丰爽肤水发发 Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com",
                viewNum: 33360,
                partNum: 122,
                startTime: "2019/03/01",
                endTime: "2019/04/01"
            },
            discuss: [
                {
                    id: "1",
                    question:
                        "现在大三，这个暑假是在学校学习，然后大四上学期找。还是这个暑假找个实习啥的。",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: "2",
                    question:
                        "现在大三，这个暑假是在学校学习，然后大四上学期找。还是这个暑假找个实习啥的。",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: "3",
                    question:
                        "现在大三，这个暑假是在学校学习，然后大四上学期找。还是这个暑假找个实习啥的。",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: "4",
                    question:
                        "现在大三，这个暑假是在学校学习，然后大四上学期找。还是这个暑假找个实习啥的。",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: "5",
                    question:
                        "现在大三，这个暑假是在学校学习，然后大四上学期找。还是这个暑假找个实习啥的。",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                },
                {
                    id: "6",
                    question:
                        "现在大三，这个暑假是在学校学习，然后大四上学期找。还是这个暑假找个实习啥的。",
                    answerNum: 6,
                    viewNum: 1847,
                    time: "2019/04/01"
                }
            ]
        };
    },
    methods: {
        questionDetail(id) {
            this.$router.push("/question/detail/" + id);
        }
    }
};
</script>

<style lang="stylus" scoped>
.topic {
    margin: 40px 60px;

    >>> .el-card__body {
        padding: 0px;
    }

    .info {
        height: 240px;
        border-radius: 10px;

        .pic {
            width: 240px;
            height: 240px;
            background-size: 100% 100%;
            float: left;
        }

        .about {
            margin-left: 240px;
            padding: 24px;

            .mark {
                font-size: 14px;
                color: #9199A1;

                .iconfont {
                    font-size: 14px;
                    color: #f01414;
                    margin-right: 5px;
                }
            }

            .title {
                font-size: 24px;
                font-weight: 600;
                margin: 10px 0;
            }

            .content {
                font-size: 16px;
                line-height: 24px;
                font-weight: 300;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                margin-bottom: 24px;
            }

            .time, .partNum, .viewNum {
                font-size: 14px;
                color: #9199A1;
                margin-right: 24px;
                font-weight: 300;
            }

            .iconfont {
                font-size: 14px;
            }
        }
    }

    h4 {
        color: #1FAD4E;
    }

    .discuss {
        padding: 20px 40px;

        .item {
            border-bottom: 1px solid #eee;
            padding: 20px 0;
            display: flex;
            color: #9199A1;
            font-size: 14px;

            .question {
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
</style>

