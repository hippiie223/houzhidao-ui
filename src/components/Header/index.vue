<template>
    <div>
        <!-- 头部tab -->
        <div class="container">
            <div class="tab logo"></div>
            <div class="tab" :class="{'tabSel' : tab.home}" @click="goModule('home')">猴指导</div>
            <div class="tab" :class="{'tabSel' : tab.article}" @click="goModule('article')">文章资讯</div>
            <div class="tab" :class="{'tabSel' : tab.topic}" @click="goModule('topic')">话题广场</div>
            <div class="tab" :class="{'tabSel' : tab.question}" @click="goModule('question')">问答讨论</div>
            <div class="tab" :class="{'tabSel' : tab.exercise}" @click="goModule('exercise')">在线刷题</div>
            <div class="tab" :class="{'tabSel' : tab.video}" @click="goModule('video')">视频学习</div>
            <div class="black"></div>

            <!-- 登录状态下 -->
            <template v-if="token">
                <el-popover trigger="hover" width="100" popper-class="pop">
                    <div class="personal" @click="goPersonalInfo">
                        <span class="iconfont">&#xe659;</span>
                        个人中心
                    </div>
                    <div class="exercise" @click="goPersonalExercise">
                        <span class="iconfont">&#xe606;</span>
                        我的题库
                    </div>
                    <div class="video" @click="goPersonalVideo">
                        <span class="iconfont">&#xe604;</span>
                        课程管理
                    </div>
                    <div class="quit">
                        <span class="iconfont">&#xe6f7;</span>
                        安全退出
                    </div>
                    <div slot="reference" class="user">
                        <div class="userIcon" :style="'background-image: url('+ userInfo.icon +')'"></div>
                        <div class="userName">{{userInfo.name}}</div>
                    </div>
                </el-popover>
            </template>

            <!-- 未登录状态下 -->
            <template v-else>
                <div class="tab" @click="showPwdLogin">登录</div>
                <div class="tab" @click="showRegister">注册</div>
            </template>
        </div>

        <!-- 登录注册弹框 -->
        <el-dialog
            :title="dialogTitle"
            :visible="pwdLoginVisible || msgCodeLoginVisible || registerVisible || retrievePwdVisible"
            :before-close="handleClose"
            width="30%"
            center
        >
            <!-- 密码、验证码登录框 -->
            <template v-if="pwdLoginVisible || msgCodeLoginVisible">
                <el-form v-model="loginForm">
                    <template v-if="pwdLoginVisible">
                        <el-input v-model="loginForm.username" placeholder="输入用户名"/>
                        <el-input
                            v-model="loginForm.password"
                            placeholder="输入密码"
                            show-password
                            class="interval"
                        />
                    </template>
                    <template v-if="msgCodeLoginVisible">
                        <el-input v-model="loginForm.userphone" placeholder="输入手机号"/>
                        <el-form-item class="interval">
                            <el-input
                                v-model="registerForm.messageCode"
                                placeholder="短信验证码"
                                class="messageCode"
                            />
                            <el-button type="primary" class="messageCodeBtn">获取验证码</el-button>
                        </el-form-item>
                    </template>
                    <el-button style="width:100%" type="primary" plain @click="login">立 即 登 录</el-button>
                    <span class="forgetPwd" @click="showRetrievePwd">忘记密码</span>
                    <span
                        class="messageAuth"
                        @click="changeLogin"
                    >{{pwdLoginVisible ? '短信验证码登录' : '密码登录'}}</span>
                </el-form>
                <span slot="footer" class="dialog-footer" @click="showRegister">————— 立即注册 —————</span>
            </template>

            <!-- 找回密码框、注册框 -->
            <template v-if="registerVisible || retrievePwdVisible">
                <el-form v-model="registerForm">
                    <el-input :model="registerForm.userphone" placeholder="手机号"/>
                    <el-input
                        v-model="registerForm.onePwd"
                        placeholder="密码(不少于6位)"
                        show-password
                        class="interval"
                    />
                    <el-input
                        v-model="registerForm.twoPwd"
                        placeholder="重复输入密码(不少于6位)"
                        show-password
                    />
                    <el-form-item class="interval">
                        <el-input
                            v-model="registerForm.messageCode"
                            placeholder="短信验证码"
                            class="messageCode"
                        />
                        <el-button type="primary" class="messageCodeBtn">获取验证码</el-button>
                    </el-form-item>
                    <el-button
                        style="width:100%"
                        type="primary"
                        plain
                        @click="register"
                    >{{retrievePwdVisible ? '立 即 找 回' : '立 即 注 册'}}</el-button>
                </el-form>
                <span
                    slot="footer"
                    class="dialog-footer"
                    @click="showPwdLogin"
                >——— {{retrievePwdVisible ? '返回登录' : '我已注册，去登陆'}} ———</span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "Head",
    data() {
        return {
            pwdLoginVisible: false, // 密码登录框是否显示
            msgCodeLoginVisible: false, // 验证码登录框是否显示
            registerVisible: false, // 注册框是否显示
            retrievePwdVisible: false, // 找回密码框是否显示
            dialogTitle: "", // 显示框的标题
            loginForm: {
                username: "",
                password: "",
                userphone: ""
            },
            registerForm: {
                userphone: "",
                onePwd: "",
                twoPwd: "",
                messageCode: ""
            },
            userInfo: {
                icon: require("../../assets/images/icon.jpg"),
                name: "正在进化的程序猿丶"
            }
        };
    },
    computed: {
        ...mapState({
            tabName: state => state.head.tabName
        }),

        // 判断用户是否登录，token存在则登录，否则未登录
        token() {
            return true;
            // return document.cookie.indexOf("token") !== -1;
        },

        tab() {
            return {
                home: this.tabName === "home",
                article: this.tabName === "article",
                topic: this.tabName === "topic",
                question: this.tabName === "question",
                exercise: this.tabName === "exercise",
                video: this.tabName === "video"
            };
        }
    },
    methods: {
        ...mapMutations({
            changeTabName: "head/SET_TABNAME"
        }),

        // 显示密码登录框
        showPwdLogin() {
            console.log("密码登录显示");
            this.dialogTitle = "登 录 猴 指 导";
            this.msgCodeLoginVisible = false;
            this.retrievePwdVisible = false;
            this.registerVisible = false;
            this.pwdLoginVisible = true;
        },

        // 登录模式改变(验证码登录和密码登录)
        changeLogin() {
            console.log("登录模式改变");
            this.pwdLoginVisible = !this.pwdLoginVisible;
            this.msgCodeLoginVisible = !this.msgCodeLoginVisible;
        },

        // 显示注册框
        showRegister() {
            console.log("开始注册");
            this.dialogTitle = "注 册 猴 指 导";
            this.pwdLoginVisible = false;
            this.msgCodeLoginVisible = false;
            this.registerVisible = true;
        },

        // 显示找回密码框
        showRetrievePwd() {
            console.log("找回密码");
            this.dialogTitle = "找 回 密 码";
            this.pwdLoginVisible = false;
            this.msgCodeLoginVisible = false;
            this.retrievePwdVisible = true;
        },

        // 登录(短信或者验证码)
        login() {
            console.log("登录");
            console.log(this.loginForm);
        },

        // 注册
        register() {
            console.log("注册");
            console.log(this.registerForm);
        },

        // 关闭弹窗之前，清空字段信息
        handleClose() {
            console.log("关闭弹窗之前");
            this.dialogTitle = "";
            this.pwdLoginVisible = false;
            this.msgCodeLoginVisible = false;
            this.retrievePwdVisible = false;
            this.registerVisible = false;
        },

        goModule(name) {
            console.log("跳转到" + name + "模块");
            this.$router.push(name === "home" ? "/" : "/" + name);
            this.changeTabName(name);
        },

        // 跳转个人信息中心
        goPersonalInfo() {
            console.log("跳转个人信息中心");
            this.$router.push("/user/home");
            this.changeTabName("home");
        },

        // 跳转个人刷题中心
        goPersonalExercise() {
            console.log("跳转个人刷题中心");
            this.$router.push("/user/exercise");
            this.changeTabName("home");
        },

        // 跳转个人视频中心
        goPersonalVideo() {
            console.log("跳转个人视频中心");
            this.$router.push("/user/video");
            this.changeTabName("home");
        },

        // 退出登录
        qutiLogin() {
            console.log("退出登录");
        }
    }
};
</script>

