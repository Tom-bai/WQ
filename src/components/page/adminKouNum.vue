<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>扣量设置</span>
                    </div>
                    <div class="container">
                        <div class="form-box">
                            <el-form ref="form" :model="form" size="null" label-width="100px">
                                <el-form-item label="加好友：">
                                </el-form-item>
                                <el-form-item label="不限">
                                    <el-input v-model="form.f0" @input="searchValuef0">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="男" >
                                    <el-input v-model="form.f1" @input="searchValuef1">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="女">
                                    <el-input v-model="form.f2" @input="searchValuef2">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
    
                                <el-form-item label="加公众号：">
                                </el-form-item>
                                <el-form-item label="不限">
                                    <el-input v-model="form.p0" @input="searchValuep0">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="男" >
                                    <el-input v-model="form.p1" @input="searchValuep1">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="女">
                                    <el-input v-model="form.p2" @input="searchValuep2">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="加群：">
                                </el-form-item>
                                <el-form-item label="不限">
                                    <el-input v-model="form.g0" @input="searchValueg0">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="男" >
                                    <el-input v-model="form.g1" @input="searchValueg1">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="女">
                                    <el-input v-model="form.g2" @input="searchValueg2">
                                        <template slot="append">金币</template>
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
import { adminGetGoldRules,adminPutGoldRules } from '../../api/index';
export default {
    name: 'adminKouNum',
    data() {
        return {
            form: {
                f0: 1,
                f1: 1,
                f2: 1,
                p0: 1,
                p1: 1,
                p2: 1,
                g0: 1,
                g1: 1,
                g2: 1,
            },
        };
    },
    created() {
        this.getData()
    },
    computed: {
    },
    methods: {
        getData () {
            let that = this
            adminGetGoldRules().then(res => {
                that.form.f0 = res.data.f0 // 好友--不限
                that.form.f1 = res.data.f1 // 好友--男
                that.form.f2 = res.data.f2 // 好友--女
                that.form.p0 = res.data.p0 // 公众号--不限
                that.form.p1 = res.data.p1 // 公众号--男
                that.form.p2 = res.data.p2 // 公众号--女
                that.form.g0 = res.data.g0 // 群--不限
                that.form.g1 = res.data.g1 // 群--男
                that.form.g2 = res.data.g2 // 群--女
                
            }).catch(err => {
                console.log(err);
            })
        },
        searchValuef0 () {
            if (this.form.f0 == '' || this.form.f0 <= 0) {
                this.form.f0 = 1
            }  
        },
        searchValuef1 () {
            if (this.form.f1 == '' || this.form.f1 <= 0) {
                this.form.f1 = 1
            }  
        },
        searchValuef2 () {
            if (this.form.f2 == '' || this.form.f2 <= 0) {
                this.form.f2 = 1
            }  
        },
        searchValuep0 () {
            if (this.form.p0 == '' || this.form.p0 <= 0) {
                this.form.p0 = 1
            }  
        },
        searchValuep1 () {
            if (this.form.p1 == '' || this.form.p1 <= 0) {
                this.form.p1 = 1
            }  
        },
        searchValuep2 () {
            if (this.form.p2 == '' || this.form.p2 <= 0) {
                this.form.p2 = 1
            }  
        },
        searchValueg0 () {
            if (this.form.g0 == '' || this.form.g0 <= 0) {
                this.form.g0 = 1
            }  
        },
        searchValueg1 () {
            if (this.form.g1 == '' || this.form.g1 <= 0) {
                this.form.g1 = 1
            }  
        },
        searchValueg2 () {
            if (this.form.g2 == '' || this.form.g2 <= 0) {
                this.form.g2 = 1
            }  
        },
        onSubmit() {
            let that = this
            let data = {
                f0: that.form.f0 == ''? 0 : that.form.f0,
                f1: that.form.f1 == ''? 0 : that.form.f1,
                f2: that.form.f2 == ''? 0 : that.form.f2,
                p0: that.form.p0 == ''? 0 : that.form.p0,
                p1: that.form.p1 == ''? 0 : that.form.p1,
                p2: that.form.p2 == ''? 0 : that.form.p2,
                g0: that.form.g0 == ''? 0 : that.form.g0,
                g1: that.form.g1 == ''? 0 : that.form.g1,
                g2: that.form.g2 == ''? 0 : that.form.g2
            }
            adminPutGoldRules(data).then(res => {
                if (res.code === 0) {
                    that.$message.success(res.data)
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
</style>