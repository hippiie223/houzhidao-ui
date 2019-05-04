<template>
    <div>
        <video-player
            :options="playerOptions"
            ref="videoPlayer"
            @loadeddata="onPlayerLoadeddata"
            @ended="onPlayerEnded"
            :playsinline="true"
        ></video-player>
        <el-button @click="bofang">播放</el-button>
        <el-slider v-model="currentTime" :max="durationTime" :step="0.1" size="mini"></el-slider>
        <!-- <el-progress :percentage="percentage" :show-text="false"></el-progress> -->
        <div>{{Math.round(currentTime)}} / {{Math.round(durationTime)}}</div>
        <el-button @click="zanting">暂停</el-button>
    </div>
</template> 

<script>
export default {
    data() {
        return {
            timer: "",
            player: "",
            durationTime: 0,
            currentTime: 0,
            playerOptions: {
                muted: false,
                language: "zh-CN",
                playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                height: "360",
                sources: [
                    {
                        type: "video/mp4",
                        src:
                            'https://www.runoob.com/try/demo_source/mov_bbb.mp4'
                    }
                ],
                autoplay: false,
                controls: true,
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                }
            }
        };
    },

    computed: {
        // player() {
        //     return this.$refs.videoPlayer.player;
        // }
        percentage() {
            return (this.currentTime / this.durationTime) * 100 || 0;
        }
    },

    methods: {
        bofang() {
            this.currentTime = this.player.currentTime();
            this.timer = setInterval(() => {
                this.currentTime = this.player.currentTime();
            }, 1000);

            this.player.play();
        },

        zanting() {
            clearInterval(this.timer);
            this.player.pause();
        },

        // 视频数据加载完毕
        onPlayerLoadeddata() {
            this.player = this.$refs.videoPlayer.player;
            // 获取视频的总时间
            this.durationTime = this.player.duration();
        },

        // 视频播放结束了
        onPlayerEnded() {
            clearInterval(this.timer);
            this.currentTime = this.player.currentTime();
        }
    },

    mounted() {}
};
</script>

<style lang="stylus" scoped>
>>> .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 2em;
    height: 2em;
    line-height: 2em;
}

>>> .el-progress {
    width: 40%;

    .el-progress-bar__inner {
        transition: width 0.1s linear;
    }
}

>>> .el-slider {
    width: 40%;
    transition: all 1s linear;

    .el-slider__bar, .el-slider__button-wrapper {
        transition: all 1s linear;
    }
}
</style>
