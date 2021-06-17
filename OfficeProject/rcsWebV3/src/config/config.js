/**
 * Created by hlf on 2017/9/21.
 */
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let imgReg = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

let adminServer = '';
let adminClient = '';
let imageRootPath = '';
let ossPath = '';
let mobileClient = '';
let ossRegion = '';
let ossBucket = '';
let currentEnvironment = '';


// 导出手环记录时的直接请求路径
let adminUrl = '';

$.ajax({
    url:'./static/application.json',
    type:'GET', //GET
    async:false, //或false,是否异步
    data:{
    },
    timeout:500, //超时时间
    dataType:'json', //返回的数据格式：
    beforeSend:function(xhr){
    },
    success:function(data,textStatus,jqXHR){
        adminServer = data[data['curENV']]['adminServer'];
        adminClient = data[data['curENV']]['adminClient'];
        imageRootPath = data[data['curENV']]['imageRootPath'];
        adminUrl = data[data['curENV']]['adminUrl'];
        ossPath = data[data['curENV']]['ossPath'];
        mobileClient = data[data['curENV']]['mobileClient'];
        currentEnvironment = data[data['curENV']]['currentEnvironment'];

        ossRegion = data['ossRegion'];
        ossBucket = data['ossBucket'];
    },
    error:function(xhr,textStatus){
        console.log('can not load the server config!')
    },
    complete:function(){
    }
})


export {
    adminClient,
    adminServer,
    imageRootPath,
    imgReg,
    adminUrl,
    ossPath,
    mobileClient,
    currentEnvironment,
    ossRegion,
    ossBucket,
}
