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
                                        <el-radio label="0">加微信好友</el-radio>
                                        <el-radio label="1">加公众号</el-radio>
                                        <el-radio label="2">加群</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label="tipWx" prop="wxAcc">
                                    <el-input v-model="form.wxAcc" placeholder="请输入用户名"></el-input>
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
                                    <el-button>取消</el-button>
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
import { userAttentionAdd } from '../../api/index';
export default {
    name: 'userAttentionAdd',
    data() {
        return {
            tipWx: '微信号',
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
    methods: {
        onWx (val) {
            if (val == 0) {
                this.tipWx = '微信号'
            } else if (val == 1) {
                this.tipWx = '公众号'
            } else if (val == 2) {
                this.tipWx = '群号'
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
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 500);
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