<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header" class="top-flex">
                        <span>关注管理 <span class="money">金币 <span>1000</span></span></span>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="userAttentionAdd">新增关注</el-button>
                    </div>
                    <!-- <div class="handle-box">
                        <el-input v-model="query.name" size="null" placeholder="用户名" class="handle-input mr10"></el-input>
                        <el-button type="primary"  size="null" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div> -->
                    <el-table
                        :data="tableData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                    >
                        <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column>
                        <el-table-column prop="wxAcc" label="关注号"></el-table-column>
                        <el-table-column width="120" label="账户类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == 0">微信号</span>
                                <span v-if="scope.row.type == 1">公众号</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="total" label="总限量"></el-table-column>
                        <el-table-column prop="dayLimit" label="日限量"></el-table-column>
                        <el-table-column label="对象" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.gender == 0">不限</span>
                                <span v-if="scope.row.gender == 1">男</span>
                                <span v-if="scope.row.gender == 2">女</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" width="200" label="备注"></el-table-column>
                        <el-table-column label="管理操作" width="200" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="onUserAttentionEdit(scope.$index, scope.row)"
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
import { userAttention } from '../../api/index';
export default {
    name: 'userAttention',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            query: {
                address: '',
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
        this.getData();
    },
    computed: {
    },
    methods: {
        userAttentionAdd () {
            this.$router.push('/userAttentionAdd')
        },
        onUserAttentionEdit(index, row) {
            this.$router.push({
                path:'/userAttentionEdit',
                query:{
                    id:row.id
                }
            })
        },
        getData() {
            let that = this
            let data = {
                limit: that.query.pageSize,
                page: that.query.pageIndex
            }
            userAttention(data).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            }).catch(err => {
                console.log(err);
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
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
.top-flex .money {
    font-size: 18px;
    color: #fb4109;
    margin-left: 20px;
}
.top-flex .money>span {
    font-size: 28px;
    color: #fb4109;
    font-weight: 600;
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
