<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>{{$route.query.userName}}{{$route.query.type == 'edit'?'编辑站点':'添加站点'}}</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" size="null" label-width="100px">
                                <el-form-item label="原始链接">
                                    <div class="copy">
                                        <el-input v-model="yuan" disabled="disabled" placeholder="请输入站点"></el-input>
                                        <el-button class="btns" v-clipboard:copy="yuan" v-clipboard:success="onCopy">复制</el-button>
                                    </div>
                                </el-form-item>
                                <el-form-item label="站点">
                                    <el-input v-model="form.site" placeholder="请输入站点">
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">提交保存</el-button>
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
import Clipboard from 'clipboard';
import { adminPostSite,adminSiteQuery,adminPutSite,adminRealsite } from '../../api/index';
export default {
    name: 'adminHostAdd',
    data() {
        return {
            yuan: '',
            form: {
                site: ''
            },
            headers: {
                Authentication: localStorage.getItem('token')
            },
            upData: {
                module: 'advertising'
            },
            form: {
                site: '',
                accountId: ''
            },
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            },
        };
    },
    created() {
        if (this.$route.query.type == 'edit') {
            this.getData(this.$route.query.id)
        }
        if (this.$route.query.id) {
            this.form.accountId = this.$route.query.id
        }
        this.getYuan(this.$route.query.id)
    },
    methods: {
        onCopy() {  
            let that = this
            that.$message.success('复制成功')
        },
        getData(id) {
            let that = this
            adminSiteQuery(id).then(res => {
                that.form = res.data
            }).catch(err => {
                console.log(err);
            })
        },
        getYuan (id) {
            let that = this
            adminRealsite(id).then(res => {
                that.yuan = res.data
            }).catch(err => {
                console.log(err);
            })
        },
        onSubmit () {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    if (that.$route.query.type == 'edit') {
                        that.putData()
                    } else if (that.$route.query.type == 'add') {
                        that.postData()
                    }
                }
            })  
        },
        postData () {
            let that = this
            let data = {
                site: that.form.site,
                accountId: that.form.accountId
            }
            adminPostSite(data).then(res => {
                if (res.code === 0) {
                    that.$message.success(res.data)
                    that.resetForm()
                } else {
                    that.$message.error(res.message)
                }
            }).catch(err => {
                that.$message.error(err)
            })
        },
        putData () {
            let that = this
            let data = {
                site: that.form.site,
                id: that.$route.query.id
            }
            adminPutSite(data).then(res => {
                if (res.code === 0) {
                    that.$message.success(res.data)
                    that.resetForm()
                } else {
                    that.$message.error(res.message)
                }
            }).catch(err => {
                that.$message.error(err)
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
.item{
    margin: 0 !important;
    width: 100%;
}
.item >>>.el-form-item__content{
    margin: 0 !important;
}
.copy{
    display: flex;
    align-items: center;
}
.copy .btns{
    height: 40px;
    margin-left: 15px;
}
.form-box{
    width: 800px;
}
</style>