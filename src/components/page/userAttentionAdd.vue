<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>新增关注</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" size="null" label-width="120px">
                                <el-form-item label="类型">
                                    <el-radio-group v-model="form.type" @change="onWx">
                                        <el-radio label="0">加好友</el-radio>
                                        <el-radio label="1">加公众号</el-radio>
                                        <el-radio label="2" v-if="qun == 1">加群</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <!-- <el-form-item label="二维码" v-if="form.type == 2">
                                    <img width="150" src="../../assets/img/tb2.png" alt="">
                                </el-form-item> -->
                                <el-form-item :label="tipWx" prop="wxAcc">
                                    <div class="input"> 
                                        <el-input v-model="form.wxAcc" :placeholder="tipP"></el-input>
                                        <!-- <el-input v-model="form.wxAcc" :disabled="form.type == 2?true:false" :placeholder="tipP"></el-input> -->
                                        <!-- <el-button v-if="form.type == 2" type="info" style="margin-left: 15px;">获取二维码</el-button> -->
                                    </div>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.gender" @change="onSix">
                                        <el-radio label="0">不限</el-radio>
                                        <el-radio label="1">男</el-radio>
                                        <el-radio label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <div class="line"></div>
                                <el-form-item label="设置总限量" prop="total">
                                    <el-input v-model="form.total" placeholder="请设置总限量">
                                        <template slot="append">次</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="设置日限量" prop="dayLimit">
                                    <el-input v-model="form.dayLimit" placeholder="请设置日限量">
                                        <template slot="append">次</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="备注">
                                    <el-input type="textarea" v-model="form.remark" placeholder="填写备注"></el-input>
                                </el-form-item>
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
import { userAttentionAdd,userChildgoldCoin,adminCanAddGroup } from '../../api/index';
export default {
    name: 'userAttentionAdd',
    data() {
        return {
            tipWx: '微信号',
            tipP: '微信号码',
            goldCoin: 0,
            qun: '',
            form: {
                wxAcc: '',
                total: '',
                type: '0',
                dayLimit: '',
                gender: '0',
                remark: ''
            },
            rules: {
                wxAcc: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                total: [{ required: true, message: '请设置总限量', trigger: 'blur' }],
                dayLimit: [{ required: true, message: '请设置日限量', trigger: 'blur' }]
            },
        };
    },
    created() {
        this.getUserChildgoldCoin()
        this.getData()
    },
    methods: {
        getData() {
            let that = this
            adminCanAddGroup().then(res => {
                that.qun = res.data
            }).catch(err => {
                that.$message.error(err)
            })
        },
        getUserChildgoldCoin () {
            let that = this
            userChildgoldCoin().then(res => {
                this.goldCoin = res.data
            }).catch(err => {
                console.log(err);
            })
        },
        onWx (val) {
            if (val == 0) {
                this.tipWx = '微信号'
                this.tipP = '微信号码'
            } else if (val == 1) {
                this.tipWx = '公众号'
                this.tipP = '微信公众号码'
            } else if (val == 2) {
                this.tipWx = '微信ID|微信账号'
                this.tipP = '微信ID|微信账号'
            }
            this.form.type = val
        },
        onSix (val) {
            this.form.gender = val
        },
        onSubmit() {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    if (that.form.total > that.goldCoin) {
                        that.$message.error('金币余额不足')
                        return false
                    }
                    let data = {
                        dayLimit: that.form.dayLimit,
                        gender: that.form.gender,
                        remark: that.form.remark,
                        type: that.form.type,
                        total: that.form.total,
                        wxAcc: that.form.wxAcc
                    }
                    userAttentionAdd(data).then(res => {
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
.input{
    display: flex;
    align-items: center;
}
</style>