<template>
    <div class="article">
        <div class="article_search">
            <el-input placeholder="输入需要搜索的文章的关键字" prefix-icon="el-icon-search" v-model="articleKey"></el-input>
            <el-button type="primary" @click="publish">编写文章</el-button>
        </div>
        <div class="article_content">
            <div class="left">
                <el-card class="article_list">
                    <div
                        v-for="item in articleList"
                        :key="item.id"
                        class="item"
                        @click="goDetail(item.id)"
                    >
                        <div class="item_pic" :style="'background-image:url(' + item.picture  +')'"></div>
                        <div class="item_about">
                            <div class="item_title">{{item.title}}</div>
                            <div class="item_content">{{item.content}}</div>
                            <div class="item_footer">
                                <span class="item_pageVies iconfont">&#xe633; {{item.pageView}}</span>
                                <span class="item_recommend iconfont">&#xe61e; {{item.recommend}}</span>
                                <span class="item_author">{{item.author}}</span>
                                <span class="item_time">{{item.time}}</span>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
            </div>
            <div class="right">
                <el-card class="article_rank">
                    <h4 class="title">
                        热门文章
                        <span>TOP10</span>
                    </h4>
                    <div v-for="(item,index) in hotArticle" :key="item.id" class="item">
                        <div class="item_sort" :style="'opacity:' + (1 - index * 0.1)">{{index + 1}}</div>
                        <div class="item_pic" :style="'background-image:url(' + item.picture +')'"></div>
                        <div class="item_about">
                            <div class="item_title">{{item.title}}</div>
                            <span class="item_pageView iconfont">&#xe633; {{item.pageView}}</span>
                            <span class="item_recommend iconfont">&#xe61e; {{item.recommend}}</span>
                        </div>
                    </div>
                </el-card>
                <el-card class="author_rank">
                    <h4 class="title">
                        优秀作者
                        <span>TOP10</span>
                    </h4>
                    <div v-for="(item,index) in hotAuthor" :key="item.id" class="item">
                        <div
                            class="item_sort author_sort"
                            :style="'opacity:' + (1 - index * 0.1)"
                        >{{index + 1}}</div>
                        <div
                            class="author_pic"
                            :style="'background-image:url(' + item.picture +')'"
                        ></div>
                        <div class="item_about">
                            <div class="item_name">{{item.name}}</div>
                            <span>{{item.articleNum}}篇文章</span>
                            <span>{{item.fans}}个粉丝</span>
                        </div>
                        <div class="item_attend el-icon-plus">关注</div>
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
            articleKey: "",
            articleList: [
                {
                    id: "1",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "2",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/java.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "3",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/topic.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "4",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/test.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "5",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/struct.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "6",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/git.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "7",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/docker.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "8",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                },
                {
                    id: "9",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/java.jpg"),
                    content:
                        "前端怎样入门？ 这一波良心推荐的【前端学习路线】干货，不谈虚的，直接来谈每个阶段要学习的内容 想入门前端的小伙伴们，那就放马过来吧！     首先，给大家分享一张最新的以 企业岗位需求为导向前端技能点图，如下   根据前端工程师技能点图，我们分为四个阶段： 第一阶段：前端基础 （HTML / CSS / HTML5 / CSS3 / JavaScript ） 干货文章： 初识HTML+CSS  JavaScript高级语言程序设计  HTML5和CSS3从入门到精通",
                    author: "正在进化的程序猿丶",
                    pageView: 7759,
                    recommend: 113,
                    time: "2019-4-15 12:13:14"
                }
            ],
            hotArticle: [
                {
                    id: "1",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "2",
                    title:
                        "【前端学习路线2019版】看新手如何系统掌握前端技能奈斯电脑上",
                    picture: require("@/assets/images/java.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "3",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "4",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "5",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "6",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "7",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "8",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "9",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                },
                {
                    id: "10",
                    title: "【前端学习路线2019版】看新手如何系统掌握前端技能",
                    picture: require("@/assets/images/js.jpg"),
                    pageView: 7759,
                    recommend: 113
                }
            ],
            hotAuthor: [
                {
                    id: 1,
                    name: "Angel_Kitty",
                    picture: require("@/assets/images/icon.jpg"),
                    articleNum: 123,
                    fans: 2445
                },
                {
                    id: 2,
                    name: "Angel_Kitty",
                    picture: require("@/assets/images/icon.jpg"),
                    articleNum: 123,
                    fans: 2445
                },
                {
                    id: 3,
                    name: "Angel_Kitty",
                    picture: require("@/assets/images/icon.jpg"),
                    articleNum: 123,
                    fans: 2445
                },
                {
                    id: 4,
                    name: "Angel_Kitty",
                    picture: require("@/assets/images/icon.jpg"),
                    articleNum: 123,
                    fans: 2445
                },
                {
                    id: 5,
                    name: "Angel_Kitty",
                    picture: require("@/assets/images/icon.jpg"),
                    articleNum: 123,
                    fans: 2445
                },
                {
                    id: 6,
                    name: "Angel_Kitty",
                    picture: require("@/assets/images/icon.jpg"),
                    articleNum: 123,
                    fans: 2445
                }
            ]
        };
    },

    methods: {
        goDetail(id) {
            this.$router.push("/article/detail/" + id);
        },

        // 编写文章
        publish() {
            this.$router.push('/article/publish');
        }
    }
};
</script>

