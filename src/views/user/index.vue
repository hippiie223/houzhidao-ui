<template>
    <div class="user">
        <div class="user_header">
            <div class="user_icon" :style="'background-image: url(' + userInfo.pic + ')'"></div>
            <div class="user_info">
                <div class="info_name">{{userInfo.name}}</div>
                <div class="info_about">
                    <span class="info_gender">{{userInfo.gender}}</span>
                    <span class="info_province">{{userInfo.province}}</span>
                    <span class="info_city">{{userInfo.city}}</span>
                    <span class="info_university">{{userInfo.university}}</span>
                </div>
                <div class="info_signature">{{userInfo.signature}}</div>
            </div>
            <div class="user_extend">
                <div class="extend_phone">手机：{{userInfo.phone}}</div>
                <div class="extend_email">邮箱：{{userInfo.email}}</div>
                <span class="extend_attend">关注：{{userInfo.attend}}</span>
                <span class="extend_fans">粉丝：{{userInfo.fans}}</span>
            </div>
        </div>
        <div class="user_menu">
            <el-menu :default-active="path" active-text-color="#fff" router>
                <el-menu-item index="/user/home">
                    <i class="el-icon-demo iconfont">&#xe61c;</i>
                    <span slot="title">资 料</span>
                </el-menu-item>

                <el-menu-item index="/user/question">
                    <i class="el-icon-question"></i>
                    <span slot="title">问 答</span>
                </el-menu-item>
                <el-menu-item index="/user/exercise">
                    <i class="el-icon-demo iconfont">&#xe621;</i>
                    <span slot="title">刷 题</span>
                </el-menu-item>
                <el-menu-item index="/user/video">
                    <i class="el-icon-demo iconfont">&#xe60e;</i>
                    <span slot="title">课 程</span>
                </el-menu-item>
                <el-menu-item index="/user/attend">
                    <i class="el-icon-demo iconfont">&#xe641;</i>
                    <span slot="title">关 注</span>
                </el-menu-item>
                <el-menu-item index="/user/fans">
                    <i class="el-icon-demo iconfont">&#xe650;</i>
                    <span slot="title">粉 丝</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="user_content">
            <router-view @changePath="changePath"></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            userInfo: {
                pic: require("../../assets/images/icon.jpg"),
                name: "正在进化的程序猿丶",
                gender: "男",
                province: "湖北",
                city: "武汉",
                university: "武汉理工大学",
                signature: "好好学习，天天向上！",
                phone: "15281821220",
                email: "421273197@qq.com",
                attend: "12",
                fans: "10"
            },
            path: "/user/home"
        };
    },

    methods: {
        // 改变路由
        changePath(newPath) {
            this.path = newPath;
        }
    },

    mounted() {
        this.pathname = location.pathname;
    }
};
</script>

<style lang="stylus" scoped>
.user {
    .user_header {
        background: url('../../assets/images/bg.png');
        height: 196px;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 0 30px;
        color: #fff;

        .user_icon {
            width: 148px;
            height: 148px;
            background-size: 100% 100%;
            border-radius: 50%;
            margin-right: 20px;
        }

        .user_info {
            flex: 1;

            .info_name {
                font-size: 24px;
                font-weight: 600;
                line-height: 28px;
            }

            .info_about {
                margin: 10px 0;
                font-size: 14px;

                .info_gender, .info_province, .info_city {
                    margin-right: 10px;
                }
            }

            .info_signature {
                word-break: break-all;
                word-wrap: break-word;
                opacity: 0.6;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }

        .user_extend {
            font-size: 18px;
            opacity: 0.6;
            margin-right: 100px;
            cursor: pointer;

            .extend_email {
                margin: 10px 0;
            }

            .extend_fans {
                margin-left: 30px;
            }
        }
    }

    .user_menu {
        float: left;
        width: 170px;
        margin: 20px 0 0 20px;
        font-size: 24px;

        & >>> .el-menu-item {
            font-size: 16px;
            line-height: 48px;
            color: #787d82;
            position: relative;
            margin: 8px 0;
        }

        & >>> .is-active {
            background-color: #409EFF;
            border-radius: 8px 0 0 8px;

            &:after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 0;
                height: 0;
                border-top: 28px solid #f8fafc;
                border-bottom: 28px solid #f8fafc;
                border-left: 20px solid transparent;
            }
        }
    }

    .user_content {
        margin: 20px 0 0 220px;
    }
}
</style>