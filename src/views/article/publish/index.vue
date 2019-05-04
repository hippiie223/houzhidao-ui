<template>
    <div class="publish">
        <div class="mode" @click="changeMode">
            <span :class="markdownMode === 'markdown' ? 'active'  : '' ">Markdown</span>
            <span :class="markdownMode === 'wysiwyg' ? 'active'  : '' ">所见即所得</span>
        </div>
        <el-card>
            <el-input placeholder="文章标题" v-model="article.title"></el-input>
            <markdown-editor
                v-model="content"
                :language="'zh_CN'"
                :mode="markdownMode"
                class="markdown"
                ref="markdown"
                height="auto"
            />
        </el-card>
        <el-button type="primary" @click="publish">发布</el-button>
    </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import { mapState } from "vuex";
export default {
    data() {
        return {
            content: "",
            markdownMode: "wysiwyg",
            article: {
                title: "",
                content: "",
                author: "",
                time: ""
            }
        };
    },

    components: {
        MarkdownEditor
    },

    computed: {
        ...mapState({
            userInfo: state => state.user.info
        })
    },

    methods: {
        publish() {
            this.article.author = this.userInfo.name;
            this.article.content = this.$refs.markdown.getHtml();
            this.article.time = new Date().getTime();

            console.log(this.article);
        },

        changeMode() {
            this.markdownMode =
                this.markdownMode === "markdown" ? "wysiwyg" : "markdown";
        }
    },

    mounted() {}
};
</script>

<style lang="stylus" scoped>
.publish {
    padding: 20px 30px;
    position: relative;

    .mode {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translate(-50%);

        span {
            display: inline-block;
            padding: 10px 15px;
            margin: 0 20px;
            letter-spacing: 2px;
            color: #93999f;
            border-radius: 8px;
            cursor: pointer;
        }

        .active {
            color: #fff;
            background: #93999f;
        }
    }

    >>> .el-card {
        width: 70%;
        margin: 60px auto 0px;

        .el-input {
            padding-bottom: 20px;
        }
    }

    >>> .el-button {
        position: absolute;
        top: 20px;
        right: 60px;
    }
}
</style>