<style lang="stylus" scoped>
.article {
    padding: 30px 20px;

    .article_search {
        width: 30%;
        position: relative;
        display: flex;
        left: 50%;
        transform: translateX(-50%);

        >>> .el-button {
            margin-left: 10px;
        }
    }

    .article_content {
        margin-top: 20px;
        padding: 0 50px;
        display: flex;

        .left {
            width: 68%;
            text-align: center;

            .article_list {
                margin-bottom: 20px;

                .item {
                    cursor: pointer;
                    display: flex;
                    margin-bottom: 30px;

                    .item_pic {
                        width: 200px;
                        height: 120px;
                        background-size: 100% 100%;
                        margin-right: 20px;
                    }

                    .item_about {
                        flex: 1;
                        text-align: left;
                        border-bottom: 1px solid #ddd;

                        .item_title {
                            width: 76%;
                            font-size: 20px;
                            color: #07111b;
                            font-weight: 600;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;

                            &:hover {
                                color: #409EFF;
                                opacity: 0.8;
                            }
                        }

                        .item_content {
                            width: 76%;
                            font-size: 14px;
                            line-height: 20px;
                            color: #4d555d;
                            margin: 12px 0 15px;
                            word-wrap: break-word;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }

                        .item_footer {
                            color: #93999f;
                            font-size: 12px;
                            position: relative;

                            .item_recommend {
                                margin: 20px;
                            }

                            .item_author:hover {
                                color: #07111B;
                            }

                            .item_time {
                                position: absolute;
                                right: 10px;
                            }

                            .iconfont {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }

        .right {
            flex: 1;
            margin-left: 30px;

            .article_rank, .author_rank {
                .item {
                    cursor: pointer;
                    display: flex;
                    margin: 15px 0;
                    position: relative;

                    .item_sort {
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        position: absolute;
                        top: -10px;
                        left: 80px;
                        background: #ff3d00;
                        color: #fff;
                    }

                    .author_sort {
                        top: -5px;
                        left: 40px;
                    }

                    .item_pic {
                        width: 95px;
                        height: 57px;
                        background-size: 100% 100%;
                        margin-right: 15px;
                        border-radius: 5px;
                    }

                    .author_pic {
                        width: 50px;
                        height: 50px;
                        border: 1px solid;
                        border-radius: 50%;
                        background-size: 100% 100%;
                        margin-right: 15px;
                    }

                    .item_about {
                        flex: 1;
                        font-size: 12px;

                        .item_name {
                            font-size: 16px;
                            color: #383D42;
                            font-weight: 600;
                        }

                        .item_title {
                            word-wrap: break-word;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            line-height: 18px;
                            margin-bottom: 5px;

                            &:hover {
                                color: #409FEE;
                                opacity: 0.8;
                            }
                        }

                        .item_recommend {
                            margin: 0 20px;
                        }

                        .iconfont {
                            font-size: 12px;
                        }
                    }
                }
            }

            .author_rank {
                margin-top: 50px;

                .item {
                    align-items: center;

                    .item_about {
                        line-height: 28px;

                        span {
                            margin-right: 10px;
                        }
                    }

                    .item_attend {
                        cursor: pointer;
                        font-size: 12px;
                        padding: 6px 8px;
                        color: #93999f;
                        border: 1px solid;
                        border-radius: 3px;

                        &:hover {
                            color: #409EFF;
                        }
                    }
                }
            }

            .title {
                margin-top: 0;

                span {
                    color: #ff3d00;
                }
            }
        }
    }
}
</style>