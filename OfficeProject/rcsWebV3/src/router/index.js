import Vue from 'vue'
import Router from 'vue-router'

//后台框架的布局容器组件
import Layout from '../views/layout/Layout.vue'
import info from './info'
import resource from './resource.js'
import systemManage from './system.js'
import user from './member'
Vue.use(Router)


//====静态路由部分======
export const staticRouter = [
    {
        path: '/404',
        name: '404',
        title: '404',
        component: function (resolve) {
            require(['../views/common/404.vue'], resolve)
        }
    },
    {
        path: '/login',
        name: 'login',
        component: function (resolve) {
            require(['../views/login/Login.vue'], resolve)
        }
    },
    {
        path: '/customerLogin',
        name: 'customerLogin',
        component: function (resolve) {
            require(['../views/login/Login.vue'], resolve)
        }
    },
    {
        path: '/',
        redirect: 'customerLogin'
    },


    //首页
    {
        path: '/dashboard',
        component: Layout,
        children: [{
            name:'Dashboard',
            path: '',
            component: function (resolve) {
                require(['../views/system/Desktop.vue'], resolve)
            },
            meta: {
                name: '桌面',
                affix: true
            },
        }]
    },
    {
        path: '/accountSetting',
        component: Layout,
        children: [{
            name:'accountSetting',
            path: '',
            component: function (resolve) {
                require(['../views/system/PwdChange.vue'], resolve)
            },
            meta: {
                name: '修改密码'
            },
        },
        {
            name: 'editInfo',
            path: 'editInfo',
            component: function (resolve) {
                require(['../views/customer/AddCustomer.vue'], resolve)
            },
            meta: {
                name:'修改信息',
            },
        }
        ]
    },


]

const router = new Router({
    mode: 'hash',
    routes: staticRouter
})
export default router

//====动态路由部分======
let dynamicRouter = [];
let routerArray = [
    info,
    systemManage,
    resource,
    user
]

dynamicRouter = dynamicRouter.concat(...routerArray)
// routerArray.forEach(function (value, index, array) {
//     dynamicRouter = dynamicRouter.concat(value)
//     // value.forEach(function (route, index, array) {
//     //     dynamicRouter.push(route)
//     // })
// })


let layoutRouter =  {
    name: 'layout',
    path: '',
    component: Layout,
    children: []
};

export {dynamicRouter, layoutRouter}






