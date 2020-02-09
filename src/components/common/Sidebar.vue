<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
        >
            <template v-for="item in getAuthority">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon" class="wq-icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" class="wq-icon" ></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            authority: localStorage.getItem('ms_username'),
            items: [
                {
                    icon: 'icon-t7',
                    index: 'userIndex',
                    title: '系统首页'
                },
                {
                    icon: 'icon-t10',
                    index: 'userAttention',
                    title: '关注管理'
                },
                {
                    icon: 'icon-t4',
                    index: 'userInformation',
                    title: '信息编辑'
                },
                {
                    icon: 'icon-t6',
                    index: 'userRevise',
                    title: '修改密码'
                }
            ],
            itemsAdmin: [
                {
                    icon: 'icon-t7',
                    index: 'adminIndex',
                    title: '系统首页'
                },
                {
                    icon: 'icon-t11',
                    index: 'adminAd',
                    title: '广告列表'
                },
                {
                    icon: 'icon-t4',
                    index: 'adminInformation',
                    title: '信息管理'
                },
                {
                    icon: 'icon-t6',
                    index: 'adminRevise',
                    title: '修改密码'
                },
                {
                    icon: 'icon-t8',
                    index: 'adminKouNum',
                    title: '扣量设置'
                },
                {
                    icon: 'icon-t10',
                    index: 'adminHost',
                    title: '站点管理'
                }
            ]
        };
    },
    computed: {
        getAuthority() {
            let newTiem
            if (this.$store.state.state.parentId === 0) {
                newTiem = this.itemsAdmin
            } else {
                newTiem = this.items
            }
            return newTiem
        },
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });  
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
/* .el-menu-item:focus, .el-menu-item:hover{
    background-color:#9f9;
} */
.wq-icon{
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 18px 18px;
    margin-right: 5px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
.home-icon {
    background-image: url('../../assets/img/index.png');
}
.icon-t1{
    background-image: url('../../assets/img/tb1.png');
}
.icon-t2{
    background-image: url('../../assets/img/tb2.png');
}
.icon-t3{
    background-image: url('../../assets/img/tb3.png');
}
.icon-t4{
    background-image: url('../../assets/img/tb4.png');
}
.icon-t5{
    background-image: url('../../assets/img/tb5.png');
}
.icon-t6{
    background-image: url('../../assets/img/tb6.png');
}
.icon-t7{
    background-image: url('../../assets/img/tb7.png');
}
.icon-t8{
    background-image: url('../../assets/img/tb8.png');
}
.icon-t9{
    background-image: url('../../assets/img/tb9.png');
}
.icon-t10{
    background-image: url('../../assets/img/tb10.png');
}
.icon-t11{
    background-image: url('../../assets/img/tb11.png');
}
.icon-t12{
    background-image: url('../../assets/img/tb12.png');
}
</style>
