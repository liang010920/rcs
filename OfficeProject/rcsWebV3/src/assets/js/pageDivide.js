
/**
 * Created by xiaohan on 2017-10-19.
 */
//查询数据 带分页
//pagePlugId 分页插件的容器div
//reqFun 向服务器请求数据的函数指针
//jsonData 请求参数
//succCallback 请求数据成功以后的回调函数


import './jquery.page'
import '../css/css.less'

import '../../plugins/bootoast/bootoast.css'
import '../../plugins/bootoast/bootoast.js'


class PageDivide{
    // 构造
    constructor(pagePlugId, reqFun, jsonData, succCallback){
        this.pagePlugId = pagePlugId;
        this.reqFun = reqFun;
        this.jsonData = jsonData;
        this.succCallback = succCallback;
    }

    getDataWithPages(){
        let _self = this;
        this.reqFun(_self.jsonData).then(function (rsp) {
            _self.onSucces(rsp);
            _self.succCallback(rsp);

        }).catch(function (err) {
            console.log(err);
            bootoast({
                message: '请检查网络是否畅通。',
                position:'top',
                timeout:2
            });

        })

        // this.reqFun(_self.jsonData).then((rsp) => {
        //     console.log(rsp)
        // })
    }

    onSucces(rsp){
        var _self = this;
        let pageDividID = '#pageDivideContainer';
        //清除分页（清除事件的影响）
        $(pageDividID).remove();

        //添加分页，从新添加事件。
        $(this.pagePlugId).append("<div id='" + pageDividID.substr(1) + "'></div>");

        //创建翻页插件
        $(pageDividID).createPage
        ({
            pageCount: rsp.data.pageCount,//总页数，数据从服务器获取
            current: rsp.data.pageNo,     //当前是第几页
            backFn: function (p) {
                _self.pageClick(p);
            }
        });

        //给分页插件加上css样式
        $(pageDividID).addClass('tcdPageCode');
    }

    pageClick = function (p) {
        this.jsonData.pageNo = p;
        this.getDataWithPages();
    }
}


export default PageDivide;
