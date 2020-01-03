<template>
    <div>
       <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>修改密码</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" size="null" label-width="80px">
                                <el-form-item label="原始密码">
                                    <el-input v-model="form.password"></el-input>
                                </el-form-item>
                                <el-form-item label="修改密码">
                                    <el-input v-model="form.revise"></el-input>
                                </el-form-item>
                                <el-form-item label="确认修改">
                                    <el-input v-model="form.revises"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">确认修改</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { adminPasswordEdit } from '../../api/index';
export default {
    name: 'adminRevise',
    data() {
        return {
            form: {
                password: '',
                revise: '',
                revises: '',
            }
        };
    },
    methods: {
        onSubmit() {
            let that = this
            let data = {
                originalPwd: that.form.password,
                newPwd: that.form.revises
            }
            if (that.form.revise !== that.form.revises) {
                that.$message.warning('两次输入的密码不一致')
                return false
            }
            adminPasswordEdit(data).then(res => {
                if (res.code === 0) {
                    that.$message.success(res.data)
                } else {
                    that.$message.error(res.message)
                }
            }).catch(err => {
                that.$message.error(err)
            })
        }
    }
};
</script>

<style>
</style>