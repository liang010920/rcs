export default [
    {
        name: 'infoPush',
        path: '/infoPush',
        component: function (resolve) {
            require(['../views/rcsInfoMgr/RcsSend.vue'], resolve)
        },
        meta: {
            url:'infoPush',
        }
    },
    {
        name: 'pushList',
        path: '/pushList',
        component: function (resolve) {
            require(['../views/common/EmptyContainer.vue'], resolve)
        },
        meta: {
            url:'pushList',
        },
        children: [
            {
                name: 'pushList-index',
                path: '',
                component: function (resolve) {
                    require(['../views/rcsInfoMgr/RcsOutbox.vue'], resolve)
                },
            },
            {
                name: 'infoPush',
                path: 'infoPush',
                component: function (resolve) {
                    require(['../views/rcsInfoMgr/RcsSend.vue'], resolve)
                },
                meta: {
                    name:'新建推送',
                },
            }
        ]
    },
    {
        name: 'mediaManage',
        path: '/mediaManage',
        component: function (resolve) {
            require(['../views/common/EmptyContainer.vue'], resolve)
        },
        meta: {
            url:'mediaManage',
        },
        children:[
            {
                name: 'mediaManage-index',
                path: '',
                component: function (resolve) {
                    require(['../views/resource/MediaManage.vue'], resolve)
                },

            },
            {
                name: 'createMedia',
                path: 'create',
                component: function (resolve) {
                    require(['../views/resource/MediaDetail.vue'], resolve)
                },
                meta: {
                    name:'新建媒体'
                },
            },
            {
                name: 'mediaDetail',
                path: 'edit',
                component: function (resolve) {
                    require(['../views/resource/MediaDetail.vue'], resolve)
                },
                meta: {
                    name:'编辑媒体'
                },
            },
        ]
    },
    {
        name: 'infoUp',
        path: '/infoUp',
        component: function (resolve) {
            require(['../views/rcsInfoMgr/RcsInbox.vue'], resolve)
        },
        meta: {
            url:'infoUp',
        },
    },
    {
        name: 'groupManage',
        path: '/groupManage',
        component: function (resolve) {
            require(['../views/contact/Contact.vue'], resolve)
        },
        meta: {
            url:'groupManage',
        },
    },
    {
        name: 'applicationManage',
        path: '/applicationManage',
        component: function (resolve) {
            require(['../views/api/ChatbotManage.vue'], resolve)
        },
        meta: {
            url:'applicationManage',
        }
    },
    {
        name: 'mmsTaskManage',
        path: '/mmsTaskManage',
        component: function (resolve) {
            require(['../views/mms/MmsTaskManage.vue'], resolve)
        },
        meta: {
            url:'mmsTaskManage',
        },
    },
    {
        name: 'mmsTemplateManage',
        path: '/mmsTemplateManage',
        component: function (resolve) {
            require(['../views/mms/MmsTemplateManage.vue'], resolve)
        },
        meta: {
            url:'mmsTemplateManage',
        },
    },

]




// export default [
//
//     {
//         name: 'infoPush',
//         path: '/infoPush',
//         component: function (resolve) {
//             require(['../views/article/ArticleContainer.vue'], resolve)
//         },
//         meta: {
//             url:'infoPush',
//         },
//         children: [
//             {
//                 name: 'homeBannerList',
//                 path: '',
//                 component: function (resolve) {
//                     require(['../views/article/ArticleManage.vue'], resolve)
//                 },
//
//             },
//         ]
//     },
//
// ]
