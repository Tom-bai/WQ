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
                            <div class="title">分享图(750*1260)</div>
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
                            <!-- <el-image
                                style="width: 200px;"
                                :src="form.imagePath"
                                :preview-src-list="[form.imagePath]">
                            </el-image> -->
                            <el-input
                                size="null"
                                type="textarea"
                                class="textarea"
                                :rows="6"
                                placeholder="请输入内容"
                                v-model="form.groupContent">
                            </el-input>
                            <!-- <div class="title">自动添加好友设置（所有下级会员的清粉用户也会关注此号）</div>
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
                            <div class="title">版权设置</div>
                            <el-input
                                size="null"
                                placeholder="如果你也想定制这样的链接，请联系微信: 18578640282"
                                v-model="form.copyrightInfo"
                                clearable>
                            </el-input> -->
                            <div class="btn">
                                <el-button type="primary" size="null" @click="onSubmit">提交保存</el-button>
                            </div>
                        </div>
                        <div class="bgimg" v-if="bgImg">
                            <img :src="imgUrl + bgImg" alt="">
                            <vue-draggable-resizable
                                :w="form.avatarW"
                                :h="form.avatarH"
                                :x="form.avatarX"
                                :y="form.avatarY"
                                :resizable="true"
                                :parent="true"
                                :max-height="1000"
                                :max-width="1000"
                                :min-width="100"
                                :min-height="100"
                                :handles="['tl','tr','br','bl']"
                                :is-conflict-check="true"
                                class="qrcode"
                                @dragging="onDrag"
                                @resizing="onResize"
                            >
                            </vue-draggable-resizable>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';
import Vue from 'vue'

import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

import { adminInformationInfotemp,adminInformationEdit } from '../../api/index';
export default {
    name: 'adminInformation',
    data() {
        return {
            dataInfo: [],
            action: '/api/file',
            headers: {
                Authentication: localStorage.getItem('token')
            },
            upData: {
                module: 'template'
            },
            fileListAD: [],
            dialogImageUrlAD: '',
            dialogVisibleAD: false,
            imgUrl: `/api/file/download?filePath=` ,
            bgImg: '',
            form: {
                wxAccount: '',
                officialAccount: '',
                imagePath: '',
                copyrightInfo: '',
                groupContent: '',
                avatarX: 0,
                avatarY: 0,
                avatarW: 100,
                avatarH: 100,
            },
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
            adminInformationInfotemp().then(res => {  
                if (res.data !== null) {
                    // that.form.wxAccount = res.data.wxAccount
                    // that.form.officialAccount = res.data.officialAccount
                    // that.form.copyrightInfo = res.data.copyrightInfo
                    that.form.groupContent = res.data.groupContent
                    // that.form.imagePath = res.data.qrImage
                    that.bgImg =  res.data.imagePath
                    that.form.avatarX = res.data.qrX
                    that.form.avatarY = res.data.qrY
                    that.form.avatarW = res.data.qrW
                    that.form.avatarH = res.data.qrH
                }
            }).catch(err => {
                that.$message.error(err)
            })
        },
        onSubmit() {
            let that = this
            let data = {
                imagePath: that.form.titleImage,
                groupContent: that.form.groupContent,
                qrH:that.form.avatarH,
                qrW:that.form.avatarW,
                qrX:that.form.avatarX,
                qrY:that.form.avatarY,
            }
            adminInformationEdit(data).then(res => {
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
        },
        onResize: function(x, y, width, height) {
            this.$nextTick(() => {
                this.form.avatarX = x
                this.form.avatarY = y
                this.form.avatarW = width
                this.form.avatarH = height
            })
        },
        onDrag: function(x, y) {
            this.$nextTick(() => {
                this.form.avatarX = x
                this.form.avatarY = y
            })
        },
        handleExceedAD(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除原文件再上传`);
        },
        handlePreviewAD(file) {
            this.dialogImageUrlAD = file.url;
            this.dialogVisibleAD = true;
        },
        handSuccessAD(file) {
            this.bgImg = file.data.path
            this.form.titleImage = file.data.path
        },
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
.container{
    display: flex;
}
.bgimg{
    margin-left: 20px;
    position: relative;
}
.bgimg>img{
    width: 207px;
    border: solid 1px #999;
}
.qrcode{
  background-image: url('../../assets/img/qrcode.jpg');
  background-size: 100% 100%;
}
.form-box{
}
</style>
