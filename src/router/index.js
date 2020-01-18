import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/main',
            meta: { title: '系统首页' }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                // admin
                {
                    path: '/adminIndex',
                    component: () => import(/* webpackChunkName: "adminIndex" */ '../components/page/adminIndex.vue'),
                    meta: { title: '系统首页', permission: true}
                },
                {
                    path: '/adminIndexChild',
                    component: () => import(/* webpackChunkName: "adminIndexChild" */ '../components/page/adminIndexChild.vue'),
                    meta: { title: '子账户列表', permission: true }
                },
                {
                    path: '/adminFormEdit',
                    component: () => import(/* webpackChunkName: "adminForm" */ '../components/page/adminFormEdit.vue'),
                    meta: { title: '会员编辑', permission: true }
                },
                {
                    path: '/adminFormAdd',
                    component: () => import(/* webpackChunkName: "adminFormAdd" */ '../components/page/adminFormAdd.vue'),
                    meta: { title: '新增会员', permission: true }
                },
                {
                    path: '/adminRevise',
                    component: () => import(/* webpackChunkName: "adminRevise" */ '../components/page/adminRevise.vue'),
                    meta: { title: '修改密码', permission: true }
                },
                {
                    path: '/adminAd',
                    component: () => import(/* webpackChunkName: "adminAd" */ '../components/page/adminAd.vue'),
                    meta: { title: '广告列表', permission: true }
                },
                {
                    path: '/adminAdAdd',
                    component: () => import(/* webpackChunkName: "adminAdAdd" */ '../components/page/adminAdAdd.vue'),
                    meta: { title: '添加广告', permission: true }
                },
                {
                    path: '/adminAdAddEdit',
                    component: () => import(/* webpackChunkName: "adminAdAddEdit" */ '../components/page/adminAdAddEdit.vue'),
                    meta: { title: '编辑广告', permission: true }
                },
                {
                    path: '/adminInformation',
                    component: () => import(/* webpackChunkName: "adminInformation" */ '../components/page/adminInformation.vue'),
                    meta: { title: '信息编辑', permission: true }
                },
                // user
                {
                    path: '/userIndex',
                    component: () => import(/* webpackChunkName: "userIndex" */ '../components/page/userIndex.vue'),
                    meta: { title: '系统首页'}
                },
                {
                    path: '/userAddvip',
                    component: () => import(/* webpackChunkName: "userAddvip" */ '../components/page/userAddvip.vue'),
                    meta: { title: '新增会员'}
                },
                {
                    path: '/userEditvip',
                    component: () => import(/* webpackChunkName: "userEditvip" */ '../components/page/userEditvip.vue'),
                    meta: { title: '编辑会员'}
                },
                {
                    path: '/userAttention',
                    component: () => import(/* webpackChunkName: "userAttention" */ '../components/page/userAttention.vue'),
                    meta: { title: '关注管理'}
                },
                {
                    path: '/userAttentionAdd',
                    component: () => import(/* webpackChunkName: "userAttentionAdd" */ '../components/page/userAttentionAdd.vue'),
                    meta: { title: '新增关注'}
                },
                {
                    path: '/userAttentionEdit',
                    component: () => import(/* webpackChunkName: "userAttentionEdit" */ '../components/page/userAttentionEdit.vue'),
                    meta: { title: '编辑关注'}
                },
                {
                    path: '/userInformation',
                    component: () => import(/* webpackChunkName: "userInformation" */ '../components/page/userInformation.vue'),
                    meta: { title: '信息编辑'}
                },
                {
                    path: '/userRevise',
                    component: () => import(/* webpackChunkName: "userRevise" */ '../components/page/userRevise.vue'),
                    meta: { title: '修改密码'}
                },
                // no page
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/main',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/main.vue'),
            meta: { title: '系统首页' }
        },
        {
            path: '*',
            redirect: '/404'
        },
    ]
});
