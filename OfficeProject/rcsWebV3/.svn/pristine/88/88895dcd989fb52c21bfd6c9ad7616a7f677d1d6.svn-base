import {dateFormat} from 'vux'
import SparkMD5 from 'spark-md5'
import XLSX from 'xlsx';
export default{
    install: function (Vue, options) {

        /**
         * 通过选中的叶子节点拼装完整的json树（保存树时调用）
         * @param checkedLeafNodes 选中的子节点
         * @param allMenuNodes 整棵树的节点
         * @returns {Array}
         */
        Vue.prototype.$getMenuListByCheckedNodes = function (checkedLeafNodes,allMenuNodes) {
            return getMenuList(checkedLeafNodes,allMenuNodes);
        }

        /**
         * 获取菜单树的叶子节点（反选树时调用）
         * @param checkedLeafNodes
         * @returns {Array}
         */
        Vue.prototype.$getLeafMenuIdsByMenuJson = function (menuJson) {
            // 当前选的权限id
            let ownMenu = []
            let menuList = JSON.parse(menuJson)

            try{
                // 取出子节点id用于选中
                menuList.forEach(menu=>{
                    if (menu.submenuList.length>0){
                        menu.submenuList.forEach(sub=>{
                            ownMenu.push(sub.mId)
                        })
                    }else {
                        ownMenu.push(menu.mId)
                    }
                })
            }catch (e) {
                console.log(e)
            }

            return ownMenu;
        }

        /**
         * 获取选中的菜单树
         * eg:
         * [{"mId":1000,"name":"首页管理","url":"","icon":"home","submenuList":[{"mId":1001,"pId":1000,"name":"首页banner管理","url":"homeBanner","icon":"","submenuList":[]},{"mId":1002,"pId":1000,"name":"今日有礼","url":"marketManage","icon":"","submenuList":[]},{"mId":1003,"pId":1000,"name":"商品推荐管理","url":"resourceRecommend","icon":null,"submenuList":[]}]},{"mId":1100,"name":"信息管理","url":"","icon":"infoManage","submenuList":[{"mId":1101,"pId":1100,"name":"供应商列表","url":"supplier/list","icon":"","submenuList":[]},{"mId":1102,"pId":1100,"name":"店铺列表","url":"brand","icon":"","submenuList":[]},{"mId":1103,"pId":1100,"name":"商品列表","url":"resource","icon":"","submenuList":[]},{"mId":1104,"pId":1100,"name":"新增供应商","url":"supplierAdd","icon":"","submenuList":[]}]},{"mId":1200,"name":"地图管理","url":null,"icon":"international","submenuList":[{"mId":1201,"pId":1200,"name":"区域列表","url":"areaList","icon":null,"submenuList":[]},{"mId":1202,"pId":1200,"name":"公共资源列表","url":"publicResourceList","icon":null,"submenuList":[]},{"mId":1203,"pId":1200,"name":"语音列表","url":"mediaList","icon":"","submenuList":[]}]},{"mId":1300,"name":"游客服务","url":"","icon":"user","submenuList":[{"mId":1301,"pId":1300,"name":"游客列表","url":"user","icon":"","submenuList":[]},{"mId":1302,"pId":1300,"name":"建议与投诉","url":"suggestions","icon":null,"submenuList":[]}]},{"mId":1400,"name":"营销管理","url":"","icon":"market","submenuList":[{"mId":1401,"pId":1400,"name":"优惠券","url":"marketList","icon":null,"submenuList":[]}]},{"mId":1500,"name":"内容管理","url":"","icon":"table","submenuList":[{"mId":1501,"pId":1500,"name":"文章列表","url":"articleList","icon":"","submenuList":[]},{"mId":1502,"pId":1500,"name":"旅游订制","url":"customList","icon":"","submenuList":[]}]},{"mId":1600,"name":"订单管理","url":"","icon":"orderManage","submenuList":[{"mId":1601,"pId":1600,"name":"景区门票","url":"experience","icon":"","submenuList":[]},{"mId":1602,"pId":1600,"name":"酒店住宿","url":"stay","icon":"","submenuList":[]},{"mId":1603,"pId":1600,"name":"文创特产","url":"goods","icon":"","submenuList":[]},{"mId":1604,"pId":1600,"name":"餐饮美食","url":"food","icon":"","submenuList":[]},{"mId":1605,"pId":1600,"name":"一卡通","url":"ykt","icon":"","submenuList":[]},{"mId":1606,"pId":1600,"name":"语音媒体","url":"audio","icon":null,"submenuList":[]}]},{"mId":1700,"name":"财务管理","url":"","icon":"money","submenuList":[{"mId":1701,"pId":1700,"name":"收入统计","url":"incomeStatistics","icon":"","submenuList":[]},{"mId":1702,"pId":1700,"name":"对账记录","url":"checkRecord","icon":"","submenuList":[]},{"mId":1703,"pId":1700,"name":"提现列表","url":"withdrawal","icon":null,"submenuList":[]},{"mId":1704,"pId":1700,"name":"退款列表","url":"refund","icon":"","submenuList":[]}]},{"mId":1800,"name":"一卡通管理","url":"","icon":"icon","submenuList":[{"mId":1801,"pId":1800,"name":"手环列表","url":"codeList","icon":"","submenuList":[]},{"mId":1802,"pId":1800,"name":"制作手环","url":"codeMaking","icon":"","submenuList":[]},{"mId":1803,"pId":1800,"name":"一卡通交易","url":"yktTransaction","icon":"","submenuList":[]}]}]             * @returns {string}
         */
        function getMenuList(checkedLeafNodes,allMenuNodes) {
            let menuList = []
            let pIdList = []
            let obj = {}

            // 去重获取父节点pId
            for (let i = 0; i < checkedLeafNodes.length; i++) {
                let leaf = checkedLeafNodes[i]
                if (leaf.pId!=0){
                    let flag = obj[leaf.pId]
                    if (!flag){
                        pIdList.push(leaf.pId)
                        obj[leaf.pId] = 1
                    }
                } else{// 自己就是父节点
                    pIdList.push(leaf.mId)
                }

            }

            // 获取父节点json
            for (let i = 0; i < pIdList.length; i++) {
                menuList.push(createParentMenu(pIdList[i],allMenuNodes))
            }

            // 拼装父节点的子节点
            for (let i = 0; i < menuList.length; i++) {
                let pId = menuList[i].mId
                let submenuList = menuList[i].submenuList

                for (let j = 0; j < checkedLeafNodes.length; j++) {
                    if (pId == checkedLeafNodes[j].pId){
                        submenuList.push(checkedLeafNodes[j])
                    }
                }
            }

            return menuList

        }
        // 创建父节点 只考虑两级的情况
        function createParentMenu(pId,allMenuNodes){
            let menu = {}
            for (let i=0;i<allMenuNodes.length;i++){
                if (allMenuNodes[i].mId==pId){
                    menu = JSON.parse(JSON.stringify(allMenuNodes[i]))
                    menu.submenuList = []
                    break
                }
            }
            return menu
        }

        Vue.prototype.$checkMobile = function (mobile,isShowToast=true) {
            let flag = (/^1[3|4|5|6|7|8|9]\d{9}$/.test(mobile))
            if(!flag&&isShowToast){
                this.$message.warning('手机号码格式不正确')
            }
            return flag
        }

        // 注入组件
        Vue.mixin({
            methods: {
                // 解析为excel为数组
                $excel2Array(evt,fn){
                    let _this = this
                    let file;
                    let files = evt.target.files;

                    if (!files || files.length == 0) return;

                    file = files[0];

                    console.log('start analysis excel ')
                    let loading = this.$loading({text:'请稍后...'})

                    setTimeout(()=>{
                        let reader = new FileReader();
                        reader.onload = function (e) {
                            // pre-process data
                            let binary = "";
                            let bytes = new Uint8Array(e.target.result);

                            // 这种写法可以省去for循环
                            // let data = new Uint8Array(e.target.result);
                            // let wb = XLSX.read(data, {type: 'array'});

                            let length = bytes.byteLength;
                            for (let i = 0; i < length; i++) {
                                binary += String.fromCharCode(bytes[i]);
                            }

                            /* read workbook */
                            let wb = XLSX.read(binary, {type: 'binary'});

                            /* grab first sheet */
                            let wsname = wb.SheetNames[0];
                            let ws = wb.Sheets[wsname];

                            let jsonArray = XLSX.utils.sheet_to_json(ws,{raw:false})
                            console.log('excel json:',jsonArray)

                            fn(jsonArray)
                            loading.close()
                            evt.target.value = ''
                            /* generate HTML */
                            // var HTML = XLSX.utils.sheet_to_html(ws);


                        };

                        reader.readAsArrayBuffer(file);
                    },150)

                },
                // 导出excel
                $array2Excel(arrayData,excelName){
                    let loading = this.$loading({text:'请稍后...'})
                    let data = [
                        [ "no data","no data","no data" ],
                    ]
                    if (!arrayData) {
                        arrayData = data
                    }

                    /* convert from array of arrays to workbook */
                    let worksheet = XLSX.utils.aoa_to_sheet(arrayData);
                    // var worksheet = XLSX.utils.json_to_sheet(data.data);

                    /* generate workbook and add the worksheet */
                    let new_workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(new_workbook, worksheet, "sheet1");

                    /* save to file */
                    XLSX.writeFile(new_workbook, excelName+".xlsx");

                    loading.close()
                }
            }
        })


    },
}


