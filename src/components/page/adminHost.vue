<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>站点管理</span>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="onRoutes(0)">新增站点</el-button>
                    </div>
                    <div class="handle-box">
                        <el-input v-model="query.name" size="null" placeholder="输入站点" class="handle-input mr10"></el-input>
                        <el-button type="primary"  size="null" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                    >
                        <!-- <el-table-column type="selection" width="55" align="center">@selection-change="handleSelectionChange"</el-table-column> -->
                        <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column>
                        <el-table-column prop="site" label="站点" align="center"></el-table-column>
                        <el-table-column prop="gmtCreate" label="添加时间" align="center"></el-table-column>
                        <el-table-column label="状态" align="center">
                            <template slot-scope="scope">
                                <el-tag type="danger" v-if="scope.row.state == '已封'">{{scope.row.state}}</el-tag>
                                <el-tag type="success" v-else-if="scope.row.state == '正常'">{{scope.row.state}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="管理操作" width="240" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="onRoutesEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                    type="text"
                                    icon="el-icon-delete"
                                    style="color:red;"
                                    @click="onAdminDelete(scope.$index, scope.row)"
                                >删除</el-button>
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
import { adminSite,adminSiteQuery } from '../../api/index';
export default {
    name: 'adminHost',
    data() {
        return {
            childcount: [],
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            allCapacity: 0
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
        onRoutes(index,row) {
            this.$router.push({
                path:'/adminHostAdd',
                query:{
                    id: null,
                    type: 'add'
                }
            })
        },
        onRoutesEdit(index,row) {
            this.$router.push({
                path:'/adminHostAdd',
                query:{
                    id: row.id,
                    type: 'edit'
                }
            })
        },
        getData() {
            let that = this
            let data = {
                limit: that.query.pageSize,
                page: that.query.pageIndex,
                name: that.query.name
            }
            adminSite(data).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            }).catch(err => {
                console.log(err);
            })
        },
        // 触发搜索按钮
        handleSearch() {
            let that = this
            let data = that.query.name
            this.tableData = []
            that.query.pageIndex = 1
            that.getData()
        },
        // 删除操作
        onAdminDelete(index, row) {
            let that = this
            let data = [row.id]
            that.$confirm('是否确认删除数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    adminAccountDelete(data).then(res => {
                        if (res.code === 0) {
                            that.$message.success(res.data)
                            that.tableData.splice(index,1)
                        } else {
                            that.$message.error(res.message)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
</style>
