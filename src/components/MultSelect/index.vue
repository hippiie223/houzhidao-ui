<template>
    <el-card>
        <div v-for="(item,index) in level" :key="index" class="item">
            <span class="title">{{item}} :</span>
            <span
                v-for="(name,i) in levelName[index]"
                :key="i"
                class="subItem"
                :class="i === tabIndex[index] ? 'on':''"
                :style="i === tabIndex[index] ? 'background:' + color : ''"
                @click="changeTab(index,i,name)"
            >{{name}}</span>
        </div>
    </el-card>
</template>

<script>
import allLevel from "@/constant/level";
export default {
    props: ["color"],
    data() {
        return {
            tabIndex: [0, 0, 0]
        };
    },
    computed: {
        level() {
            return ["方 向", "分 类", "难 度"];
        },
        levelName() {
            const first = ["全部"].concat(Object.keys(allLevel));
            const array = Object.values(allLevel).reduce(
                (total, value, index) => {
                    return total.concat(value);
                },
                ["全部"]
            );
            const two =
                this.tabIndex[0] === 0
                    ? array
                    : ["全部"].concat(
                          Object.values(allLevel)[this.tabIndex[0] - 1]
                      );
            const three = ["全部", "初级", "中级", "高级"];
            return [first, two, three];
        }
    },
    methods: {
        changeTab(index, i, name) {
            // 如果改变的是第一行，则第二行归0
            if (index === 0) {
                this.tabIndex.splice(1, 1, 0);
            }

            // 改变的是第二行并且第一行选中的是全部,第一行的也要对应改变
            if (index === 1 && this.tabIndex[0] === 0) {
                const array = Object.values(allLevel);
                for (let j = 0; j < array.length; j++) {
                    if (array[j].includes(name)) {
                        this.tabIndex.splice(0, 1, j + 1);
                        break;
                    } else {
                        i = i - array[j].length;
                    }
                }
            }
            this.tabIndex.splice(index, 1, i);
        }
    }
};
</script>

<style lang="stylus" scoped>
.item {
    margin: 10px 0;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin-right: 10px;
    }

    .subItem {
        margin: 0 4px;
        display: inline-block;
        padding: 6px 16px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .on {
        color: #fff;
        border-radius: 8px;
    }
}
</style>
