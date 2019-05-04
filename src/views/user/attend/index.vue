<template>
    <div class="attend">
        <div class="attend_header">我的关注({{attends.length}})</div>
        <div class="attend_content">
            <el-card v-for="(item,index) in attends" :key="item.id" class="card_item">
                <div class="item_pic" :style="'background-image:url(' + item.pic + ')'"></div>
                <div class="item_about">
                    <div class="item_name">{{item.name}}</div>
                    <div class="item_job">{{item.job}}</div>
                </div>
                <div class="item_other">
                    <span class="item_attend">关注 {{item.attend}}</span>
                    <span class="item_fans">粉丝 {{item.fans}}</span>
                </div>
                <div
                    class="attendBtn"
                    :class="attendText[index] === '已关注' ? 'el-icon-check' : 'el-icon-plus'"
                    @click="cancelAttend(index)"
                >{{attendText[index]}}</div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAttend: true,
            attends: [
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
                    attend: 4,
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
                this.attendText[index] === "已关注" ? "关注" : "已关注"
            );
        }
    },

    mounted() {
        this.attendText = new Array(this.attends.length).fill("已关注");
    }
};
</script>

<style lang="stylus" scoped>
.attend {
    .attend_header {
        color: #787D82;
        font-size: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #d0d6d9;
        margin: 14px 20px 14px 12px;
    }

    .attend_content {
        display: flex;
        flex-wrap: wrap;

        .card_item {
            width: 22%;
            margin: 12px;

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
                margin: 10px 0;
                color: #93999f;
                font-size: 12px;
                margin-left: 70px;

                .item_attend {
                    margin-right: 20px;
                }
            }

            .attendBtn {
                text-align: center;
                width: 80px;
                font-size: 12px;
                letter-spacing: 4px;
                padding: 8px;
                color: #93999f;
                border: 1px solid;
                border-radius: 3px;
                margin-left: 70px;
                cursor: pointer;
            }

            >>> .el-icon-plus {
                color: #609eff;
            }
        }
    }
}
</style>

