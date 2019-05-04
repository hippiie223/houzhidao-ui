<template>
    <div class="ask">
        <h2>提问</h2>
        <div class="left">
            <div class="mode" @click="changeMode">
                <span :class="markdownMode === 'markdown' ? 'active'  : '' ">Markdown</span>
                <span :class="markdownMode === 'wysiwyg' ? 'active'  : '' ">所见即所得</span>
            </div>
            <el-input placeholder="请简要概况你的问题，不低于5个字" v-model="question.title"></el-input>
            <markdown-editor
                v-model="markdownContent"
                :language="'zh_CN'"
                :mode="markdownMode"
                class="markdown"
                ref="markdown"
                height="auto"
                placeholder="请详细描述内容（选填）"
            />
            <el-button>提交问题</el-button>
        </div>
        <div class="right">
            <h4>选择问题标签，最多选择3个</h4>
            <el-tag type="info" v-for="tag in qtags" :key="tag" @click="selectTag(tag)">{{tag}}</el-tag>
            <h4>已选择标签</h4>
            <el-tag
                type="success"
                v-for="(tag,index) in selectedTag"
                :key="index"
                closable
                @close="cancelTag(tag)"
            >{{tag}}</el-tag>
        </div>
    </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import qtags from "@/constant/qtags";
export default {
    data() {
        return {
            markdownContent: "",
            markdownMode: "wysiwyg",
            selectedTag: [],
            question: {
                title: "",
                content: ""
            },
            qtags
        };
    },

    components: {
        MarkdownEditor
    },

    methods: {
        test() {
            console.log(111111);
            this.markdownContent = "";
        },

        changeMode() {
            this.markdownMode =
                this.markdownMode === "markdown" ? "wysiwyg" : "markdown";
        },

        selectTag(tag) {
            if (this.selectedTag.length < 3) {
                this.selectedTag.push(tag);
            }
        },

        cancelTag(tag) {
            this.selectedTag.splice(this.selectedTag.indexOf(tag), 1);
        }
    }
};
</script>

<style lang="stylus" scoped>
.ask {
    margin: 40px;
    display: flex;

    h2 {
        margin: 0;
    }

    .left {
        margin: 0 40px;
        flex: 1;

        .mode {
            text-align: center;
            margin-bottom: 20px;

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
                background: #1FAD4E;
            }
        }

        >>> .el-input {
            margin-bottom: 20px;
        }

        >>> .el-button {
            background: #1FAD4E;
            color: #FFFFFF;
            float: right;
            margin-top: 20px;
            letter-spacing: 2px;
        }
    }

    .right {
        width: 240px;

        >>> .el-tag {
            margin: 5px;
            cursor: pointer;
        }
    }
}
</style>