<style lang="stylus" scoped>
.container {
    display: flex;
    height: 56px;
    line-height: 56px;
    background-color: #111;
    padding-right: 25px;
    color: #999;

    .tab {
        margin: 0 25px;
        cursor: pointer;
    }

    .tab:hover {
        color: #fff;
    }

    .tabSel {
        color: #fff;
        font-size: 18px;
    }

    .logo {
        background-image: url('../../assets/images/logo.png');
        width: 36px;
        height: 36px;
        background-size: 100% 100%;
        margin-right: -20px;
        margin-top: 10px; 
    }

    .black {
        flex: 1;
    }

    .user {
        cursor: pointer;

        .userIcon {
            display: inline-block;
            width: 36px;
            height: 36px;
            background-size: 100% 100%;
            vertical-align: middle;
            border-radius: 50% 50%;
            margin-right: 10px;
        }

        .userName {
            display: inline-block;
        }
    }
}

.personal, .exercise, .video {
    border-bottom: solid #ccc 1px;
    padding: 10px 0;
    cursor: pointer;
}

.quit {
    padding-top: 10px;
    cursor: pointer;
}

.iconfont {
    font-size: 24px;
    vertical-align: middle;
    margin-right: 4px;
}

form {
    padding: 0 40px !important;

    .interval {
        margin: 20px 0;
    }

    .messageCode {
        width: 140px;
        display: inline-block;

        >>> input {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
    }

    .messageCodeBtn {
        display: inline-block;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    span {
        margin-top: 8px;
        cursor: pointer;
    }

    .forgetPwd {
        float: left;
    }

    .messageAuth {
        float: right;
    }
}

.dialog-footer {
    color: #999;
    cursor: pointer;
}
</style>
