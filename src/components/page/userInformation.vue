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
                            <div class="title">自动添加好友设置（所有下级会员的清粉用户也会关注此号）</div>
                            <el-input
                                size="null"
                                placeholder="自动添加的好友，请输入唯一微信账号"
                                v-model="form.wxAccount"
                                clearable>
                            </el-input>
                            <div class="title">自动添加公众号设置（所有下级会员的清粉用户也会关注此号</div>
                            <el-input
                                size="null"
                                placeholder="自动添加的公众号，输入唯一公众账号"
                                v-model="form.officialAccount"
                                clearable>
                            </el-input>
                            <div class="title">添加域名(如：baidu.com)</div>
                            <el-input
                                size="null"
                                placeholder="自动添加的公众号，输入唯一公众账号"
                                v-model="form.url"
                                clearable>
                            </el-input>
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
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
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
                url: ''
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
                domainName: that.form.url
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
</style>
