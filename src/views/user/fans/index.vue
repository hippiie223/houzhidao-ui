<template>
    <div class="fans">
        <div class="fans_header">我的粉丝({{fans.length}})</div>
        <div class="fans_content">
            <el-card v-for="(item,index) in fans" :key="item.id" class="card_item">
                <div class="item_pic" :style="'background-image:url(' + item.pic + ')'"></div>
                <div class="item_about">
                    <div class="item_name">{{item.name}}</div>
                    <div class="item_job">{{item.job}}</div>
                </div>
                <div class="item_other">
                    <span class="item_attend">关注 {{item.attend}}</span>
                    <span class="item_fans">粉丝 {{item.fans}}</span>
                </div>
                <div class="attendBtn" @click="cancelAttend(index)">
                    <span :class="attendText[index] === '已互关' ? 'el-icon-sort' : 'el-icon-plus'"></span>
                    {{attendText[index]}}
                </div>
                <div class="moveBtn el-icon-close" @click="cancelAttend(index)">移除粉丝</div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fans: [
                {
                    id: 1,
                    pic: require("@/assets/images/icon.jpg"),
                    name: "七寸法师",
                    job: "python工程师",
                    attend: 0,
                    fans: 7924
                },
                {
                    id: 2,
                    pic: require("@/assets/images/icon.jpg"),
                    name: "七寸法师",
                    job: "python工程师",
                    attend: 0,
                    fans: 7924
                },
                {
                    id: 3,
                    pic: require("@/assets/images/icon.jpg"),
                    name: "七寸法师",
                    job: "python工程师",
                    attend: 0,
                    fans: 7924
                },
                {
                    id: 4,
                    pic: require("@/assets/images/icon.jpg"),
                    name: "七寸法师",
                    job: "python工程师",
                    attend: 0,
                    fans: 7924
                },
                {
                    id: 5,
                    pic: require("@/assets/images/icon.jpg"),
                    name: "七寸法师",
                    job: "python工程师",
                    attend: 0,
                    fans: 7924
                },
                {
                    id: 6,
                    pic: require("@/assets/images/icon.jpg"),
                    name: "七寸法师",
                    job: "python工程师",
                    attend: 0,
                    fans: 7924
                }
            ],
            attendText: []
        };
    },

    methods: {
        cancelAttend(index) {
            this.attendText.splice(
                index,
                1,
                this.attendText[index] === "已互关" ? "关注" : "已互关"
            );
        }
    },

    mounted() {
        this.attendText = new Array(this.fans.length).fill("关注");
    }
};
</script>


<style lang="stylus" scoped>
.fans {
    .fans_header {
        color: #787D82;
        font-size: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #d0d6d9;
        margin: 14px 20px 14px 12px;
    }

    .fans_content {
        display: flex;
        flex-wrap: wrap;

        .card_item {
            width: 23%;
            margin: 8px;

            .item_pic {
                display: inline-block;
                width: 50px;
                height: 50px;
                background-size: 100% 100%;
                border-radius: 50%;
                vertical-align: middle;
                cursor: pointer;
            }

            .item_about {
                display: inline-block;
                vertical-align: middle;
                line-height: 22px;
                margin-left: 20px;

                .item_name {
                    font-size: 16px;
                    font-weight: 600;
                    vertical-align: middle;
                }

                .item_job {
                    font-size: 12px;
                    color: #787D82;
                }
            }

            .item_other {
                margin: 5px 0 10px;
                color: #93999f;
                font-size: 12px;
                margin-left: 70px;

                .item_attend {
                    margin-right: 20px;
                }
            }

            .attendBtn, .moveBtn {
                display: inline-block;
                text-align: center;
                width: 80px;
                font-size: 12px;
                letter-spacing: 4px;
                padding: 8px 4px;
                color: #93999f;
                border: 1px solid;
                border-radius: 3px;
                cursor: pointer;
            }

            .attendBtn {
                color: #609eff;

                span {
                    transform: rotate(90deg) translate(2px, -4px);
                }
            }

            .moveBtn {
                margin-left: 16px;
                padding: 10px 4px;
            }
        }
    }
}</style>