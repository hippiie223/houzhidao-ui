<template>
    <div class="exercise">
        <div class="header">
            <span class="iconfont">&#xe621;</span>
            数据结构 / 武汉理工大学2019届数据结构期末试卷
        </div>
        <el-card class="main">
            <div class="progress">
                <el-progress
                    color="#25BB9B"
                    :stroke-width="18"
                    :percentage="percentage"
                    :show-text="false"
                ></el-progress>
                <div class="progressText">{{finishNum}} / {{exercise.length}}</div>
                <div class="iconfont" @click="clock">{{status === 'stop' ? '&#xe76b;' : '&#xe8a3;'}}</div>
                <div class="time">{{downTime}}</div>
            </div>
            <div class="content">
                <div class="mark">单选题</div>
                <div class="topic">{{index+1}}、{{exercise[index].topic}}</div>
                <el-radio-group v-model="answer.result[index]">
                    <el-radio
                        v-for="(option,index) in exercise[index].options"
                        :key="index"
                        :label="index+1"
                        border
                    >{{option}}</el-radio>
                </el-radio-group>
                <div class="button">
                    <el-button class="submit" @click="submitExercise(exercise.id)">提前交卷</el-button>
                    <el-button class="pre" @click="preTopic" v-if="index !== 0">上一题</el-button>
                    <el-button
                        class="next"
                        @click="nextTopic"
                        v-if="index !== exercise.length-1"
                    >下一题</el-button>
                </div>
            </div>
            <div class="unfold" @click="isUnfold = !isUnfold">
                {{isUnfold ? '收起' : '展开'}}答题卡
                <span
                    :class="'el-icon-arrow-' + (isUnfold ? 'up' : 'down')"
                ></span>
            </div>
            <div class="answerSheet" v-show="isUnfold">
                <div
                    class="item"
                    v-for="(item,i) in exercise.length"
                    :key="i"
                    :class="[i === index ? 'on':'', {'finished' : answer.result[i] && i !== index}]"
                    @click="jumpTopic(i)"
                >{{i + 1}}</div>
            </div>
        </el-card>

        <el-dialog></el-dialog>
    </div>
</template>
<script>
import exercise from "@/constant/exercise";
export default {
    data() {
        return {
            remainTime: 1200, //剩余时间 s为单位 默认20分钟
            timer: null,
            status: "start",
            index: 0,
            isUnfold: true,
            exercise,
            answer: {
                result: []
            }
        };
    },

    computed: {
        downTime() {
            let hour = "00";
            let minute = "00";
            let second = "00";
            if (this.remainTime > 0) {
                hour = (Math.floor(this.remainTime / 60 / 60) + "").padStart(
                    2,
                    "0"
                );
                minute = (
                    Math.floor((this.remainTime / 60) % 60) + ""
                ).padStart(2, "0");
                second = (Math.floor(this.remainTime % 60) + "").padStart(
                    2,
                    "0"
                );
            } else {
                console.log("时间到了");
                clearInterval(this.timer);
            }
            return hour + ":" + minute + ":" + second;
        },
        finishNum() {
            return this.answer.result.filter(item => item).length;
        },
        percentage() {
            return (this.finishNum / this.exercise.length) * 100;
        }
    },

    methods: {
        clock() {
            if (this.timer && this.status === "stop") {
                clearInterval(this.timer);
                this.status = "start";
            } else if (this.status === "start") {
                this.timer = setInterval(() => {
                    this.remainTime -= 1;
                }, 1000);
                this.status = "stop";
            }
        },

        // 下一题
        nextTopic() {
            this.index++;
        },

        // 上一题
        preTopic() {
            this.index--;
        },

        // 跳转到指定题目
        jumpTopic(index) {
            this.index = index;
        },

        // 提交试卷
        submitExercise(id = 1) {
            const self = this;
            const title =
                this.finishNum !== this.exercise.length
                    ? "你还有未完成的题目，"
                    : "";
            this.$alert(title + "是否提交试卷", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                    console.log(action);
                    if (action === "confirm") {
                        self.$router.push("/exercise/analysis/" + id);
                    }
                }
            });
        }
    },

    mounted() {
        this.clock();
    }
};
</script>

<style lang="stylus" scoped>
.exercise {
    margin: 20px 120px 0;

    .header {
        margin: 20px 0;
        color: #25BB9B;
    }

    >>> .el-card__body {
        padding: 30px 30px 10px;
    }

    .progress {
        display: flex;
        font-size: 20px;
        height: 32px;
        align-items: center;
        background: #000000dd;
        color: #fff;
        margin: -30px -30px 0;
        padding: 10px;

        >>> .el-progress {
            flex: 1;
        }

        .progressText {
            margin-left: 20px;
        }

        .time {
            letter-spacing: 2px;
        }

        .iconfont {
            font-size: 30px;
            color: #ff6600;
            cursor: pointer;
            margin-right: 10px;
            margin-left: 60px;

            &:hover {
                color: #ff0000;
            }
        }
    }

    .content {
        width: 100%;

        .mark {
            padding: 20px 0;
            border-bottom: 1px solid #eee;
        }

        .topic {
            padding: 20px 0;
        }

        >>> .el-radio-group {
            width: 100%;

            .el-radio {
                width: 100%;
                height: 48px;
                margin: 10px 0;
                line-height: 48px;
                padding: 0 20px;
                color: #333;
                font-size: 14px;

                .el-radio__input.is-checked+.el-radio__label {
                    color: #25BB9B;
                }

                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #25BB9B;
                    background-color: #25BB9B;
                }
            }

            .is-checked {
                border-color: #25BB9B;
            }
        }

        .button {
            text-align: right;
            margin-top: 10px;
            padding-bottom: 20px;
            border-bottom: 1px dashed #ccc;

            .submit {
                border-color: #FF6547;
                background-color: #FF6547;
                color: #FFF;
            }

            .pre, .next {
                border-color: #25BB9B;
                background-color: #25BB9B;
                color: #FFF;
            }
        }
    }

    .unfold {
        width: 120px;
        margin: 20px 0;
        cursor: pointer;
        letter-spacing: 2px;

        &:hover {
            color: #25BB9B;
        }
    }

    .answerSheet {
        display: flex;
        flex-wrap: wrap;

        .item {
            cursor: pointer;
            color: #ccc;
            width: 40px;
            height: 40px;
            line-height: 40px;
            margin: 10px;
            text-align: center;

            &:hover {
                color: #FFF;
                background: #25BB9B;
            }
        }

        .on {
            color: #fff;
            background: #25BB9B;
        }

        .finished {
            color: #25BB9B;
        }
    }
}
</style>

