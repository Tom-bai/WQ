<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="top-flex">
                        <span>信息管理</span>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="onRoutesAdd">新增模板</el-button>
                    </div>
                    <!-- <div class="handle-box">
                        <el-input v-model="query.name" size="null" placeholder="编号" class="handle-input mr10"></el-input>
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
                        <el-table-column prop="name" label="图片" align="center">
                            <template slot-scope="scope">
                                <img :src="imgUrl + scope.row.imagePath" alt="" width="100">
                            </template>
                        </el-table-column>
                        <el-table-column prop="gmtCreate" label="添加时间" align="center"></el-table-column>
                        <el-table-column label="管理操作" width="100" align="center">
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
import { adminInfotemp,adminDeleteInfotemp } from '../../api/index';
export default {
    name: 'adminInformation',
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
            id: -1,
            allCapacity: 0,
            imgUrl: `/api/file/download?filePath=` ,
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
        onRoutesAdd(){
            this.$router.push({
                path:'/adminInformationAdd',
                query:{
                    type: 'add'
                }
            })
        },
        onRoutesEdit(index,row){
            this.$router.push({
                path:'/adminInformationAdd',
                query:{
                    id: row.id,
                    type: 'edit'
                }
            })
        },
        onAdminDelete(){},
        getData () {
            let that = this
            adminInfotemp().then(res => {  
                this.tableData = res.data.records
                this.pageTotal = res.data.total
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
        onAdminDelete(index, row) {
            let that = this
            let data = [row.id]
            that.$confirm('是否确认删除数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    adminDeleteInfotemp(data).then(res => {
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
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
