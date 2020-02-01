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
                            <el-form ref="form" :model="form" :rules="rules" size="null" label-width="100px">
                                <el-form-item label="加好友：">
                                </el-form-item>
                                <el-form-item label="不限">
                                    <el-input v-model="form.bu1">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="男" >
                                    <el-input v-model="form.nan1">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="女">
                                    <el-input v-model="form.nv1">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
    
                                <el-form-item label="加公众号：">
                                </el-form-item>
                                <el-form-item label="不限">
                                    <el-input v-model="form.bu2">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="男" >
                                    <el-input v-model="form.nan2">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="女">
                                    <el-input v-model="form.nv2">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="加群：">
                                </el-form-item>
                                <el-form-item label="不限">
                                    <el-input v-model="form.bu3">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="男" >
                                    <el-input v-model="form.nan3">
                                        <template slot="append">金币</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="女">
                                    <el-input v-model="form.nv3">
                                        <template slot="append">金币</template>
                                    </el-input>
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
import { adminAdd } from '../../api/index';
export default {
    name: 'adminKouNum',
    data() {
        return {
            form: {
                bu1: '',
                nan1: '',
                nv1: '',
                bu2: '',
                nan2: '',
                nv2: '',
                bu3: '',
                nan3: '',
                nv3: '',
            },
        };
    },
    methods: {
        onSubmit() {
            let that = this
            that.$refs.form.validate(valid => {
                if (valid) {
                    let data = {
                        name: that.form.name,
                        account: that.form.account,
                        passwd: that.form.password,
                        type: that.form.type,
                        days: that.form.type == 0?that.form.days:0,
                        // domainName: that.form.type == 0?that.form.url:'',
                        goldCoin: that.form.type == 0?that.form.goldCoin:0
                    }
                    adminAdd(data).then(res => {
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
</style>