<template>
    <div class="video">
        <div class="video_header">我的课程({{videos.length}})</div>
        <div class="my_video">
            <el-timeline v-if="videos.length > 0">
                <el-timeline-item
                    v-for="item in videos"
                    :key="item.id"
                    :timestamp="item.time"
                    color="#409EFF"
                    placement="top"
                >
                    <el-card>
                        <div class="item_pic" :style="'background-image:url(' + item.picture +')'"></div>
                        <div class="item_about">
                            <div class="item_name">{{item.name}}</div>
                            <div class="item_studyInfo">
                                <span class="study_process">已学习 {{item.studyProcess}}</span>
                                <span class="study_time">用时 {{item.studyTime}}</span>
                                <span class="study_last">学习到 {{item.studyLast}}</span>
                            </div>
                            <div class="item_classInfo">
                                <div class="class_level">难度 {{item.diffculty}}</div>
                                <div class="class_pageView">
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
                        </div>
                        <div class="item_btn">继续学习</div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <div v-else class="no_question">
                你暂时还没有学习过任何课程，可以先去
                <span>课程学习区</span>看看
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            videos: [
                {
                    id: 1,
                    name: "JavaScript版 数据结构与算法",
                    time: "2018-3-12",
                    picture: require("@/assets/images/js.jpg"),
                    studyProcess: "20%",
                    studyTime: "24分钟",
                    studyLast:
                        "6-2 学生选课---判断 Set 中课程是否存在城市深发撒",
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 2,
                    name:
                        "Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                    time: "2018-3-12",
                    picture: require("@/assets/images/java.jpg"),
                    studyProcess: "40%",
                    studyTime: "56分钟",
                    studyLast: "6-2 学生选课---判断 Set 中课程是否存在阿大城市",
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 3,
                    name: "Docker+Kubernetes(k8s)微服务容器化实践",
                    time: "2018-4-12",
                    picture: require("@/assets/images/docker.jpg"),
                    studyProcess: "60%",
                    studyTime: "1小时14分钟",
                    studyLast:
                        "6-2 学生选课---判断 Set 中课程是否存在等到你司农",
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                },
                {
                    id: 4,
                    name: "Git 入门",
                    time: "2018-3-17",
                    picture: require("@/assets/images/git.jpg"),
                    studyProcess: "80%",
                    studyTime: "1小时45分钟",
                    studyLast: "6-2 学生选课---判断 Set 中课程是否存在撒AC阿萨",
                    diffculty: "A",
                    number: 3614,
                    grade: 5
                }
            ]
        };
    },
    mounted() {
        this.$emit("changePath", "/user/video");
    }
};
</script>


<style lang="stylus" scoped>
.video {
    .video_header {
        color: #787D82;
        font-size: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #d0d6d9;
        margin: 14px 20px 14px 12px;
    }

    .my_video {
        padding-top: 20px;

        >>> .el-timeline-item__tail {
            border-left-color: #409EFF;
        }

        >>> .el-card {
            margin-right: 50px;

            .el-card__body {
                display: flex;
                position: relative;

                .item_pic {
                    width: 200px;
                    height: 120px;
                    background-size: 100% 100%;
                    margin-right: 20px;
                }

                .item_about {
                    margin-top: 6px;
                    width: 500px;

                    .item_name, .item_studyInfo, .item_classInfo {
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }

                    .item_name {
                        font-size: 20px;
                        font-weight: 600;
                    }

                    .item_studyInfo {
                        font-size: 14px;
                        color: #787D82;
                        margin: 20px 0;

                        .study_process {
                            color: #f01400;
                        }

                        .study_time {
                            margin: 0 20px;
                        }

                        .study_last {
                        }
                    }

                    .item_classInfo {
                        font-size: 14px;
                        color: #787D82;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .class_pageView {
                            flex: 1;
                            text-align: center;
                        }
                    }
                }

                .item_btn {
                    width: 100px;
                    height: 40px;
                    border: 1px solid;
                    color: #409EFF;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                    letter-spacing: 2px;
                    border-radius: 4px;
                    position: absolute;
                    bottom: 30px;
                    right: 24px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>