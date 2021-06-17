<template>
    <div>
        <div class="cropper-content">
            <!-- 剪裁框 -->
            <div class="cropper">
                <vueCropper
                    ref="cropper"
                    :img="imgFile"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    @realTime="realTime"
                    :fixed="option.fixed"
                    :fixedNumber="fixedNumber">
                </vueCropper>
            </div>

            <!-- 预览框 -->
            <div class="show-preview" :style="{'width': '500px', 'height': '400px', 'overflow': 'hidden', 'margin': '0 25px', 'display':'flex', 'align-items': 'center'}">
                <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img">
                </div>
            </div>
        </div>

        <div class="footer-btn">
            <!-- 缩放旋转按钮 -->
            <div class="scope-btn">
                <el-button type="primary" icon="el-icon-zoom-in" @click="changeScale(1)"></el-button>
                <el-button type="primary" icon="el-icon-zoom-out" @click="changeScale(-1)"></el-button>
                <el-button type="primary" @click="rotateLeft">逆时针旋转</el-button>
                <el-button type="primary" @click="rotateRight">顺时针旋转</el-button>
            </div>

            <!-- 确认上传按钮 -->
            <div class="upload-btn">
                <el-button type="primary" :disabled="isDisabled" @click="uploadImg('base64')">上传</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueCropper } from 'vue-cropper';

    export default {
        components: { VueCropper },

        data () {
            return {
                previews: {},   // 预览数据
                option: {
                    img: '',              // 裁剪图片的地址  (默认：空)
                    outputSize: 1,        // 裁剪生成图片的质量  (默认:1)
                    full: true,           // 是否输出原图比例的截图, 选true生成的图片会非常大 (默认false); 此处设置为true，并进行压缩处理
                    outputType: 'png',    // 裁剪生成图片的格式  (默认:jpg)
                    canMove: true,        // 上传图片是否可以移动  (默认:true)
                    original: false,      // 上传图片按照原始比例渲染  (默认:false)
                    canMoveBox: true,     // 截图框能否拖动  (默认:true)
                    autoCrop: true,       // 是否默认生成截图框  (默认:false)
                    autoCropWidth: 480,   // 默认生成截图框宽度  (默认:80%)
                    autoCropHeight: 320,  // 默认生成截图框高度  (默认:80%)
                    fixedBox: false,      // 固定截图框大小 不允许改变  (默认:false)
                    fixed: true,         // 是否开启截图框宽高固定比例  (默认:true)
                    // fixedNumber: [1, 1],  // 截图框比例  (默认:[1:1]), 从父组件获取该值
                    enlarge: 1
                },
                isDisabled: false,
                downImg: '#'
            };
        },
        props: ['imgFile', 'fixedNumber', 'skuname'],
        watch: {
            imgFile: function (file) {
                this.imgFile = file;
            },
            skuname: function (val) {
                this.skuname = val;
            }
        },
        methods: {
            changeScale(num) {
                // 图片缩放
                num = num || 1;
                this.$refs.cropper.changeScale(num);
                // console.log(this.$refs.cropper.scale);
            },
            rotateLeft() {
                // 向左旋转
                this.$refs.cropper.rotateLeft();
            },
            rotateRight() {
                // 向右旋转
                this.$refs.cropper.rotateRight();
            },
            Update() {
                // this.file = this.imgFile
                this.option.img = this.imgFile.url;
            },
            realTime(data) {
                // 实时预览
                this.previews = data;
            },

            //将base64转换为文件
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },

            //生成UUID
            getUuid() {
                var len = 32;    //32长度
                var radix = 16;  //16进制
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
                if(len) {
                    for(i = 0; i < len; i++)uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    for(i = 0; i < 36; i++) {
                        if(!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            },

            // 压缩图片
            compress(img) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                let width = img.width;
                let height = img.height;
                canvas.width = width;
                canvas.height = height;
                // 铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                //进行压缩
                let ndata = canvas.toDataURL("image/jpeg", 0.9);
                return ndata;
            },

            // 将剪裁好的图片回传给父组件
            uploadImg(type) {
                event.preventDefault();
                let that = this;
                that.isDisabled = true;
                if (type === 'blob') {
                    that.$refs.cropper.getCropBlob(data => {
                        that.$emit('uploadToOss', data, that.skuname);
                    });
                } else if(type == 'base64'){
                    let img = new Image();
                    // 将截图框的尺寸换算成图片的真实尺寸，scale: 当前图片的缩放比
                    let cropWidth = that.$refs.cropper.cropW/that.$refs.cropper.scale;
                    let cropHeight = that.$refs.cropper.cropH/that.$refs.cropper.scale;
                    that.$refs.cropper.getCropData(data => {
                        img.src = data;
                        img.width = cropWidth;
                        img.height = cropHeight;
                        //图片加载需要时间，因此应该在onload后再做操作
                        img.onload = function () {
                            let ndata = that.compress(img);
                            let fileCompressed = that.dataURLtoFile(ndata, that.getUuid() + '.jpg');
                            that.$emit('uploadToOss', fileCompressed, that.skuname);
                        };
                    });
                }
            },

        }

    };
</script>

<style>
    .cropper-content {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
    }
    .cropper-content .cropper {
        width: 500px;
        height: 400px;
    }
    .cropper-content .show-preview {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        overflow: hidden;
        border: 1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
    }
    .preview {
        overflow: hidden;
        border: 1px solid #cccccc;
        background: #cccccc;
    }
    .footer-btn {
        margin-top: 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
    }
    .footer-btn .scope-btn {
        width: 250px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .footer-btn .upload-btn {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
    }
    .footer-btn .btn {
        outline: none;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: 0.1s;
        transition: 0.1s;
        font-weight: 500;
        padding: 8px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
    }
</style>
