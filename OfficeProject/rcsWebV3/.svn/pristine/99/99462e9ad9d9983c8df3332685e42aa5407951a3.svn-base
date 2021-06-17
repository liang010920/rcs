
<!-- 改造为前端表单直传OSS，资源不用发送给后台服务器。
     为了安全性考虑，采用STSToken -->

<template>
    <div class="my-uplod-file">
        <el-upload
            :class="{disabled:uploadDisabled}"
            :action="uploadImgUrl"
            :http-request="emptyFunc"
            list-type="picture-card"
            :before-upload="beforeImgUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleImgRemove"
            :file-list="fileList"
            :before-remove="beforeImgRemove"
            :on-change="onImgChange">
            <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <!-- 剪裁组件弹窗 -->
        <el-dialog :visible.sync="cropperModel" width="1100px" append-to-body :close-on-click-modal="false" :title="cropperTitle">
            <Cropper :img-file="fileUrl" :fixed-number="fixedNumber" ref="vueCropper" @uploadToOss="uploadToOss">
            </Cropper>
        </el-dialog>
    </div>

</template>
<script>
    import Cropper from './Cropper.vue'
    import {getStsToken} from '../api/api.js'
    import {Utils} from '../plugins/utils'
    import {imageRootPath, ossRegion, ossBucket,adminServer} from '../config/config'
    var OSS = require('ali-oss')

    export default {
        components: {Cropper},

        data() {
            return{
                uploadImgUrl: '',   //elementUI默认的上传行为；此值为空，则由http-request来控制上传。
                dialogImageUrl: '',
                dialogVisible: false,
                ut: new Utils(),
                uploadDisabled: false,
                fileList:[],      //上传成功或者删除操作，都将更新该数组，它按页面显示顺序存储当前的文件列表, {name: '11.jpg', url: 'https://img.jpg'}
                fileUrl: '',
                cropperModel: false,
                cropperTitle: '建议图片宽高比  ',
                stsToken: ''
            }
        },
        props:['folderType', 'maxNum', 'isTicketImg', 'ticketId', 'bePush', 'fixedNumber'],  //maxNum: 最大张数; isTicketImg: 父组件是否是优惠券页面，如果是，则需要立马将图片地址保存至数据库
        watch: {
            fileList: {
                handler(newValue){
                    //解决修改页面时进入到页面出现有5张图时还可以添加图片的问题
                    let allowedNum = this.maxNum ? this.maxNum : 5;  //如果不指定图片张数限制，则默认5张
                    this.uploadDisabled = (newValue.length >= allowedNum)
                },
                immediate: true
            }

        },
        methods: {
            //这里配置空函数，是将最终上传控制交给Cropper
            emptyFunc(){

            },
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            onImgChange (file, fileList) {
                // 弹出剪裁框，将当前文件设置为文件
                this.fileUrl = file.url;
                this.cropperModel = true;
                /**
                 * 解决bug:未上传关闭裁剪框时，会显示最后添加的图片，fileList中会把该图片添加到末尾，状态为ready
                 * 而upload组件将会根据fileList的数据进行显示，所以，需要将最后一张图片删除
                 */
                fileList.splice(fileList.length-1,1)
            },

            /**
             * 创建oss客户端对象
             * @returns {*}
             */
            createOssClient () {
                return new Promise((resolve, reject) => {
                    let client = new OSS({
                        region: ossRegion,
                        accessKeyId: this.stsToken.credentials.accessKeyId,
                        accessKeySecret: this.stsToken.credentials.accessKeySecret,
                        stsToken: this.stsToken.credentials.securityToken,
                        bucket: ossBucket
                    })
                    resolve(client)
                })
            },

            /**
             * oss客户端上传文件
             */
            postToOss(client, fileName, file){
                return new Promise(resolve => {
                    let result = client.put(fileName, file);
                    resolve(result);
                })
            },

            uploadToOss (option, key) {
                let file = option
                const _self = this
                let fileName = imageRootPath.substring(imageRootPath.indexOf("/", 8) + 1) + _self.folderType + "/" + file.name; // 文件名字（相对于根目录的路径 + 文件名）
                /*
                执行上传
                必须等到oss上传成功后再执行fileList的更新操作，但是oss的put操作是异步进行的，因此需要用到Promise，来保证执行顺序
                 */
                _self.createOssClient().then(client => {
                    try{
                        // 上传处理
                        _self.postToOss(client, fileName, file).then(result => {
                            _self.$refs.vueCropper.isDisabled = false;
                            _self.cropperModel = false;
                            let banner = {};
                            banner.name = file.name;
                            banner.url = imageRootPath + _self.folderType + "/" + file.name;
                            _self.fileList.push(banner);

                            let allowedNum = _self.maxNum ? _self.maxNum : 5;  //如果不指定图片张数限制，则默认5张
                            _self.uploadDisabled = (_self.fileList.length >= allowedNum);

                            //保存图片地址至mysql
                            if(_self.isTicketImg){
                                _self.$emit('saveImgUrl', _self.ticketId, file.name);  //触发父组件的@saveImgUrl
                            }
                        })
                    }catch (e) {
                        console.log(e);
                        _self.$message({
                            showClose: true,
                            message: '文件上传失败',
                            type: 'error',
                            duration: 1500
                        });
                        _self.$refs.vueCropper.isDisabled = false;
                    }
                });
            },

            //判断图片大小，并从后台获取stsToken
            beforeImgUpload: function (file) {
                let _self = this
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt3M = file.size / 1024 / 1024 < 3;
                if (!isJPG && !isPNG) {
                    _self.$message.error('图片必须是 JPG或PNG 格式!');
                    return false;
                }
                if (!isLt3M) {
                    _self.$message.error('图片大小不能超过3MB!');
                    return false;
                }
                //从后台获取stsToken
                getStsToken().then(function (rsp) {
                    if (rsp.success) {
                        _self.stsToken = rsp.data;
                    } else {
                        _self.$message.error(rsp.message);
                        return false;
                    }
                })
                return true;
            },

            beforeImgRemove(file, fileList){
                let _self = this;
                if(_self.isTicketImg && _self.bePush == 1){
                    _self.$message.error('已推送的券不能修改图片!');
                    return false;
                }
            },
            handleImgRemove: function (file, fileList) {
                let _self = this;
                let remIndex = null;
                _self.fileList.forEach(function (value, index) {
                    if (value.name == file.name || value.uid == file.uid) {
                        remIndex = index;
                    }
                })

                if (!_self.ut.isEmpty(remIndex)) {
                    _self.fileList.splice(remIndex, 1);

                    // //保存图片地址至mysql
                    if(_self.isTicketImg){
                        _self.$emit('saveImgUrl', _self.ticketId, '');  //触发父组件的@saveImgUrl
                    }
                }

                let allowedNum = _self.maxNum ? _self.maxNum : 5;  //如果不指定图片张数限制，则默认5张
                _self.uploadDisabled = (_self.fileList.length >= allowedNum);
            },
            handlePictureCardPreview: function (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            getFileString(){
                let fileString = ''
                this.fileList.forEach((value, index)=> {
                    if (this.fileList.length == index + 1) {
                        fileString += value.name;
                    } else {
                        fileString += value.name + ",";
                    }
                });
                return fileString
            },
            setFileString(fileString,type){//(banners,'brand')
                if (fileString){
                    fileString.split(",").forEach(value => {
                        let object = {};
                        object.name = value;
                        object.url = this.$options.filters.imgPath(value, type)
                        this.fileList.push(object);
                    })
                }
            }

        },

        mounted() {
            let _self = this;
            _self.cropperTitle += _self.fixedNumber[0] + ":" + _self.fixedNumber[1];
        }

    }
</script>

<style lang="less">
    .my-uplod-file {
        .disabled .el-upload--picture-card {
            display: none;
        }
    }
</style>
