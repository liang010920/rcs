
export default [

    {
        name: 'roleManage',
        path: '/roleManage',
        component: function (resolve) {
            require(['../views/system/SystemContainer.vue'], resolve)
        },
        meta: {
            url:'roleManage',
        },
        children: [
            {
                name: 'roleManage-index',
                path: '',
                component: function (resolve) {
                    require(['../views/system/Role.vue'], resolve)
                },
                meta: {
                },
            },
        ]
    },
    {
        name: 'userManage',
        path: '/userManage',
        component: function (resolve) {
            require(['../views/system/User.vue'], resolve)
        },
        meta: {
            url:'userManage',
        },
    },
    {
        name: 'logManage',
        path: '/logManage',
        component: function (resolve) {
            require(['../views/system/Log.vue'], resolve)
        },
        meta: {
            url:'logManage',
        },
    },
    {
        name: 'routerManage',
        path: '/routerManage',
        component: function (resolve) {
            require(['../views/system/SystemContainer.vue'], resolve)
        },
        meta: {
            url:'routerManage',
        },
        children: [
            {
                name: 'routerManage-index',
                path: '',
                component: function (resolve) {
                    require(['../views/rcsInfoMgr/RouterManage.vue'], resolve)
                },
                meta: {
                },
            },
            {
                name: 'routerManage-create',
                path: 'create',
                component: function (resolve) {
                    require(['../views/rcsInfoMgr/RouterDetail.vue'], resolve)
                },
                meta: {
                    name:'新增路由'
                },
            },
            {
                name: 'routerManage-edit',
                path: 'edit',
                component: function (resolve) {
                    require(['../views/rcsInfoMgr/RouterDetail.vue'], resolve)
                },
                meta: {
                    name:'编辑路由'
                },
            },
        ]
    },
    {
        name: 'sensitivityManage',
        path: '/sensitivityManage',
        component: function (resolve) {
            require(['../views/system/Sensitivity.vue'], resolve)
        },
        meta: {
            url:'sensitivityManage',
        },
    },
    {
        name: 'whiteBlackManage',
        path: '/whiteBlackManage',
        component: function (resolve) {
            require(['../views/system/WhiteBlack.vue'], resolve)
        },
        meta: {
            url:'whiteBlackManage',
        },
    },
    {
        name: 'systemConfig',
        path: '/systemConfig',
        component: function (resolve) {
            require(['../views/system/SystemConfig.vue'], resolve)
        },
        meta: {
            url:'systemConfig',
        },
    },
    {
        name: 'dataQuery',
        path: '/dataQuery',
        component: function (resolve) {
            require(['../views/statistics/DataQuery.vue'], resolve)
        },
        meta: {
            url:'dataQuery',
        },
    },
    {
        name: 'infoStatistics',
        path: '/infoStatistics',
        component: function (resolve) {
            require(['../views/statistics/InfoStatistics.vue'], resolve)
        },
        meta: {
            url:'infoStatistics',
        },
    },

    //运营管理
    {
        name: 'nonSignatureCsutInfo',
        path: '/nonSignatureCsutInfo',
        component: function (resolve) {
            require(['../views/system/SystemContainer.vue'], resolve)
        },
        meta: {
            url:'nonSignatureCsutInfo',
        },
        children: [
            {
                name: 'nonSignatureCsutInfo-index',
                path: '',
                component: function (resolve) {
                    require(['../views/operate/nonSignatureCsutInfo.vue'], resolve)
                },
                meta: {
                },
            },
        ]
    },
    {
        name: 'chatbotManage',
        path: '/chatbotManage',
        component: function (resolve) {
            require(['../views/operate/chatbotManage.vue'], resolve)
        },
        meta: {
            url:'chatbotManage',
        },
    },
]
