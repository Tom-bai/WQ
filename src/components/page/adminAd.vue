<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>广告列表</span>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="dialog = true">新增广告</el-button>
                    </div>
                    <!-- <div class="handle-box">
                        <el-input v-model="query.name" size="null" placeholder="用户名" class="handle-input mr10"></el-input>
                        <el-button type="primary"  size="null" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div> -->
                    <el-dialog title="广告类型" :visible.sync="dialog">
                        <el-button @click="onRoutesAddTwo">普通广告</el-button>
                        <el-button @click="onRoutesAdd">视频广告</el-button>
                    </el-dialog>
                    <el-form :model="form" size="null" label-width="60px" class="addForm" v-if="rule.length > 0">
                        <el-form-item :label="rule[0].ruleName">
                            <el-select v-model="value" filterable placeholder="请选择" @change="setRule(rule[0].id,value,rule[0].ruleName)">
                                <el-option
                                    key="0"
                                    label="无广告"
                                    value="0">
                                </el-option>
                                <el-option
                                    v-for="item in tableData2"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="rule[1].ruleName">
                            <el-select v-model="value1" filterable placeholder="请选择" @change="setRule(rule[1].id,value1,rule[1].ruleName)">
                                <el-option
                                    key="0"
                                    label="无广告"
                                    value="0">
                                </el-option>
                                <el-option
                                    v-for="item in tableData2"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="rule[2].ruleName">
                            <el-select v-model="value2" filterable placeholder="请选择" @change="setRule(rule[2].id,value2,rule[2].ruleName)">
                                <el-option
                                    key="0"
                                    label="无广告"
                                    value="0">
                                </el-option>
                                <el-option
                                    v-for="item in tableData2"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <!-- <el-select v-model="value" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-table
                        :data="tableData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                    >
                        <!-- <el-table-column type="selection" width="55" align="center">@selection-change="handleSelectionChange"</el-table-column> -->
                        <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column>
                        <el-table-column label="广告类型">
                            <template slot-scope="scope">
                                <div v-if="scope.row.type == 0">视频广告</div>
                                <div v-if="scope.row.type == 1">普通广告</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="文章标题"></el-table-column>
                        <el-table-column prop="officialAccountName" label="关注公众号" align="center"></el-table-column>
                        <el-table-column prop="officialAccountUrl" label="公众号链接"></el-table-column>
                        <el-table-column prop="originalTextUrl" label="全文链接"></el-table-column>
                        <el-table-column prop="endTime" label="视频预览"></el-table-column>
                        <!-- <el-table-column label="分享图" align="center">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.state === 0">正常</el-tag>
                                <el-tag type="danger" v-if="scope.row.state === 1">禁用</el-tag>
                                <el-tag type="info" v-if="scope.row.state === 2">锁定</el-tag>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="管理操作" width="200" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="onRoutesEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :current-page="query.pageIndex"
                            :page-size="query.pageSize"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';
import { adminAdvertising ,adminAdvertisingRules, adminAdvertisingAll, adminAdvertisingRulesPut } from '../../api/index';
export default {
    name: 'adminAd',
    data() {
        return {
            dialog: false,
            value: '',
            value1: '',
            value2: '',
            rule: [],
            childcount: [],
            query: {
                parentId: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            tableData2: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    components: {
    },

    created() {
        this.getData()
        this.getDataRule()
        this.getData2()
    },
    computed: {
    },
    methods: {
        onRoutesAdd() {
            this.$router.push('/adminAdAdd')
        },
        onRoutesAddTwo () {
            this.$router.push('/adminAdAddTwo')
        },
        onRoutes(index, row) {
            this.$router.push({
                path:'/adminIndexChild',
                query:{
                    id:row.id,
                    name: row.name
                }
            })
        },
        onRoutesEdit(index, row) {
            console.log(row);
            
            if (row.type == 0) {
                this.$router.push({
                    path:'/adminAdAddEdit',
                    query:{
                        id:row.id
                    }
                })
            } else {
                this.$router.push({
                    path:'/adminAdAddEditTwo',
                    query:{
                        id:row.id
                    }
                })
            }
        },
        getData() {
            let that = this
            let data = {
                limit: that.query.pageSize,
                page: that.query.pageIndex
            }
            adminAdvertising(data).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            }).catch(err => {
                console.log(err);
            })
        },
        getData2() {
            let that = this
            adminAdvertisingAll().then(res => {
                this.tableData2 = res.data
            }).catch(err => {
                console.log(err);
            })
        },
        getDataRule() {
            let that = this
            adminAdvertisingRules().then(res => {
                this.rule = res.data
                this.value = this.rule[0].advId == 0?'无广告': this.rule[0].advId
                this.value1 = this.rule[1].advId == 0?'无广告': this.rule[1].advId
                this.value2 = this.rule[2].advId == 0?'无广告': this.rule[2].advId
            }).catch(err => {
                console.log(err);
            })
        },
        setRule (id,advId,ruleName) {
            let that = this
            let data = [{
                id: id,
                advId: advId,
                ruleName: ruleName
            }]
            adminAdvertisingRulesPut(data).then(res => {
                if (res.code === 0) {
                    that.$message.success(res.data)
                } else {
                    that.$message.error(res.message)
                }
            }).catch(err => {
                that.$message.error(err)
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.pageIndex = 1
            this.tableData = []
            this.getData()
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
            }).catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.grid-con-4 .grid-con-icon {
    background: rgb(230, 162, 60);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
.top-flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.cha {
    color: #F90;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.addForm{
    display: flex;
    align-items: center;
}
</style>
