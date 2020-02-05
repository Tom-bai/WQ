<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>添加广告</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                                <div class="title">分享图</div>
                                <el-upload
                                    class="upload-demo"
                                    :action="action"
                                    :headers="headers"
                                    :data="upData"
                                    :limit='1'
                                    :on-exceed="handleExceedAD"
                                    :on-preview="handlePreviewAD"
                                    :on-success="handSuccessAD"
                                    :file-list="fileListAD"
                                    :on-remove="handleRemoveAD"
                                    ref="upload"
                                    list-type="picture-card">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisibleAD">
                                    <img width="100%" :src="dialogImageUrlAD" alt="">
                                </el-dialog>
                                <div class="title">标题</div>
                                <el-form-item prop="title" class="item">
                                    <el-input
                                        size="null"
                                        placeholder="请输入标题"
                                        v-model="form.title"
                                        clearable>
                                    </el-input>
                                </el-form-item>
                                <div class="title">链接标题</div>
                                <div class="top-flex">
                                    <el-form-item class="item">
                                        <el-input
                                            size="null"
                                            placeholder="请输入链接标题"
                                            v-model="form.urlTitle"
                                            clearable>
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="title">广告链接</div>
                                <div class="top-flex">
                                    <el-input
                                        size="null"
                                        placeholder="请输入广告链接"
                                        v-model="form.advPath"
                                        clearable>
                                    </el-input>
                                </div>
                                <div class="btn">
                                    <el-button type="primary" size="null" @click="onSubmit">提交保存</el-button>
                                    <el-button size="null" @click="resetForm">取消</el-button>
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
import { file, adminAdvertisingPost,adminAdvertisingSearch,adminAdvertisingPut } from '../../api/index';
export default {
    name: 'adminAdAdd',
    data() {
        return {
            action: '/api/file',
            headers: {
                Authentication: localStorage.getItem('token')
            },
            upData: {
                module: 'advertising'
            },
            form: {
                advImage: '',
                title: '',
                description: '',
                officialAccountName: '',
                officialAccountUrl: '',
                originalTextUrl: '',
                titleImage: '',
                advType: '0',
                advPath: '',
                endTime: '',
                videoId: '',
                image2: '',
                image2Url: ''
            },
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                officialAccountName: [{ required: true, message: '请输入公众号名称', trigger: 'blur' }],
                officialAccountUrl: [{ required: true, message: '请添加公众号url地址', trigger: 'blur' }],
                originalTextUrl: [{ required: true, message: '请添加全文url地址', trigger: 'blur' }],
            },
            fileListAD: [],
            dialogImageUrlAD: '',
            dialogVisibleAD: false,
            fileListAD2: [],
            dialogImageUrlAD2: '',
            dialogVisibleAD2: false,
            fileListAD3: [],
            dialogImageUrlAD3: '',
            dialogVisibleAD3: false,
            fileListADT: [],
            dialogImageUrlADT: '',
            dialogVisibleADT: false,
            imgUrl: `/api/file/download?filePath=`,
        };
    },
    created () {
        this.getData(this.$route.query.id)
    },
    methods: {
        handleExceedAD(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除原文件再上传`);
        },
        handlePreviewAD(file) {
            this.dialogImageUrlAD = file.url;
            this.dialogVisibleAD = true;
        },
        handSuccessAD(file) {
            this.form.titleImage = file.data.path
        },
        handleRemoveAD(file, fileList) {
            this.form.titleImage = ''
        },
        getData (id) {
            let that = this
            adminAdvertisingSearch(id).then(res => {
                that.form = {
                    id: res.data.id,
                    title: res.data.title,
                    titleImage: res.data.titleImage,
                    advPath: res.data.advPath,
                    urlTitle: res.data.urlTitle,
                    type: res.data.type
                }
                if (res.data.titleImage !== '') {
                    that.fileListAD.push({
                        url: that.imgUrl + res.data.titleImage
                    })
                }
            }).catch(err => {
                that.$message.error(err)
            })
        },
        onSubmit () {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    let data = {
                        id: that.form.id,
                        title: that.form.title,
                        titleImage: that.form.titleImage,
                        advPath: that.form.advPath,
                        urlTitle: that.form.urlTitle,
                        type: that.form.type
                    }
                    adminAdvertisingPut(data).then(res => {
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
.form-box{
    width: 800px;
}
.item{
    margin: 0 !important;
    width: 100%;
}
.item >>>.el-form-item__content{
    margin: 0 !important;
}
</style>