<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{childcount}}</div>
                                    <div>会员账户</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">0</div>
                                    <div>总检测量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>会员管理</span>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="onRoutesAdd">新增会员</el-button>
                    </div>
                    <div class="handle-box">
                        <!-- <el-button
                            type="primary"
                            size="null"
                            icon="el-icon-delete"
                            class="handle-del mr10"
                            @click="delAllSelection"
                        >批量删除</el-button> -->
                        <el-input v-model="query.name" size="null" placeholder="用户名" class="handle-input mr10"></el-input>
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
                        <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                        <el-table-column prop="account" label="用户帐号" align="center"></el-table-column>
                        <el-table-column prop="type" width="100" label="账户类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type === 0">普通账号</span>
                                <span v-if="scope.row.type === 1">测试账号</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="childCount" label="子账户数"></el-table-column>
                        <el-table-column prop="days" label="剩余天数"></el-table-column>
                        <el-table-column label="剩余金币">
                            <template slot-scope="scope">
                                <span>{{scope.row.goldCoin || 0}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="tola" label="总检测量"></el-table-column>
                        <el-table-column prop="sheng" width="100" label="剩余关注量"></el-table-column> -->
                        <el-table-column prop="endTime" width="200" label="有效期"></el-table-column>
                        <el-table-column label="状态" align="center">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.state === 0">正常</el-tag>
                                <el-tag type="danger" v-if="scope.row.state === 1">禁用</el-tag>
                                <el-tag type="info" v-if="scope.row.state === 2">锁定</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="管理操作" width="200" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-search"
                                    class="cha"
                                    @click="onRoutes(scope.$index, scope.row)"
                                >查看子账户</el-button>
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
import { adminAccount,adminChildcount,adminAccountSearch } from '../../api/index';
export default {
    name: 'adminIndex',
    data() {
        return {
            childcount: [],
            query: {
                parentId: '',
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
            id: -1
        };
    },
    components: {
    },

    created() {
        this.getData()
        this.getChildcount()
    },
    computed: {
    },
    methods: {
        onRoutesAdd() {
            this.$router.push('/adminFormAdd')
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
            this.$router.push({
                path:'/adminFormEdit',
                query:{
                    id:row.id
                }
            })
        },
        getData() {
            let that = this
            let data = {
                limit: that.query.pageSize,
                page: that.query.pageIndex,
                name: that.query.name,
                parentId: that.query.parentId
            }
            adminAccount(data).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            }).catch(err => {
                console.log(err);
            })
        },
        getChildcount () {
            adminChildcount().then(res => {
                this.childcount = res.data
            }).catch(err => {
                console.log(err);
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
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
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
