export default [
    {
        name: 'resourceManage',
        path: '/resourceManage',
        component: function (resolve) {
            require(['../views/common/EmptyContainer.vue'], resolve)
        },
        meta: {
            url:'resourceManage',
        },
        children:[
            {
                name: 'resourceManage-index',
                path: '',
                component: function (resolve) {
                    require(['../views/resource/ResourceManage.vue'], resolve)
                },
            },
            {
                name: 'createButton',
                path: 'createButton',
                component: function (resolve) {
                    require(['../views/resource/CreateButton.vue'], resolve)
                },
                meta: {
                    name:'新建按钮',
                },
            },
        ]
    },
	{
		name:'resourceCheck',
		path:'/resourceCheck',
		component:function(resolve){
			require(['../views/resource/ResourceCheck.vue'], resolve)
		},
        meta: {
            url:'resourceCheck',
        }
	}

]
