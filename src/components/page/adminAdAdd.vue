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
                                    ref="upload"
                                    list-type="picture-card">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisibleAD">
                                    <img width="100%" :src="dialogImageUrlAD" alt="">
                                </el-dialog>
                                <div class="title">标题（如：韶关🌟  一小孩刮了黑社会的车，黑社会打了小孩一巴掌，没想到因此摊上了大事！）</div>
                                <el-form-item prop="title" class="item">
                                    <el-input
                                        size="null"
                                        placeholder="请输入标题"
                                        v-model="form.title"
                                        clearable>
                                    </el-input>
                                </el-form-item>
                                <div class="title">描述</div>
                                <el-input
                                    size="null"
                                    placeholder="请输入描述"
                                    v-model="form.description"
                                    clearable>
                                </el-input>
                                <div class="title">公众号名称</div>
                                <div class="top-flex">
                                    <el-col :span="11" style="padding-left:0;">
                                        <el-form-item prop="officialAccountName" class="item">
                                            <el-input
                                                size="null"
                                                placeholder="请输入公众号名称"
                                                v-model="form.officialAccountName"
                                                clearable>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="13" style="padding-right:0;">
                                        <el-form-item prop="officialAccountUrl" class="item">
                                            <el-input
                                                size="null"
                                                placeholder="请添加公众号url地址"
                                                v-model="form.officialAccountUrl"
                                                clearable>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </div>
                                <div class="title">阅读全文</div>
                                <div class="top-flex">
                                    <el-form-item prop="originalTextUrl" class="item">
                                        <el-input
                                            size="null"
                                            placeholder="请添加全文url地址"
                                            v-model="form.originalTextUrl"
                                            clearable>
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="title">广告图片</div>
                                <el-upload
                                    class="upload-demo"
                                    :action="action"
                                    :headers="headers"
                                    :data="upData"
                                    :limit='1'
                                    :on-exceed="handleExceedAD2"
                                    :on-preview="handlePreviewAD2"
                                    :on-success="handSuccessAD2"
                                    :file-list="fileListAD2"
                                    list-type="picture-card">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisibleAD2">
                                    <img width="100%" :src="dialogImageUrlAD2" alt="">
                                </el-dialog>
                                <div class="title">广告类型</div>
                                <el-radio-group v-model="form.advType">
                                    <el-radio label="0">跳转链接</el-radio>
                                    <el-radio label="1">显示二维码</el-radio>
                                </el-radio-group>
                                <div class="top-flex" style="margin-top: 20px;">
                                    <div v-if="form.advType == 1">
                                        <el-upload
                                            class="upload-demo"
                                            :action="action"
                                            :headers="headers"
                                            :data="upData"
                                            :limit='1'
                                            :on-exceed="handleExceedAD3"
                                            :on-preview="handlePreviewAD3"
                                            :on-success="handSuccessAD3"
                                            :file-list="fileListAD3"
                                            list-type="picture-card">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisibleAD3">
                                            <img width="100%" :src="dialogImageUrlAD3" alt="">
                                        </el-dialog>
                                    </div>
                                    <div v-if="form.advType == 0">
                                        <el-input
                                            size="null"
                                            placeholder="请添加url地址"
                                            v-model="form.advPath"
                                            clearable>
                                        </el-input>
                                    </div>
                                </div>
                                <div class="title">播放暂停时间</div>
                                <div class="top-flex">
                                    <el-input
                                        size="null"
                                        placeholder="请输入暂停时间"
                                        v-model="form.endTime"
                                        clearable>
                                        <template slot="append">秒</template>
                                    </el-input>
                                </div>
                                <div class="btn">
                                    <el-button type="primary" size="null" @click="onSubmit">提交保存</el-button>
                                    <el-button size="null">取消</el-button>
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
import { file, adminAdvertisingPost } from '../../api/index';
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
                endTime: ''
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
        };
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
        handleExceedAD2(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除原文件再上传`);
        },
        handlePreviewAD2(file) {
            this.dialogImageUrlAD2 = file.url;
            this.dialogVisibleAD2 = true;
        },
        handSuccessAD2(file) {
            this.form.advImage = file.data.path
        },
        handleExceedAD3(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除原文件再上传`);
        },
        handlePreviewAD3(file) {
            this.dialogImageUrlAD3 = file.url;
            this.dialogVisibleAD3 = true;
        },
        handSuccessAD3(file) {
            this.form.advPath = file.data.path
        },
        onSubmit () {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    let data = {
                        advImage: that.form.advImage,
                        title: that.form.title,
                        description: that.form.description,
                        officialAccountName: that.form.officialAccountName,
                        officialAccountUrl: that.form.officialAccountUrl,
                        originalTextUrl: that.form.originalTextUrl,
                        titleImage: that.form.titleImage,
                        advType: that.form.advType,
                        advPath: that.form.advPath,
                        endTime: that.form.endTime,
                    }
                    adminAdvertisingPost(data).then(res => {
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