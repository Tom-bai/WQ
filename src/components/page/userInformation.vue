<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="top-flex">
                        <span>编辑关注</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" size="null" label-width="100px">
                                <div class="title">专属二维码</div>
                                <el-image
                                    style="width: 200px;"
                                    :src="form.imagePath"
                                    :preview-src-list="[form.imagePath]">
                                </el-image>
                                <!-- <el-input
                                    size="null"
                                    type="textarea"
                                    class="textarea"
                                    :rows="6"
                                    disabled="disabled"
                                    placeholder="请输入内容"
                                    v-model="form.groupContent">
                                </el-input> -->
                                <div class="title">自动添加好友设置</div>
                                <el-input
                                    size="null"
                                    placeholder="自动添加的好友，请输入唯一微信账号"
                                    v-model="form.wxAccount"
                                    clearable>
                                </el-input>
                                <div class="title">自动添加公众号设置</div>
                                <el-input
                                    size="null"
                                    placeholder="自动添加的公众号，输入唯一公众账号"
                                    v-model="form.officialAccount"
                                    clearable>
                                </el-input>
                                <div class="title">下级会员的清粉用户关注此微信号</div>
                                <div class="copy">
                                    <el-input
                                        size="null"
                                        placeholder="下级会员的清粉用户关注此微信号"
                                        v-model="form.lowerWxAccount"
                                        clearable>
                                    </el-input>
                                    <el-select v-model="form.lowerWxAccountRule" placeholder="请选择性别" size="null" style="margin-left: 15px;">
                                        <el-option label="不限" value="不限"></el-option>
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </div>
                                <div class="title">下级会员的清粉用户关注此公众号</div>
                                <div class="copy">
                                    <el-input
                                        size="null"
                                        placeholder="下级会员的清粉用户关注此公众号"
                                        v-model="form.lowerOfficialAccount"
                                        clearable>
                                    </el-input>
                                    <el-select v-model="form.lowerOfficialAccountRule" placeholder="请选择性别" size="null" style="margin-left: 15px;">
                                        <el-option label="不限" value="不限"></el-option>
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </div>
                                <div class="title">专属原文阅读链接</div>
                                <div class="copy">
                                    <el-input
                                        size="null"
                                        placeholder="专属原文阅读链接"
                                        v-model="form.url"
                                        disabled="disabled"
                                        class="ss"
                                        clearable>
                                    </el-input>
                                    <el-button 
                                        class="btns" 
                                        v-clipboard:copy="form.url" 
                                        v-clipboard:success="onCopy" 
                                    >复制</el-button>
                                </div>
                                <div class="title">版权设置</div>
                                <el-input
                                    size="null"
                                    placeholder="如果你也想定制这样的链接，请联系微信: 18578640282"
                                    v-model="form.copyrightInfo"
                                    clearable>
                                </el-input>
                                <div class="btn">
                                    <el-button type="primary" size="null" @click="onSubmit">提交保存</el-button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import bus from '../common/bus';
import { userInformationInfo,userInformationEdit } from '../../api/index';
export default {
    name: 'userInformation',
    data() {
        return {
            dataInfo: [],
            form: {
                wxAccount: '',
                officialAccount: '',
                imagePath: '',
                copyrightInfo: '',
                groupContent: '',
                url: '',
                lowerWxAccount: '',
                lowerWxAccountRule: '',
                lowerOfficialAccount: '',
                lowerOfficialAccountRule: '',
                region: ''
            }
        };
    },
    components: {
    },
    created() {
        this.getData()
    },
    computed: {
    },
    methods: {
        onCopy() {  
            let that = this
            that.$message.success('复制成功')
        },
        getData () {
            let that = this
            userInformationInfo().then(res => {
                if (res.data !== null) {
                    that.form.wxAccount = res.data.wxAccount
                    that.form.officialAccount = res.data.officialAccount
                    that.form.copyrightInfo = res.data.copyrightInfo
                    that.form.groupContent = res.data.groupContent
                    that.form.imagePath = res.data.qrImage
                    that.form.url = res.data.domainName
                    that.form.lowerWxAccount = res.data.lowerWxAccount
                    that.form.lowerWxAccountRule = res.data.lowerWxAccountRule
                    that.form.lowerOfficialAccount = res.data.lowerOfficialAccount
                    that.form.lowerOfficialAccountRule = res.data.lowerOfficialAccountRule
                }
            }).catch(err => {
                that.$message.error(err)
            })
        },
        onSubmit() {
            let that = this
            let data = {
                wxAccount : that.form.wxAccount,
                officialAccount: that.form.officialAccount,
                groupContent: that.form.groupContent,
                imagePath: '',
                copyrightInfo: that.form.copyrightInfo,
                domainName: that.form.url,
                lowerWxAccount: that.form.lowerWxAccount,
                lowerWxAccountRule: that.form.lowerWxAccountRule,
                lowerOfficialAccount: that.form.lowerOfficialAccount,
                lowerOfficialAccountRule: that.form.lowerOfficialAccountRule,
            }
            userInformationEdit(data).then(res => {
                if (res.code === 0) {
                    that.$message.success(res.data)
                    // that.resetForm()
                } else {
                    that.$message.error(res.message)
                }
            }).catch(err => {
                that.$message.error(err)
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
.textarea{
    margin-top: 20px;
}
.title{
    line-height: 50px;
}
.btn{
    text-align: center;
    margin-top: 30px;
}
.copy{
    display: flex;
    align-items: center;
}
.copy .btns{
    height: 40px;
    margin-left: 15px;
}
</style>
