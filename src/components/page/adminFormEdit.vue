<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>会员编辑</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" :rules="rules" size="null" label-width="100px">
                                <el-form-item label="用户名" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="用户帐号" prop="account">
                                    <el-input v-model="form.account" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="登录密码">
                                    <el-input v-model="form.password"></el-input>
                                </el-form-item>
                                <el-form-item label="类型" prop="type">
                                    <el-radio-group v-model="form.type">
                                        <el-radio :disabled="disabled" label="0">普通账号</el-radio>
                                        <el-radio :disabled="disabled" label="1">测试账号</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <div v-if="form.type == 0">
                                    <el-form-item label="剩余天数" prop="days">
                                        <el-input v-model="form.days" disabled="disabled">
                                            <template slot="append">天</template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="增加天数" prop="daysX">
                                        <el-input v-model="form.daysX">
                                            <template slot="append">天</template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="剩余金币">
                                        <el-input v-model="form.goldCoin" disabled="disabled">
                                            <template slot="append">个</template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="增加金币">
                                        <el-input v-model="form.goldCoinX"></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item label="添加域名" >
                                        <el-input v-model="form.url"></el-input>
                                    </el-form-item> -->
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
import { adminAccountSearch, adminAccounEdit } from '../../api/index';
export default {
    name: 'adminFormEdit',
    data() {
        return {
            disabled: false,
            form: {
                id: '',
                name: '',
                account: '',
                password: '',
                type: '0',
                days: '',
                daysX: '',
                url: '',
                goldCoin: '',
                goldCoinX: ''
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
    created () {
        this.getData(this.$route.query.id)
    },
    comments () {
        
    },
    methods: {
        getData(id) {
            let that = this
            adminAccountSearch(id).then(res => {
                if (res.data.type == 0) {
                    that.disabled = true
                } else {
                    that.disabled = false
                }
                that.form = {
                    id: res.data.id,
                    name: res.data.name,
                    account: res.data.account,
                    password: res.data.passwd,
                    type: `${res.data.type}`,
                    days: res.data.days,
                    // url: res.data.domainName,
                    goldCoin: res.data.goldCoin
                }
            }).catch(err => {
                that.$message.error(err)
            })
        },
        onSubmit() {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    let data = {
                        id: that.form.id,
                        name: that.form.name,
                        account: that.form.account,
                        passwd: that.form.password,
                        days: that.form.daysX,
                        type: that.form.type,
                        // domainName: that.form.url,
                        goldCoin: that.form.goldCoinX
                    }
                    adminAccounEdit(data).then(res => {
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
            this.$store.dispatch('name', this.$route);
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