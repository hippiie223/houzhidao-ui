<template>
    <div class="exercise">
        <MultSelect color="#409EFF"></MultSelect>
        <div class="listTab" @click="changeTab">
            <span :class="listTab === 'new' ? 'active' : ''">最 新</span>
            <span :class="listTab === 'hot' ? 'active' : ''">最 热</span>
        </div>
        <div class="content">
            <div class="item" v-for="(item,index) in exerciseInfo" :key="index">
                <div class="mark">
                    <span class="icon iconfont">&#xe631;</span>
                    <span class="text">最{{listTab === 'new' ? '新' : '热'}}课程</span>
                </div>
                <div class="pic" :style="'background-image: url('+ item.picture +')'"></div>
                <div class="title">{{item.title}}</div>
                <div class="footer">
                    <div class="diffculty">{{formatDiff(item.diffculty)}}</div>
                    <div class="number">
                        <span class="iconfont">&#xe61f;</span>
                        {{item.number}}
                    </div>
                    <div class="grade">
                        <el-rate
                            v-model="item.grade"
                            disabled
                            show-score
                            text-color="#ffaa00"
                            score-template="{value}"
                        ></el-rate>
                    </div>
                </div>
                <div class="do" @click="doStudy(item.id)">前往学习</div>
            </div>
        </div>
    </div>
</template>

<script>
import MultSelect from "@/components/MultSelect";
export default {
    data() {
        return {
            listTab: "new",
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
                    id: 2,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 3,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 4.8
                },
                {
                    id: 4,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 4.5
                },
                {
                    id: 5,
                    title: "武汉理工大学2019届数据结构期末试卷",
                    picture: require("../../assets/images/struct.jpg"),
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                }
            ]
        };
    },

    components: {
        MultSelect
    },

    methods: {
        formatDiff(diffculty) {
            if (diffculty === "A") {
                return "高级";
            } else if (diffculty === "B") {
                return "中级";
            } else {
                return "初级";
            }
        },

        changeTab() {
            this.listTab = this.listTab === "new" ? "hot" : "new";
        },

        doStudy(id) {
            this.$router.push("/video/detail/" + id);
        }
    }
};
</script>

<style lang="stylus" scoped>
.exercise {
    padding: 40px;

    .listTab {
        margin: 34px 0 10px;

        span {
            font-size: 18px;
            margin-right: 12px;
            padding: 8px 20px;
            border-radius: 8px;
            cursor: pointer;
        }

        .active {
            background-color: #409EFF;
            color: #FFFFFF;
        }
    }

    .content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .item {
            width: 17.5%;
            margin: 24px 24px 0 0;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(7, 17, 27, 0.1);
            padding: 24px 32px 32px;
            cursor: pointer;

            .mark {
                font-size: 12px;
                line-height: 16px;
                margin-bottom: 8px;
                vertical-align: middle;

                .icon, .text {
                    vertical-align: middle;
                }

                .icon {
                    margin-right: 4px;
                    color: #409EFF;
                }
            }

            .title {
                display: inline-block;
                width: 100%;
                font-size: 16px;
                color: #07111B;
                line-height: 24px;
                cursor: pointer;
                transition: all 0.3s;
                margin-bottom: 5px;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            &:hover {
                .title {
                    color: #409EFF;
                    opacity: 0.8;
                }

                .footer {
                    display: none;
                }

                .do {
                    display: block;
                    color: #fff;
                    border-radius: 4px;
                    padding: 10px 0;
                    background: #409EFFD0;
                }

                & {
                    padding-bottom: 12px;
                }
            }

            .pic {
                width: 100%;
                height: 120px;
                background-size: 100% 100%;
                border-radius: 12px;
                margin: 10px 0;
            }

            .footer {
                font-size: 12px;
                color: #93999f;
                line-height: 24px;
                font-weight: 400;

                &:after {
                    content: '';
                    display: block;
                    clear: both;
                }

                .diffculty {
                    display: inline-block;
                }

                .number {
                    display: inline-block;
                    margin-left: 10px;

                    .iconfont {
                        font-size: 12px;
                    }
                }

                .grade {
                    display: inline-block;
                    margin: 0 -8px;
                    transform: translateY(-2px) scale(0.7);
                }
            }

            .do {
                display: none;
                text-align: center;
            }
        }

        .item:nth-child(4n + 1) {
            margin-left: 0;
        }
    }
}
</style>