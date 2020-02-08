<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>新增会员</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" :rules="rules" size="null" label-width="100px">
                                <el-form-item label="用户名" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="用户帐号" prop="account">
                                    <el-input v-model="form.account"></el-input>
                                </el-form-item>
                                <el-form-item label="登录密码" prop="password">
                                    <el-input v-model="form.password"></el-input>
                                </el-form-item>
                                <el-form-item label="类型">
                                    <el-radio-group v-model="form.type">
                                    <el-radio label="0">普通账号</el-radio>
                                    <el-radio label="1">测试账号</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <div v-if="form.type == 0">
                                    <el-form-item label="增加天数" prop="days">
                                        <el-input v-model="form.days">
                                            <template slot="append">天</template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="增加金币">
                                        <el-input v-model="form.goldCoin"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否加群">
                                        <el-checkbox v-model="form.canAddGroup"></el-checkbox>
                                    </el-form-item>
                                </div>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">提交保存</el-button>
                                    <el-button @click="resetForm">取消</el-button>
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
import { adminAdd } from '../../api/index';
export default {
    name: 'adminFormAdd',
    data() {
        return {
            form: {
                name: '',
                account: '',
                password: '',
                type: '0',
                days: 0,
                url: '',
                goldCoin: 0,
                canAddGroup: false
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                days: [{ required: true, message: '请输入天数', trigger: 'blur' }],
                url: [{ required: true, message: '请输入域名', trigger: 'blur' }]
            },
        };
    },
    methods: {
        onSubmit() {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    let data = {
                        name: that.form.name,
                        account: that.form.account,
                        passwd: that.form.password,
                        type: that.form.type,
                        days: that.form.type == 0?that.form.days:0,
                        canAddGroup: that.form.canAddGroup?1:0,
                        goldCoin: that.form.type == 0?that.form.goldCoin:0
                    }
                    adminAdd(data).then(res => {
                        if (res.code === 0) {
                            that.$message.success(res.data)
                            that.resetForm()
                        } else {
                            that.$message.error(res.message)
                        }
                    }).catch(err => {
                        that.$message.error(err)
                    })
                }
            })
        },
        resetForm() {
            this.$refs.form.resetFields();
            setTimeout(() => {
                this.$router.go(-1)
            }, 500);
        }
    }
};
</script>
<style scoped>
.top-flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>