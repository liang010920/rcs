<template>
    <div class="img-plupload">
        <div id="container">
            <a id="selectfiles" href="javascript:void(0);" class="btn select-btn">选择文件</a>
            <a id="postfiles" href="javascript:void(0);" class="btn upload-btn">开始上传</a>
        </div>
        <!--<input type="radio" name="myradio" value="local_name" checked=true/> 上传文件名字保持本地文件名字-->
        <!--<input type="radio" name="myradio" value="random_name" /> 上传文件名字是随机文件名, 后缀保留-->
        <div id="ossfile"></div>

        <pre id="console"></pre>

        <ul class="folder-type-img">
            <li :class="['item',{'light':img.beLight}]" v-for="img in imgList">
                <!--<img class="small-img" src="https://qyb-bucket.oss-cn-qingdao.aliyuncs.com/dev/resource/9ebad6108f8b951daba8d7b16df26ad6.jpg" alt="">-->
                <img class="small-img" :src="img.src" alt="">
                <div class="img-progress" v-show="img.percent>0&&img.percent<100">
                    <el-progress class="circle-progress" type="circle" :width="110" :percentage="img.percent"></el-progress>
                </div>
                <div class="mask">
                    <span class="scale control" @click="scaleImg(img)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="del control" @click.stop="deleteImg(img)">
                        <i class="el-icon-delete"></i>
                    </span>
                </div>
                <span class="success" v-show="img.beUpload">
                    <i class="el-icon-upload-success el-icon-check"></i>
                </span>
            </li>
        </ul>

        <el-dialog
            title=""
            :visible.sync="dialogImgFlag"
            width="50%">
            <div>
                <img style="width:100%" :src="selectImgSrc" alt="">
            </div>

        </el-dialog>


    </div>
</template>

