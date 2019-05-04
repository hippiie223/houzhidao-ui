<template>
    <div class="exercise">
        <el-menu
            :default-active="index"
            class="exercise_menu"
            mode="horizontal"
            @select="changeIndex"
        >
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="2">已完成</el-menu-item>
            <el-menu-item index="3">未完成</el-menu-item>
        </el-menu>

        <div class="exercise_content">
            <div class="content_title">练习的试卷({{exercises.length}})</div>
            <div class="content_card">
                <el-card class="card_item" v-for="item in exercises" :key="item.id">
                    <div class="item_pic" :style="'background-image:url(' + item.pic + ')'"></div>
                    <div class="item_name">{{item.name}}</div>
                    <div class="item_footer">
                        <span class="item_time">完成时间: {{item.finishTime ? item.finishTime : '未完成'}}</span>
                        <span class="item_score">得分: {{item.score ? item.score : '未完成'}}</span>
                        <span class="item_number">已练习次数: {{item.number ? item.number : '0'}}</span>
                    </div>
                    <div class="item_do">{{item.isFinish ? '再做一次' : '继续做题'}}</div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            index: "1",
            data: [
                {
                    id: 1,
                    isFinish: 0,
                    pic: require("@/assets/images/struct.jpg"),
                    name: "计算机-javaScript专项练习"
                },
                {
                    id: 2,
                    isFinish: 1,
                    pic: require("@/assets/images/struct.jpg"),
                    name: "计算机-HTML/CSS专项练习",
                    score: 80,
                    finishTime: "2018-10-12",
                    number: 1
                },
                {
                    id: 3,
                    isFinish: 1,
                    pic: require("@/assets/images/struct.jpg"),
                    name: "计算机-HTML/CSS专项练习",
                    score: 80,
                    finishTime: "2018-10-12",
                    number: 1
                },
                {
                    id: 4,
                    isFinish: 1,
                    pic: require("@/assets/images/struct.jpg"),
                    name: "计算机-HTML/CSS专项练习",
                    score: 80,
                    finishTime: "2018-10-12",
                    number: 1
                },
                {
                    id: 5,
                    isFinish: 0,
                    pic: require("@/assets/images/struct.jpg"),
                    name: "计算机-javaScript专项练习"
                },
                {
                    id: 6,
                    isFinish: 0,
                    pic: require("@/assets/images/struct.jpg"),
                    name: "计算机-javaScript专项练习"
                }
            ]
        };
    },

    computed: {
        exercises() {
            if (this.index === "1") {
                return this.data;
            } else if (this.index === "2") {
                return this.data.filter(item => {
                    return item.isFinish === 1;
                });
            } else if (this.index === "3") {
                return this.data.filter(item => {
                    return item.isFinish === 0;
                });
            }
        }
    },

    methods: {
        changeIndex(index) {
            this.index = index;
        }
    },

    mounted() {
        this.$emit("changePath", "/user/exercise");
    }
};
</script>

<style lang="stylus" scoped>
.exercise {
    .exercise_menu {
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

    .exercise_content {
        padding-top: 14px;

        .content_card {
            display: flex;
            flex-wrap: wrap;

            .card_item {
                width: 22%;
                margin: 12px;

                &:hover {
                    cursor: pointer;
                    box-shadow: 4px 8px 12px 0 rgba(0, 0, 0, 0.3);

                    .item_do {
                        display: block;
                    }

                    .item_footer {
                        display: none;
                    }
                }

                .item_pic {
                    width: 100%;
                    height: 100px;
                    background-size: 100% 100%;
                }

                .item_name {
                    font-size: 14px;
                    margin: 10px 0;
                    width: 100%;
                    font-size: 16px;
                    color: #07111b;
                    line-height: 24px;
                    word-wrap: break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .item_footer {
                    font-size: 12px;

                    &:after {
                        content: '';
                        display: block;
                        clear: both;
                    }

                    .item_time {
                        float: left;
                    }

                    .item_score {
                        float: right;
                    }

                    .item_number {
                        margin-top: 5px;
                        float: left;
                    }
                }

                .item_do {
                    display: none;
                    background: #409EFF;
                    height: 37px;
                    line-height: 37px;
                    text-align: center;
                    color: #fff;
                    letter-spacing: 5px;
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>