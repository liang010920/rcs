// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index.js'
import App from './App.vue'
import { imageRootPath } from './config/config'
import { dateFormat } from 'vux'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import utils from './plugins/utils'
import './icons/index'
import store from './store/index'
import '../src/assets/css/element/index.less'
import $ from 'jquery'
import 'default-passive-events'

// 导入vue-echarts插件
import ECharts from 'vue-echarts/components/ECharts'
// 导入echarts的图形类型
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
// 导入工具部分
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title';
// register component to use
import 'echarts/lib/component/legendScroll';
// register component to use
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/toolbox';

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 全局注册chart组件
Vue.component('chart', ECharts)

// import './mock/mock.js'

//富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//=== axios below =====
import axios from 'axios'
//添加响应拦截器
axios.interceptors.response.use(function(response){
    //对响应数据做些事
    let data = response.data
    // 如果用户未登录 移除前端登录标记位
    if(data.code == 2000){
        store.dispatch('logout').then(() => {
            let admin = sessionStorage.getItem("admin");
            if(admin){
                router.push({path:'/login'})
            }else {
                router.push({path:'/customerLogin'})
            }
        })
    }else{
        return response;
    }

},function(error){
    //请求错误时做些事
    return Promise.reject(error);
});


axios.interceptors.request.use(
    config => {
        let jwtToken = store.state.user.jwtToken;
        if (jwtToken) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.jwtToken = jwtToken;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export  {axios}
//=== axios above =====


FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(utils)

router.beforeEach(function (to, from, next) {
    store.commit('UPDATE_LOADING_STATUS', {isLoading: true});
    let admin = sessionStorage.getItem('admin');

    if (to.path === '/login'|| to.path === '/customerLogin'){
        next();
    }
    else {
        //刷新页面时store
        if (store.state.user.userName == ''){
            store.dispatch('getUserInfoFromSessionStorage').then(() => { // 拉取user_info
                router.addRoutes(store.getters.dynamicRouters) // 动态添加可访问路由表
                next({ ...to, replace: true })
            }).catch((err) => {
                console.log('err===', err);
                if(admin){
                    store.dispatch('logout').then(() => {
                        next({ path: '/login' })
                        store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
                    })
                }else {
                    store.dispatch('logout').then(() => {
                        next({ path: '/customerLogin' })
                        store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
                    })
                }
            })
        }
        else {
            next();
        }
    }

})

router.afterEach(function (to) {
    store.commit('UPDATE_LOADING_STATUS', {isLoading: false})

    document.title = '5G消息后台管理系统'
})

Vue.filter('dateFormat', function (time,type) {
    let date = '';
    if(type == 'YMD'){
        date = dateFormat(time, 'YYYY-MM-DD');
    } else if (type == 'HMS'){
        date = dateFormat(time, 'HH:mm:ss');
    } else {
        date = dateFormat(time, 'YYYY-MM-DD HH:mm:ss');
    }
    return date;
})

/**
 * 图片路径过滤器
 * folderType
 *
 */
Vue.filter('imgPath', function(value, folderType, length) {
    if('' == value || undefined == value || value.indexOf("http") >= 0){
        return;
    }
    // 不用考虑类型统一放在一个文件夹
    let imgPath = imageRootPath + value;
    if(length == 1){
        //获取图片的第一张
        imgPath = imageRootPath + value.split(",")[0];
    }
    return imgPath
})

/**
 * 封面过滤器
 * type 资源类型
 * id 营地id 商户id 营地管理员id 资源id
 *
 */
Vue.filter('bannerFilter', function(value,type,id) {
    // console.log("value:",value,",type:",type,",id:",id)
    if('' == value || undefined == value || value.length < 4 ){
        return;
    } else {
        let imgArr = value.split(",");
        let imgPath = imgArr[0];
        if(type == "resource") {//
            imgPath = imageRootPath + 'zjyou4th/'  + 'resource/' + id + "/" + imgPath
        } else if(type == "scenicSpot"){

        }
        return imgPath
    }
})

$(window).on('resize', function () {
    document.documentElement.style.fontSize = ($(document.documentElement).width() / 750) * 100 + 'px';
})
document.documentElement.style.fontSize = ($(document.documentElement).width() / 750) * 100 + 'px';

//ES6.0 way
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app-box')
