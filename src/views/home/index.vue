<template>
    <div>
        <!-- 首页轮播图 -->
        <div class="bg000">
            <div class="carousel">
                <el-carousel :autoplay="false" height="448px">
                    <el-carousel-item v-for="(item,index) in carousels" :key="index">
                        <div class="carousel_img" :style="'background-image: url('+ item +')'"></div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <!-- 文章资讯模块 -->
        <div class="bgfff">
            <!-- 模块标题 -->
            <div class="types_title">
                <span class="title_icon iconfont article_icon">&#xe605;</span>
                <span class="title_text">
                    <em>文</em> /
                    <em>章</em> /
                    <em>资</em> /
                    <em>讯</em>
                </span>
                <span class="title_icon iconfont article_icon">&#xe605;</span>
            </div>
            <!-- 模块内容 -->
            <div class="types_content">
                <div class="item" v-for="(item,index) in articleInfo" :key="index">
                    <div class="item_mark article_mark">
                        <span class="icon iconfont">&#xe615;</span>
                        <span class="text">精选文章</span>
                    </div>
                    <div class="item_title article_title">{{item.title}}</div>
                    <div class="item_pic" :style="'background-image: url('+ item.picture +')'"></div>
                    <div class="item_content article_content">{{item.content}}</div>
                    <div class="item_footer">
                        <div class="article_pageView">浏览 {{item.pageView}}</div>
                        <div class="article_recommend">推荐 {{item.recommend}}</div>
                        <div
                            class="item_fullText article_fullText"
                            @click="goDetail('article', item.id)"
                        >
                            阅读全文
                            <span class="iconfont">&#xe624;</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 查看该模块的更多内容 -->
            <div class="types_footer" @click="goModule('article')">
                更多文章资讯
                <span class="iconfont">&#xe624;</span>
            </div>
        </div>

        <!-- 话题广场模块 -->
        <div class="bg000">
            <!-- 模块标题 -->
            <div class="types_title">
                <span class="title_icon iconfont topic_icon">&#xe67b;</span>
                <span class="title_text">
                    <em>话</em> /
                    <em>题</em> /
                    <em>广</em> /
                    <em>场</em>
                </span>
                <span class="title_icon iconfont topic_icon">&#xe67b;</span>
            </div>
            <!-- 模块内容 -->
            <div class="types_content">
                <div class="item" v-for="(item,index) in topicInfo" :key="index">
                    <div class="item_mark topic_mark">
                        <span class="icon iconfont">&#xe67a;</span>
                        <span class="text">热门话题</span>
                    </div>
                    <div class="item_title topic_title"># {{item.title}} #</div>
                    <div
                        class="item_pic topic_pic"
                        :style="'background-image: url('+ item.picture +')'"
                    ></div>
                    <div class="item_content topic_content">{{item.content}}</div>
                    <div class="item_footer">
                        <div
                            class="item_fullText topic_fullText"
                            @click="goDetail('topic', item.id)"
                        >
                            了解详情
                            <span class="iconfont">&#xe624;</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 查看该模块的更多内容 -->
            <div class="types_footer" @click="goModule('topic')">
                更多热门话题
                <span class="iconfont">&#xe624;</span>
            </div>
        </div>

        <!-- 问答讨论模块 -->
        <div class="bgfff">
            <div class="types_title">
                <span class="title_icon iconfont question_icon">&#xe65e;</span>
                <span class="title_text">
                    <em>问</em> /
                    <em>答</em> /
                    <em>讨</em> /
                    <em>论</em>
                </span>
                <span class="title_icon iconfont question_icon">&#xe65e;</span>
            </div>
            <!-- 模块内容 -->
            <div class="types_content">
                <div class="item" v-for="(item,index) in questionInfo" :key="index">
                    <div class="item_mark question_mark">
                        <span class="icon iconfont">&#xe640;</span>
                        <span class="text">常见问题</span>
                    </div>
                    <div class="item_title question_title">{{item.question}}</div>
                    <div class="question_bestAnswer">最赞回答</div>
                    <div class="item_content">{{item.answer}}</div>
                    <div class="item_footer">
                        <div
                            class="item_fullText question_fullText"
                            @click="goDetail('question', item.id)"
                        >
                            共{{item.answerNum}}个回答
                            <span class="iconfont">&#xe624;</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 查看该模块的更多内容 -->
            <div class="types_footer" @click="goModule('question')">
                更多常见问答
                <span class="iconfont">&#xe624;</span>
            </div>
        </div>

        <!-- 在线刷题模块 -->
        <div class="bg000">
            <div class="types_title">
                <span class="title_icon iconfont exercise_icon">&#xe69b;</span>
                <span class="title_text">
                    <em>刷</em> /
                    <em>题</em> /
                    <em>练</em> /
                    <em>习</em>
                </span>
                <span class="title_icon iconfont exercise_icon">&#xe69b;</span>
            </div>
            <div class="types_content">
                <div class="item" v-for="(item,index) in exerciseInfo" :key="index">
                    <div class="item_mark exercise_mark">
                        <span class="icon iconfont">&#xe684;</span>
                        <span class="text">最热习题</span>
                    </div>
                    <div class="exercise_pic" :style="'background-image: url('+ item.picture +')'"></div>
                    <div class="item_title exercise_title">{{item.title}}</div>
                    <div class="item_footer exercise_footer">
                        <div class="exercise_diffculty">{{formatDiff(item.diffculty)}}</div>
                        <div class="exercise_number">
                            <span class="iconfont">&#xe61f;</span>
                            {{item.number}}
                        </div>
                        <div class="exercise_grade">
                            <el-rate
                                v-model="item.grade"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}"
                            ></el-rate>
                        </div>
                    </div>
                    <div class="exercise_do" @click="goDetail('exercise', item.id)">前往答题</div>
                </div>
            </div>
            <!-- 查看该模块的更多内容 -->
            <div class="types_footer" @click="goModule('exercise')">
                更多经典习题
                <span class="iconfont">&#xe624;</span>
            </div>
        </div>

        <!-- 视频学习模块 -->
        <div class="bgfff">
            <div class="types_title">
                <span class="title_icon iconfont study_icon">&#xe710;</span>
                <span class="title_text">
                    <em>课</em> /
                    <em>程</em> /
                    <em>学</em> /
                    <em>习</em>
                </span>
                <span class="title_icon iconfont study_icon">&#xe710;</span>
            </div>
            <div class="types_content">
                <div class="item" v-for="(item,index) in studyInfo" :key="index">
                    <div class="item_mark study_mark">
                        <span class="icon iconfont">&#xe631;</span>
                        <span class="text">最新视频</span>
                    </div>
                    <div class="study_pic" :style="'background-image: url('+ item.picture +')'"></div>
                    <div class="item_title study_title">{{item.title}}</div>
                    <div class="item_footer study_footer">
                        <div class="exercise_diffculty">{{formatDiff(item.diffculty)}}</div>
                        <div class="exercise_number">
                            <span class="iconfont">&#xe61f;</span>
                            {{item.number}}
                        </div>
                        <div class="exercise_grade">
                            <el-rate
                                v-model="item.grade"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}"
                            ></el-rate>
                        </div>
                    </div>
                    <div class="study_do" @click="goDetail('video', item.id)">前往学习</div>
                </div>
            </div>
            <!-- 查看该模块的更多内容 -->
            <div class="types_footer" @click="goModule('video')">
                更多精彩课程
                <span class="iconfont">&#xe624;</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            carousels: [
                require("../../assets/images/one.jpg"),
                require("../../assets/images/two.jpg"),
                require("../../assets/images/three.jpg"),
                require("../../assets/images/four.jpg")
            ],
            articleInfo: [
                {
                    id: "1",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("../../assets/images/test.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "1",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("../../assets/images/test.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "1",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("../../assets/images/test.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    pageView: 7759,
                    recommend: 113
                }
            ],
            topicInfo: [
                {
                    id: "1",
                    title: "打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    picture: require("../../assets/images/topic.jpg"),
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com"
                },
                {
                    id: "1",
                    title: "打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    picture: require("../../assets/images/topic.jpg"),
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com"
                },
                {
                    id: "1",
                    title: "打工奋斗7万落京户VS自主创业牧马城市，如何抉择？",
                    picture: require("../../assets/images/topic.jpg"),
                    content:
                        "毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com"
                }
            ],
            questionInfo: [
                {
                    id: 1,
                    question:
                        "【有奖问答】与大咖交流前端JS与框架开发，免费赢取前端图书（11.28-12.4）",
                    answer:
                        "我觉得不管学习哪门语言，到后面总还是要学习一下规范，程序员的素养必不可少啊！！",
                    answerNum: 152
                },
                {
                    id: 1,
                    question:
                        "【有奖问答】与大咖交流前端JS与框架开发，免费赢取前端图书（11.28-12.4）",
                    answer:
                        "我觉得不管学习哪门语言，到后面总还是要学习一下规范，程序员的素养必不可少啊！！",
                    answerNum: 152
                },
                {
                    id: 1,
                    question:
                        "【有奖问答】与大咖交流前端JS与框架开发，免费赢取前端图书（11.28-12.4）",
                    answer:
                        "我觉得不管学习哪门语言，到后面总还是要学习一下规范，程序员的素养必不可少啊！！",
                    answerNum: 152
                },
                {
                    id: 1,
                    question:
                        "【有奖问答】与大咖交流前端JS与框架开发，免费赢取前端图书（11.28-12.4）",
                    answer:
                        "我觉得不管学习哪门语言，到后面总还是要学习一下规范，程序员的素养必不可少啊！！",
                    answerNum: 152
                }
            ],
            exerciseInfo: [
                {
                    id: 1,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 1,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 1,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 4.8
                },
                {
                    id: 1,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 4.5
                }
            ],
            studyInfo: [
                {
                    id: 1,
                    title: "JavaScript版 数据结构与算法",
                    picture: require("../../assets/images/js.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 1,
                    title:
                        "Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                    picture: require("../../assets/images/java.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 1,
                    title: "Docker+Kubernetes(k8s)微服务容器化实践",
                    picture: require("../../assets/images/docker.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 1,
                    title: "Git 入门",
                    picture: require("../../assets/images/git.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                }
            ]
        };
    },
    computed: {
        ...mapState({
            tabName: state => state.head.tabName
        })
    },
    methods: {
        ...mapMutations({
            changeTabName: "head/SET_TABNAME"
        }),

        formatDiff(diffculty) {
            if (diffculty === "A") {
                return "高级";
            } else if (diffculty === "B") {
                return "中级";
            } else {
                return "初级";
            }
        },

        // 跳转到其他模块
        goModule(name) {
            if (name === this.tabName) {
                return;
            } else {
                console.log("跳转到" + name + "模块");
                this.$router.push(name);
                this.changeTabName(name);
            }
        },

        // 跳转到各个模块详情页
        goDetail(name, id) {
            this.$router.push({ path: `/${name}/detail/${id}` });
        }
    }
};
</script>

<style lang="stylus" scoped>
.carousel {
    margin: 40px 40px 0;
    border-radius: 15px;
    box-shadow: 4px 12px 24px 0 rgba(7, 17, 27, 0.3);

    .carousel_img {
        height: 100%;
        border-radius: 15px;
        background-size: 100% 100%;
    }
}

.bg000 {
    box-shadow: 0 5px 4px 0 rgba(7, 17, 27, 0.06);
}

.bgfff {
    box-shadow: 0 5px 8px 0 rgba(7, 17, 27, 0.06);
}

.types_title {
    text-align: center;
    color: #93999f;
    letter-spacing: 1px;
    padding: 36px 0;

    .title_text {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
    }

    .title_text > em {
        font-style: normal;
        color: #4D555D;
        font-weight: 600;
        font-size: 20px;
    }

    .title_icon {
        margin: 0 14px;
        font-size: 20px;
        vertical-align: middle;
    }

    .article_icon {
        color: #3dcce5;
    }

    .topic_icon {
        color: #f1d220;
        font-size: 24px;
    }

    .question_icon {
        color: #df4344;
    }

    .exercise_icon {
        color: #25BB9B;
    }

    .study_icon {
        color: #5daeff;
        font-size: 24px;
    }
}

.types_content {
    display: flex;
    margin: 0 22px;

    .item {
        flex: 1;
        margin: 0 18px;
        border-radius: 15px;
        box-shadow: 0px 0px 10px rgba(7, 17, 27, 0.1);
        padding: 24px 32px 32px;

        .item_mark {
            font-size: 12px;
            line-height: 16px;
            margin-bottom: 8px;
            vertical-align: middle;

            .icon, .text {
                vertical-align: middle;
            }

            .icon {
                margin-right: 4px;
            }
        }

        .article_mark {
            color: rgba(0, 140, 200, 0.6);
        }

        .topic_mark {
            color: rgba(241, 210, 32, 0.6);
        }

        .question_mark {
            color: #df4344;
        }

        .exercise_mark {
            color: #25BB9B;
        }

        .study_mark {
            color: #5daeff;
        }

        .item_title {
            display: inline-block;
            width: 65%;
            font-size: 16px;
            color: #07111B;
            line-height: 24px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .article_title:hover {
            color: rgb(0, 140, 200);
        }

        .topic_title:hover {
            color: rgb(241, 210, 32);
        }

        .question_title {
            width: 100%;

            &:hover {
                color: #df4344;
            }
        }

        .exercise_title, .study_title {
            width: 100%;
            margin-bottom: 5px;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        &:hover {
            .exercise_title {
                color: #25BB9B;
            }

            .study_title {
                color: #5daeff;
            }

            .exercise_footer, .study_footer {
                display: none;
            }

            .exercise_do, .study_do {
                display: block;
                color: #fff;
                border-radius: 4px;
                padding: 10px 0;
                cursor: pointer;
            }

            .exercise_do {
                background: #25BB9B;
            }

            .study_do {
                background: #5daeff;
            }

            & {
                padding-bottom: 12px;
            }
        }

        .question_bestAnswer {
            margin: 12px 0;
            font-size: 14px;
        }

        .item_pic {
            display: inline-block;
            background-size: 100% 100%;
            width: 30%;
            height: 42px;
            margin-left: 12px;
        }

        .topic_pic {
            width: 72px;
            height: 72px;
            border-radius: 8px;
        }

        .exercise_pic, .study_pic {
            width: 100%;
            height: 120px;
            background-size: 100% 100%;
            border-radius: 12px;
            margin: 10px 0;
        }

        .item_content {
            font-size: 12px;
            color: #4D555D;
            line-height: 24px;
            font-weight: 300;
            margin: 12px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }

        .article_content {
            -webkit-line-clamp: 7;
            min-height: 163px;
        }

        .topic_content {
            -webkit-line-clamp: 5;
            min-height: 115px;
        }

        .question_content {
            -webkit-line-clamp: 3;
            min-height: 67px;
        }

        .item_footer {
            font-size: 12px;
            color: #93999f;
            line-height: 24px;
            font-weight: 400;

            &:after {
                content: '';
                display: block;
                clear: both;
            }

            .article_pageView, .article_recommend {
                float: left;
                margin-right: 20px;
            }

            .exercise_diffculty {
                display: inline-block;
            }

            .exercise_number {
                display: inline-block;
                margin-left: 10px;

                .iconfont {
                    font-size: 12px;
                }
            }

            .exercise_grade {
                display: inline-block;
                margin: 0 -8px;
                transform: translateY(-2px) scale(0.7);
            }

            .item_fullText {
                float: right;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s;

                .iconfont {
                    font-size: 12px;
                }
            }

            .article_fullText {
                color: rgba(0, 140, 200, 0.6);

                &:hover {
                    color: rgb(0, 140, 200);
                }
            }

            .topic_fullText {
                color: rgba(241, 210, 32, 0.6);

                &:hover {
                    color: rgb(241, 210, 32);
                }
            }

            .question_fullText {
                color: #df4344;
                opacity: 0.6;

                &:hover {
                    opacity: 1;
                }
            }
        }

        .exercise_do, .study_do {
            display: none;
            text-align: center;
        }
    }
}

.types_footer {
    text-align: center;
    letter-spacing: 2px;
    color: #93999f;
    padding: 24px 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        color: #333;
    }
}
</style>