class Utils {
    // 构造函数
    constructor() {
    }

    isEmpty = function (obj) {
        if (obj === null) return true;
        if (typeof obj === 'undefined') {
            return true;
        }
        if (typeof obj === 'string') {
            if (obj === "") {
                return true;
            }
            // var reg = new RegExp("^([ ]+)|([　]+)$");   判断是否为空格
            // return reg.test(obj);
        }
        return false;
    }

    isvalidUsername = function (str) {
        // const valid_map = ['admin', 'editor']
        // return valid_map.indexOf(str.trim()) >= 0
        return !this.isEmpty(str);
    }

    /* 合法uri*/
    validateURL = function (textval) {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        return urlregex.test(textval)
    }

    /* 小写字母*/
    validateLowerCase = function (str) {
        const reg = /^[a-z]+$/
        return reg.test(str)
    }

    /* 大写字母*/
    validateUpperCase = function (str) {
        const reg = /^[A-Z]+$/
        return reg.test(str)
    }

    /* 大小写字母*/
    validateAlphabets = function (str) {
        const reg = /^[A-Za-z]+$/
        return reg.test(str)
    }

    /**
     * validate email
     * @param email
     * @returns {boolean}
     */
    validateEmail = function (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }

    getFileMD5 = function (file, callback) {
        //声明必要的变量
        let fileReader = new FileReader(),
            //文件每块分割2M，计算分割详情
            chunkSize = 2097152,
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,

            //创建md5对象（基于SparkMD5）
            spark = new SparkMD5()

        //每块文件读取完毕之后的处理
        fileReader.onload = function (e) {
            //每块交由sparkMD5进行计算
            spark.appendBinary(e.target.result)
            currentChunk++

            //如果文件处理完成计算MD5，如果还有分片继续处理
            if (currentChunk < chunks) {
                loadNext()
            } else {
                callback(spark.end())
            }
        }

        //处理单片文件的上传
        function loadNext() {
            var start = currentChunk * chunkSize,
                end = start + chunkSize >= file.size ? file.size : start + chunkSize
            fileReader.readAsBinaryString(file.slice(start, end))
        }

        loadNext();
    }


}