<script>
    import plupload from "plupload";
    import {ossPath} from '../config/config'
    var accessid = "";
    var accesskey = "";
    var host = "";
    var policyBase64 = "";
    var signature = "";
    var callbackbody = "";
    var filename = "";
    var key = "";
    var expire = 0;
    var g_object_name = "";
    var g_object_name_type = "";
    var now = Date.parse(new Date()) / 1000;
    var timestamp = Date.parse(new Date()) / 1000;

    function send_request(folderType) {
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xmlhttp != null) {
            // serverUrl是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
            // serverUrl = 'http://88.88.88.88:8888/aliyun-oss-appserver-php/php/get.php'
            let serverUrl = ossPath +"?folderType="+folderType ;

            xmlhttp.open("GET", serverUrl, false);
            xmlhttp.send(null);
            return xmlhttp.responseText;
        } else {
            alert("Your browser does not support XMLHTTP.");
        }
    }

    function check_object_radio() {
        var tt = document.getElementsByName("myradio");
        for (var i = 0; i < tt.length; i++) {
            if (tt[i].checked) {
                g_object_name_type = tt[i].value;
                break;
            }
        }
    }

    function get_signature(folderType) {
        // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
        now = timestamp = Date.parse(new Date()) / 1000;
        if (expire < now + 3) {
            let body = send_request(folderType);
            // console.log('body:',body)
            var obj = eval("(" + body + ")");
            host = obj["host"];
            policyBase64 = obj["policy"];
            accessid = obj["accessid"];
            signature = obj["signature"];
            expire = parseInt(obj["expire"]);
            callbackbody = obj["callback"];
            key = obj["dir"];
            return true;
        }
        return false;
    }

    function random_string(len) {
        len = len || 32;
        var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        var maxPos = chars.length;
        var pwd = "";
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    function get_suffix(filename) {
        let pos = filename.lastIndexOf(".");
        let suffix = "";
        if (pos != -1) {
            suffix = filename.substring(pos);
        }
        return suffix;
    }

    function calculate_object_name(filename) {
        // if (g_object_name_type == "local_name") {
        //     g_object_name += "${filename}";
        // } else if (g_object_name_type == "random_name") {
        //     let suffix = get_suffix(filename);
        //     g_object_name = key + random_string(10) + suffix;
        // }
        g_object_name = key + filename
        return "";
    }

    function get_uploaded_object_name(filename) {
        // if (g_object_name_type == "local_name") {
        //     let tmp_name = g_object_name;
        //     tmp_name = tmp_name.replace("${filename}", filename);
        //     return tmp_name;
        // } else if (g_object_name_type == "random_name") {
        //     return g_object_name;
        // }
        return g_object_name;
    }

    function set_upload_param(up, filename, ret,folderType) {
        if (ret == false) {
            ret = get_signature(folderType);
        }
        g_object_name = key;
        if (filename != "") {
            let suffix = get_suffix(filename);
            calculate_object_name(filename);
        }
        let new_multipart_params = {
            key: g_object_name,
            policy: policyBase64,
            OSSAccessKeyId: accessid,
            success_action_status: "200", //让服务端返回200,不然，默认会返回204
            callback: callbackbody,
            signature: signature
        };

        // console.log('new_multipart_params',new_multipart_params)

        up.setOption({
            url: host,
            multipart_params: new_multipart_params
        });

        up.start();
    }

    import {Utils} from '../plugins/utils'
    export default {

        props: {
            msg: "",
            limit:{type:Number,default:1},
            folderType:{default: 'audio'},//上传目录
            type:{default:'audio'}//文件类型 img 图片；audio 语音；video 视频；zip 压缩文件；
        },
        data() {
            return {
                url: this.msg || "",
                fileList:[],
                fileName:'',
                imgList:[],
                uploaderObj:{},
                dialogImgFlag:false,
                selectImgSrc:'',
                mimeTypes:[],
            }
        },
        mounted() {
            if (this.type=='audio'){
                this.mimeTypes.push({ title: "Audio files", extensions: "mp3" })
            } else if(this.type='img'){
                this.mimeTypes.push({ title: "Image files", extensions: "jpg,jpeg,png" })
            }else if (this.type='video'){
                this.mimeTypes.push({ title: "Video files", extensions: "avi,flv,mp4" })
            }
            this.initPlUploader();
        },
        methods: {
            initPlUploader() {
                let _self=this;
                var uploader = new plupload.Uploader({
                    runtimes: "html5,flash,silverlight,html4",
                    browse_button: "selectfiles",
                    container: document.getElementById('container'),
                    // flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
                    // silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
                    url: "http://oss.aliyuncs.com",
                    multi_selection:false,
                    filters: {
                        // mime_types: [
                        //只允许上传图片和zip文件
                        // { title: "Video files", extensions: "avi,flv,mp4" },
                        // { title: "Image files", extensions: "jpg,jpeg,png" },
                        // { title: "Audio files", extensions: "mp3" },
//                            { title: "Zip files", extensions: "zip,rar,ipa" }
//                         ],
                        mime_types: _self.mimeTypes,
                        max_file_size: "100mb", //最大只能上传100mb的文件
                        prevent_duplicates: false //不允许选取重复文件
                    },

                    init: {
                        PostInit: function() {
                            // document.getElementById("ossfile").innerHTML = "";
                            document.getElementById("postfiles").onclick = function() {
                                set_upload_param(uploader, "", false,_self.folderType);
                                return false;
                            };
                        },

                        FilesAdded: function(up, files) {
                            let fileCount = document.getElementById("ossfile").childElementCount
                            // console.log('this.files.length:',this.files.length)
                            // console.log('_self.fileList.length:',_self.fileList.length)
                            if (_self.fileList.length>=_self.limit||fileCount>=_self.limit||_self.imgList.length>=_self.limit){
                                this.removeFile(files[0])
                                // alert('只能上传一个文件')
                                _self.$message.error('只能上传一个文件');
                                return
                            }
                            let nativeFile = files[0].getNative();

                            let utils = new Utils()
                            utils.getFileMD5(nativeFile,md5=>{
                                let suffix = get_suffix(nativeFile.name);
                                _self.fileName = md5+suffix

                                console.log("----FilesAdded_self.type:",_self.type)

                                if (_self.type=='img'){
                                    let imgSrc = URL.createObjectURL(nativeFile)
                                    let img = {src:imgSrc,beUpload:false,id:files[0].id,percent:0,md5Name:_self.fileName,beLight:true}
                                    _self.imgList.push(img)
                                    setTimeout(()=>{
                                        img.beLight = false
                                    },600)
                                } else{
                                    plupload.each(files, function(file) {
                                        document.getElementById("ossfile").innerHTML +=
                                            '<div class="upload-file" id="' +
                                            file.id +
                                            '">' +
                                            '<span class="file-name o-ellipsis">'+
                                            file.name +
                                            '</span>' +
                                            "<span class='file-size'> (" +
                                            plupload.formatSize(file.size) +
                                            ")</span><b class='file-percent'></b>" +
                                            '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '<i class="file-delete" fid="'+file.id+'" mid="'+_self.fileName+'"></i>'+
                                            "</div>";
                                    });
                                }

                            })


                        },

                        BeforeUpload: function(up, file) {
                            // check_object_radio();
                            // console.log('finame:::',_self.fileName)
                            set_upload_param(up, _self.fileName, true);
                        },

                        UploadProgress: function(up, file) {
                            if (_self.type=='img'){
                                let img = {}
                                for (let i=0;i<_self.imgList.length;i++){
                                    img = _self.imgList[i]
                                    if (img.id==file.id){
                                        img.percent = file.percent
                                        break
                                    }
                                }
                            } else{
                                var d = document.getElementById(file.id);
                                d.getElementsByTagName("b")[0].innerHTML =
                                    "<span class='pro-percent'>" + file.percent + "%</span>";

                                var prog = d.getElementsByTagName("div")[0];
                                var progBar = prog.getElementsByTagName("div")[0];
                                progBar.style.width = 3.6 * file.percent + "px";
                                progBar.setAttribute("aria-valuenow", file.percent);
                            }
                        },

                        FileUploaded: function(up, file, info) {
                            if (info.status == 200) {
                                // document
                                //     .getElementById(file.id)
                                //     .getElementsByTagName("b")[0].innerHTML =
                                //     "upload to oss success, object name:" +
                                //     get_uploaded_object_name(file.name) +
                                //     " 回调服务器返回的内容是:" +
                                //     info.response;
                                console.log("upload to oss success, object name:" +get_uploaded_object_name(file.name) +" 回调服务器返回的内容是:" +info.response)
                                //获取路径
                                _self.url=host+"/"+get_uploaded_object_name(file.name);
                                _self.fileList.push(_self.fileName)
                                console.log("---------FileUploaded_self.type:",_self.type);
                                if (_self.type == 'img'){
                                    _self.imgList.forEach(img=>{
                                        if (img.id==file.id){
                                            img.beUpload=true
                                        }
                                    })
                                }
                                console.log("file url:"+_self.url);
                                // 传值给父组件
                                _self.$emit('sendValueToParent',_self.url);
                            } else if (info.status == 203) {
                                document
                                    .getElementById(file.id)
                                    .getElementsByTagName("b")[0].innerHTML =
                                    "上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:" +
                                    info.response;
                            } else {
                                document
                                    .getElementById(file.id)
                                    .getElementsByTagName("b")[0].innerHTML = info.response;
                            }
                        },

                        Error: function(up, err) {
                            if (err.code == -600) {
                                document
                                    .getElementById("console")
                                    .appendChild(
                                        document.createTextNode(
                                            "\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"
                                        )
                                    );
                            } else if (err.code == -601) {
                                document
                                    .getElementById("console")
                                    .appendChild(
                                        document.createTextNode(
                                            "\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"
                                        )
                                    );
                            } else if (err.code == -602) {
                                // document
                                //     .getElementById("console")
                                //     .appendChild(
                                //         document.createTextNode("\n这个文件已经上传过一遍了")
                                //     );
                                console.error('-------这个文件已经在列表里了')
                            } else {
                                document
                                    .getElementById("console")
                                    .appendChild(
                                        document.createTextNode("\nError xml:" + err.response)
                                    );
                            }
                        }
                    }
                });
                uploader.init();

                let upFiles = uploader.files
                this.uploaderObj = uploader

                $(document).on('click','.file-delete',function (e) {
                    console.log('llll:',upFiles)
                    let mid = $(this).attr('mid')
                    let fid = $(this).attr('fid')
                    // console.log('mid:',mid)
                    // console.log('fid:',fid)
                    $(this).parent().remove()
                    let pos = _self.fileList.indexOf(mid)
                    if (pos>-1) {
                        _self.fileList.splice(pos,1)
                    }

                    let delIndex= ''
                    upFiles.forEach((val,index)=>{
                        if (val.id==fid) {
                            delIndex = index
                        }
                    })

                    if (delIndex||delIndex==0) {
                        upFiles.splice(delIndex,1)
                    }
                    // 传值给父组件
                    _self.$emit('sendValueToParent','');

                    e.stopPropagation()
                })
            },
            scaleImg(img){
                this.dialogImgFlag = true
                this.selectImgSrc = img.src
            },
            deleteImg(img){
                let index,md5Name,imgFlag=false,fileId
                this.imgList.forEach((value,i)=>{
                    if (value.id==img.id) {
                        imgFlag = true
                        index = i
                        md5Name = value.md5Name
                        fileId = value.id
                        value.beLight = true
                    }
                })
                // 删除预览的文件
                if (imgFlag){
                    setTimeout(()=>{
                        this.imgList.splice(index,1)
                    },600)
                }

                // 删除已上传的文件
                let pos = this.fileList.indexOf(md5Name)
                if (pos>-1) {
                    this.fileList.splice(pos,1)
                }

                // 删除uploader对象的文件
                let delIndex= ''
                this.uploaderObj.files.forEach((val,index)=>{
                    if (val.id==fileId) {
                        delIndex = index
                    }
                })

                if (delIndex||delIndex==0) {
                    this.uploaderObj.files.splice(delIndex,1)
                }

                //目前只考虑传一个文件
                //删除当前文件后告诉父页面图片删除
                this.$emit('sendValueToParent','');
            },
            getFileString(){
                let fileString = ''
                this.fileList.forEach((value, index)=> {
                    if (this.fileList.length == index + 1) {
                        fileString += value;
                    } else {
                        fileString += value + ",";
                    }
                });
                return fileString
            },
            setFileString(fileString,type){//(banners,'brand')
                if (fileString){
                    fileString.split(",").forEach((value,index) => {
                        let url = this.$options.filters.imgPath(value, type)
                        if (this.type=='img') {
                            this.imgList.push({src:url,beUpload:true,id:0,percent:100,md5Name:value})
                        }else{
                            document.getElementById("ossfile").innerHTML +=
                                '<div class="upload-file" id="file' +
                                index +
                                '">' +
                                '<span class="file-name o-ellipsis">'+
                                value +
                                '</span>' +
                                '<b class="file-percent">100%</b>' +
                                '<div class="progress"><div class="progress-bar" style="width: 100%"></div></div>' +
                                '<i class="file-delete" fid="file'+index+'" mid="'+value+'"></i>'+
                                "</div>";
                        }
                        this.fileList.push(value)
                    })
                }
            },

        },

    };
</script>

<style lang="less">
    @import "../assets/css/plupload.css";
    .img-plupload{
        width: 360px;
        #container{
            margin-bottom: 10px;
        }
        .upload-success{
            color: #67c23a
        }
        .progress{
            margin: 0;
            height: 5px;
            width: 360px;
        }
        .progress-bar{
            height: 5px;
            width: 360px;
        }
        .pro-percent{
            margin-left: 5px;
        }
        #console{
            border:none;
        }
        .select-btn{
            color: white;
            transition: all ease .4s;
            background-color: #409eff;
        }
        .select-btn:hover{
            background-color: #66b1ff;
        }
        .upload-btn{
            color: white;
            margin-left: 10px;
            transition: all ease .4s;
            background-color: #67c23a;
        }
        .upload-btn:hover{
            background-color: #85ce61;
        }
        .file-delete{
            margin-top: -27px;
            float: right;
            font-family: element-icons!important;
            speak: none;
            font-style: normal;
            font-weight: 400;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: baseline;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
        }
        .file-delete:before{
            content: "\E6DB";
        }
        .file-name{
            display: inline-block;
            margin-right: 5px;
            max-width: 230px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .file-size,.file-percent{
            display: inline-block;
            vertical-align: top;
        }
        .upload-file{
            position: relative;
            margin-top: 8px;
            line-height: 24px;
        }

        .folder-type-img{
            margin-top: 5px;
            .item{
                position: relative;
                top:0;
                width: 146px;
                height: 146px;
                margin-right: 10px;
                border-radius: 6px;
                overflow: hidden;
                transition: all .6s ease;
                .small-img{
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                }
                .mask{
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,.5);
                    opacity: 0;
                    transition: opacity .3s;
                    .control{
                        position: absolute;
                        top: 50%;
                        color: white;
                        font-size: 20px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .scale{
                        left: 30%;
                        margin-top: -20px;
                    }
                    .del{
                        right: 30%;
                        margin-top: -20px;
                    }
                }
                .success{
                    position: absolute;
                    right: -15px;
                    top: -6px;
                    width: 40px;
                    height: 24px;
                    background: #13ce66;
                    text-align: center;
                    transform: rotate(45deg);
                    box-shadow: 0 0 1px 1px rgba(0,0,0,.2);
                    i{
                        display: inline-block;
                        font-size: 12px;
                        color: white;
                        vertical-align: 1px;
                        transform: rotate(-45deg);
                    }

                }
                .img-progress{
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255,255,255,.8);
                    z-index: 100;
                    .circle-progress{
                        position: absolute;
                        top: 0;
                        left: 18px;
                        top: 18px;
                    }
                    &:hover+.mask{
                        opacity: 0;
                    }
                }
                &:hover .mask{
                    opacity: 1;
                }
                &:hover .success{
                    display: none;
                }
                &.light{
                    top: -8px;
                    opacity: 0;
                }

            }
        }
    }
</style>
