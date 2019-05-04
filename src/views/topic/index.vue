<template>
    <div class="topic">
        <div class="topic_search">
            <el-input placeholder="输入需要搜索的话题的关键字" prefix-icon="el-icon-search" v-model="topicKey"></el-input>
            <el-button type="primary" class="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div class="topic_main">
            <div class="left">
                <el-card class="topic_list">
                    <h3>话题列表</h3>
                    <div class="item" v-for="item in topicList" :key="item.id">
                        <div class="pic" :style="'background-image:url(' + item.pic + ')'"></div>
                        <div class="about">
                            <div
                                class="title"
                                :title="item.title"
                                @click="topicDetail(item.id)"
                            >{{item.title}}</div>
                            <div class="content" :title="item.content">{{item.content}}</div>
                            <span class="time">{{item.startTime}} - {{item.endTime}}</span>
                            <span class="partNum">{{item.partNum}} 参与</span>
                            <span class="viewNum">{{item.viewNum}} 浏览</span>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="right">
                <el-card class="userPart">
                    <h4>我参与的话题</h4>
                    <div class="item" v-for="item in myTopic" :key="item.id">
                        <div class="pic" :style="'background-image:url(' + item.pic + ')'"></div>
                        <div class="title" @click="topicDetail(item.id)">{{item.title}}</div>
                        <span class="partNum iconfont">&#xe61f; {{item.partNum}}</span>
                        <span class="viewNum iconfont">&#xe633; {{item.viewNum}}</span>
                    </div>
                </el-card>
                <el-card class="hotTopic">
                    <h4>
                        热门话题
                        <span>TOP10</span>
                    </h4>
                    <div class="item" v-for="item in hotTopic" :key="item.id">
                        <div class="rank_mark"></div>
                        <div class="pic" :style="'background-image:url(' + item.pic + ')'"></div>
                        <div class="title" @click="topicDetail(item.id)">{{item.title}}</div>
                        <span class="partNum iconfont">&#xe61f; {{item.partNum}}</span>
                        <span class="viewNum iconfont">&#xe633; {{item.viewNum}}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topicKey: "",
            topicList: [
                {
                    id: 1,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com",
                    viewNum: 33360,
                    partNum: 122,
                    startTime: "2019-03-01",
                    endTime: "2019-04-01"
                },
                {
                    id: 2,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com",
                    viewNum: 33360,
                    partNum: 122,
                    startTime: "2019-03-01",
                    endTime: "2019-04-01"
                },
                {
                    id: 3,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com",
                    viewNum: 33360,
                    partNum: 122,
                    startTime: "2019-03-01",
                    endTime: "2019-04-01"
                },
                {
                    id: 4,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com",
                    viewNum: 33360,
                    partNum: 122,
                    startTime: "2019-03-01",
                    endTime: "2019-04-01"
                },
                {
                    id: 5,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com",
                    viewNum: 33360,
                    partNum: 122,
                    startTime: "2019-03-01",
                    endTime: "2019-04-01"
                }
            ],
            myTopic: [
                {
                    id: 1,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 2,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 3,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 4,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                }
            ],
            hotTopic: [
                {
                    id: 1,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 2,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 3,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 4,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 5,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 6,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 7,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                },
                {
                    id: 8,
                    pic: require("@/assets/images/topic.jpg"),
                    title:
                        "【内推第2波】  打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    viewNum: 33360,
                    partNum: 122
                }
            ]
        };
    },

    methods: {
        search() {
            console.log(this.topicKey);
        },

        topicDetail(id) {
            this.$router.push("/topic/detail/" + id);
        }
    }
};
</script>

<style lang="stylus" scoped>
.topic {
    padding: 30px 20px;

    .topic_search {
        width: 30%;
        position: relative;
        display: flex;
        left: 50%;
        transform: translateX(-50%);

        >>> .el-button {
            margin-left: 10px;
        }
    }

    .topic_main {
        display: flex;
        margin: 20px 80px;

        h3 {
            margin: -10px 0 20px;
        }

        .left {
            width: 70%;
            margin-right: 40px;

            .topic_list {
                padding: 10px;

                .item {
                    height: 150px;

                    .pic {
                        width: 120px;
                        height: 120px;
                        border-radius: 5px;
                        background-size: 100% 100%;
                        float: left;
                    }

                    .about {
                        margin-left: 140px;
                        padding-bottom: 12px;
                        border-bottom: 1px solid #eee;

                        .title {
                            font-size: 20px;
                            font-weight: 600;
                            color: #07111B;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            cursor: pointer;
                            transition: all 0.3s;

                            &:hover {
                                color: #409EFF;
                                opacity: 0.8;
                            }
                        }

                        .content {
                            font-size: 12px;
                            font-weight: 300;
                            color: #545C63;
                            line-height: 22px;
                            margin: 10px 0;
                            cursor: pointer;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }

                        .time, .viewNum, .partNum {
                            font-size: 12px;
                            color: #9199A1;
                            font-weight: 200;
                        }

                        .partNum {
                            margin: 0 20px;
                        }
                    }
                }
            }
        }

        .right {
            flex: 1;

            .userPart, .hotTopic {
                h4 {
                    margin: 0 0 10px;
                }

                .item {
                    height: 70px;

                    .pic {
                        float: left;
                        width: 56px;
                        height: 56px;
                        background-size: 100% 100%;
                        margin-right: 10px;
                    }

                    .title {
                        font-size: 12px;
                        line-height: 18px;
                        font-weight: 200;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        cursor: pointer;

                        &:hover {
                            color: #409EFF;
                            opacity: 0.8;
                        }
                    }

                    .partNum, .viewNum {
                        font-size: 12px;
                        font-weight: 200;
                        margin-right: 14px;
                    }
                }
            }

            .userPart {
                margin-bottom: 30px;
            }

            .hotTopic {
                h4 span {
                    color: #F54545;
                }

                .item {
                    position: relative;

                    .rank_mark {
                        width: 0;
                        border: 12px solid #409FEE;
                        border-right-color: transparent;
                        border-bottom-color: transparent;
                        position: absolute;
                        top: 0;
                        left: 0;

                        &:after {
                            position: absolute;
                            font-size: 8px;
                            top: -12px;
                            left: -8px;
                            width: 10px;
                            transform: rotate(-45deg);
                            letter-spacing: 4px;
                            color: #fff;
                        }
                    }
                }
            }

            for index in 2 3 4 5 6 7 8 9 10 11 {
                .item:nth-child({index}) {
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