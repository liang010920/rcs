<template>
    <div class="tinymce-editor">
        <editor v-model="htmlString" :init="init" :disabled="disabled">
        </editor>
    </div>
</template>

<script>
    /**
     * 要想使用toolbar必须先引进来
     */
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/modern/theme'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/fullscreen'
    import 'tinymce/plugins/emoticons'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/autosave'
    import 'tinymce/plugins/paste'

    import {uploadFile} from '../api/api.js'
    import {Utils} from '../plugins/utils'

    export default {
        components: {
            Editor
        },
        props: {
            //传入一个value，使组件支持v-model绑定
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            plugins: {
                type: [String, Array],
                default: 'link lists image media table textcolor wordcount contextmenu fullscreen autosave preview paste'
            },
            toolbar: {
                type: [String, Array],
                default: 'fontselect | fontsizeselect | forecolor backcolor | undo redo |  formatselect | bold italic ' +
                '| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table' +
                ' | removeformat | link | fullscreen | preview | autosave'
            }
        },
        data() {
            return {
                //初始化配置
                init: {
                    theme: 'modern',
                    language_url: './static/tinymce/langs/zh_CN.js',
                    skin_url: './static/tinymce/skins/lightgray',
                    language: 'zh_CN',
//                    width:800,
                    height: 400,
                    plugins: this.plugins,
                    toolbar: this.toolbar,
                    branding: false,
                    menubar: false,
                    //不能把这个设置去掉，不然图片路径会出错
                    relative_urls: false,
                    //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                    //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
                    images_upload_handler: (blobInfo, success, failure) => {
                        const isJPG = blobInfo.blob().type === 'image/jpeg';
                        const isPNG = blobInfo.blob().type === 'image/png';
                        const isLt3M = blobInfo.blob().size / 1024 / 1024 < 3;
                        if (!isJPG && !isPNG) {
                            failure('图片必须是 JPG或PNG 格式!')
                            return;
                        }
                        if (!isLt3M) {
                            failure('图片大小不能超过3MB!')
                            return;
                        }

                        this.handleUpload(blobInfo, success, failure)
                    },
                    font_formats: "宋体=宋体;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;Arial=arial,helvetica,sans-serif;" +
                    "Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;" +
                    "Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
                },
                ut: new Utils(),
                htmlString: '',
                submitBtnText: '保存且发布'
            }
        },
        mounted() {
            tinymce.init({})
        },
        methods: {
            handleUpload: function (blobInfo, success, failure) {
                let _self = this;
                const file = blobInfo.blob();

                //计算file的md5 异步操作
                this.ut.getFileMD5(file, md5 => {
                    var formData = new FormData();
                    formData.append("folderType", "resource")
                    formData.append("id", "-1")
                    formData.append("file", file);
                    if (file.type === 'image/jpeg') {
                        formData.append("md5FileName", md5 + ".jpg");
                    } else {
                        formData.append("md5FileName", md5 + ".png");
                    }

                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    uploadFile(...[formData,config]).then((response) => {
                        if (response.success) {
                            let url = _self.$options.filters.imgPath(response.data.md5FileName, 'resource')
                            success(url)
                        } else {
                            failure('上传失败.');
                        }
                    }).catch((error) => {
                        failure(error);
                    })
                })
            },
        },
        watch: {
//            htmlString(newValue) {
//                console.log('this.myValue===', this.myValue)
//            }
        }

    }

</script>
<style lang="less">
    .tinymce-editor {

    }
</style>