export {Utils}
// //判断对象是否为null，undefined，或者字符串为空
// export const isEmpty = function (obj){
//     if (obj === null) return true;
//     if (typeof obj === 'undefined') {
//         return true;
//     }
//     if (typeof obj === 'string') {
//         if (obj === "") {
//             return true;
//         }
//         // var reg = new RegExp("^([ ]+)|([　]+)$");   判断是否为空格
//         // return reg.test(obj);
//     }
//     return false;
// }
//
//
// export function isvalidUsername(str) {
//     const valid_map = ['admin', 'editor']
//     return valid_map.indexOf(str.trim()) >= 0
// }
//
// /* 合法uri*/
// export function validateURL(textval) {
//     const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
//     return urlregex.test(textval)
// }
//
// /* 小写字母*/
// export function validateLowerCase(str) {
//     const reg = /^[a-z]+$/
//     return reg.test(str)
// }
//
// /* 大写字母*/
// export function validateUpperCase(str) {
//     const reg = /^[A-Z]+$/
//     return reg.test(str)
// }
//
// /* 大小写字母*/
// export function validateAlphabets(str) {
//     const reg = /^[A-Za-z]+$/
//     return reg.test(str)
// }
//
// /**
//  * validate email
//  * @param email
//  * @returns {boolean}
//  */
// export function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return re.test(email)
// }
