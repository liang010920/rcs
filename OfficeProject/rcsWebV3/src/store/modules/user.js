
import {Utils} from '../../plugins/utils'
import { dynamicRouter,layoutRouter } from '../../router'

import {logout} from '../../../src/api/api'
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterDynamicRouter(dynamicRouter, role) {
//     dynamicRouter.forEach(function(value, i){
//         if (value.meta.roles.indexOf(role) > -1){
//             layoutRouter.children.push(value)
//         }
//     })
//
//     let tmpArray = []
//     tmpArray.push(layoutRouter)
//     return tmpArray
// }

function filterDynamicRouter(dynamicRouter, menuList) {
    let ut = new Utils();
    layoutRouter.children = []  //清空
    menuList.forEach(function(value, index){
        for (let i = 0; i < dynamicRouter.length; i++){
            if (value.url == dynamicRouter[i].meta.url){
                dynamicRouter[i].meta.name = value.name;
                layoutRouter.children.push(dynamicRouter[i])
                if(ut.isEmpty(dynamicRouter[i].meta.defaultPath)){
                    value.path = dynamicRouter[i].path;
                }
                else{
                    value.path = dynamicRouter[i].meta.defaultPath;
                }

                continue;

            }

            if(ut.isEmpty(value.submenuList)){
                continue;
            }

            for (let k = 0; k < value.submenuList.length; k++){
                if(value.submenuList[k].url == dynamicRouter[i].meta.url){
                    dynamicRouter[i].meta.name = value.submenuList[k].name;
                    layoutRouter.children.push(dynamicRouter[i])
                    if(ut.isEmpty(dynamicRouter[i].meta.defaultPath)){
                        value.submenuList[k].path = dynamicRouter[i].path;
                    }
                    else{
                        value.submenuList[k].path = dynamicRouter[i].meta.defaultPath;
                    }
                    break;
                }
            }
        }
    })

    let tmpArray = []
    tmpArray.push(layoutRouter)
    return tmpArray
}


const user = {
    state: {
        userName:'',
        jwtToken: '',
        roleId: '',
        userType:'',
        menuList: [],
        dynamicRouters: [],
        userInfo:{},
        customerId:0,
        userId:0,
    },
    mutations: {
        SET_USER_INFO: (state, userInfoStr) => {
            let userInfo = JSON.parse(userInfoStr);
            state.userInfo = userInfo
            state.jwtToken = userInfo.jwtToken;
            state.userName = userInfo.userName;
            state.roleId = userInfo.roleId;
            state.userType = userInfo.userType;//用户类型 1-内部系统用户 2-外部企业客户
            state.customerId = userInfo.customerId
            state.userId = userInfo.userId
            state.menuList = JSON.parse(userInfo.permission);

            //根据用户角色动态添加路由信息
            state.dynamicRouters = filterDynamicRouter(dynamicRouter, state.menuList);

        },
        RESET_USER_INFO: (state) => {
            state.jwtToken = '';
            state.userName = '';
            state.roleId = '';
            state.menuList = [];
            state.dynamicRouters= [];
        },
    },
    actions: {
        getUserInfoFromSessionStorage({commit}) {
            return new Promise((resolve, reject) => {
                let userInfoStr = sessionStorage.getItem('userInfo');
                let ut = new Utils();
                if (ut.isEmpty(userInfoStr)){
                    reject('error');
                }

                commit('SET_USER_INFO', userInfoStr)

                resolve()
            })
        },
        // 前端 登出
        logout({ commit }) {
            return new Promise((resolve,reject) => {
                logout({}).then((response) => {
                    sessionStorage.removeItem('userInfo');
                    commit('RESET_USER_INFO');
                    resolve()
                }).catch((err) =>{
                    console.log('err==', err)
                    sessionStorage.removeItem('userInfo');
                    commit('RESET_USER_INFO');
                    reject(err)
                })
            })
        },
    }
}

export default user
