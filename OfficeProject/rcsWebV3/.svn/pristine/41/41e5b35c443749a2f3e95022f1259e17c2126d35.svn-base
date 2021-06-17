export default [
    {
        name: 'customerManage',
        path: '/customerManage',
        component: function (resolve) {
            require(['../views/common/EmptyContainer.vue'], resolve)
        },
        meta: {
            url:'customerManage',
        },
        children:[
            {
                name: 'customerManage-index',
                path: '',
                component: function (resolve) {
                    require(['../views/customer/Customer.vue'], resolve)
                },
            },
            {
                name: 'addMember',
                path: 'addMember',
                component: function (resolve) {
                    require(['../views/customer/AddCustomer.vue'], resolve)
                },
                meta: {
                    name:'新增企业',
                },
            },
            {
                name: 'editMember',
                path: 'editMember',
                component: function (resolve) {
                    require(['../views/customer/AddCustomer.vue'], resolve)
                },
                meta: {
                    name:'编辑企业',
                },
            }
        ]
    },
    {
        name: 'rcsPassageway',
        path: '/rcsPassageway',
        component: function (resolve) {
            require(['../views/gateway/Chatbot.vue'], resolve)
        },
        meta: {
            url:'rcsPassageway',
        }
    }
]
