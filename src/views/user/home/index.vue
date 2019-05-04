<template>
    <div class="info">
        <div class="info_header">
            <span class="text">个人信息</span>
            <span class="el-icon-edit editBtn" @click="editInfo">编辑个人信息</span>
        </div>
        <div class="info_form">
            <el-form ref="form" :model="form" label-width="100px" :disabled="isEdit">
                <el-form-item label="昵称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.gender">
                        <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-cascader :options="citys" v-model="form.address" separator=" "></el-cascader>
                </el-form-item>
                <el-form-item label="职业">
                    <el-cascader :options="jobs" v-model="form.jobs" separator=" "></el-cascader>
                </el-form-item>
                <el-form-item :label="form.jobs[0] === '在读学生' ? '学校' : '公司'">
                    <el-input v-model="form.organize"></el-input>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input v-model="form.signature" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEdit">
                    <el-button type="primary" @click="saveInfo">保存修改</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import citys from "@/constant/city.js";
import jobs from "@/constant/jobs.js";
export default {
    data() {
        return {
            form: {
                name: "正在进化的程序猿丶",
                gender: "男",
                jobs: ["在读学生", "大学", "软件工程"],
                phone: "15281821220",
                email: "421273197@qq.com",
                signature: "好好学习！天天向上！",
                address: ["湖北省", "武汉市", "洪山区"],
                organize: "武汉理工大学"
            },
            genders: [
                {
                    value: "0",
                    label: "男"
                },
                {
                    value: "1",
                    label: "女"
                },
                {
                    value: "2",
                    label: "保密"
                }
            ],
            jobs,
            citys,
            isEdit: true
        };
    },
    methods: {
        editInfo() {
            if (this.isEdit) {
                this.isEdit = false;
            } else {
                return;
            }
        },
        cancel() {
            this.isEdit = true;
        },
        saveInfo() {
            console.log(this.form);
        }
    },
    mounted() {
        this.$emit("changePath", "/user/home");
    }
};
</script>

<style lang="stylus" scoped>
.info {
    .info_header {
        font-size: 16px;
        line-height: 24px;
        height: 24px;
        padding: 10px;
        color: #07111b;
        margin-bottom: 10px;
        border-bottom: 1px solid #d0d6d9;

        &:after {
            content: '';
            display: block;
            clear: both;
        }

        .text {
            float: left;
        }

        .editBtn {
            float: right;
            margin-right: 40px;
            cursor: pointer;

            &:before {
                margin-right: 10px;
            }

            &:hover {
                color: #409EFF;
                opacity: 0.7;
            }
        }
    }

    .info_form {
        padding: 20px 60px;
        width: 60%;
        color: #07111b;

        & >>> .el-form-item {
            height: 48px;
        }

        & >>> .el-form-item__label {
            font-size: 18px;
            line-height: 48px;
            padding-right: 20px;
        }

        & >>> .el-input__inner, & >>> .el-cascader__label {
            font-size: 16px;
            line-height: 48px;
            height: 48px;
        }
    }
}
</style>
