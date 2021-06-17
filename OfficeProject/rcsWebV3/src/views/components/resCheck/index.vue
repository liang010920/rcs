<template>
    <section class="resource-manage2">
        <el-form :model="params" size="small" label-width="110px">
            <el-form-item label="选择chabot">
                <el-select v-model="params.chatbotId" placeholder="请选择">
                    <el-option v-for="(item,index) in chatbotList" :key="'chatbotId'+index" :label="item.chatbotName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择文件类型">
                <el-select v-model="params.periodFlag" placeholder="请选择">
                    <el-option label="临时文件" :value="1"></el-option>
                    <el-option label="永久文件" :value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-tabs v-model="resourceType" @tab-click="handleClick">
            <el-tab-pane label="图片" name="RESOURCE_IMAGE">
                <image-resource ref="image"></image-resource>
            </el-tab-pane>

            <el-tab-pane label="音频" name="RESOURCE_AUDIO">
                <audio-resource ref="audio"></audio-resource>
            </el-tab-pane>

            <el-tab-pane label="视频" name="RESOURCE_VIDEO">
                <video-resource ref="video"></video-resource>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import VideoResource from './VideoResource'
    import AudioResource from './AudioResource'
    import ImageResource from './ImageResource'
    import {
        getGroupItemCount,
        getGroupListAdditionCount,
        getResourceList,
        delResource,
        getOneResource,
        sendVerifyResource,
        getResourceCheckList,
        chooseResourceCheckList,
        getPasswayList
    } from '../../../api/api'

    export default {
        name: "ResourceManage",
        components: {
            VideoResource,
            AudioResource,
            ImageResource,
        },
        data() {
            return {
                // 1.纯文本，2.图片 3.音频 4.视频 5.卡片 6.vCard
                resourceType: 'RESOURCE_IMAGE',
                searchModel: {},
                checkNames: ['未审核', '审核通过', '审核失败', '审核中'],
                multiType: 0,
                selectAllIndex: 0,
                selectIndex:[],
                params: {
                    chatbotId: 0,
                    periodFlag: 1
                },
                chatbotList:[]
            }
        },
        watch:{
            'params.chatbotId'(val){
                if(this.resourceType == 'RESOURCE_IMAGE'){
                    this.$refs.image.loadData()
                    this.$refs.image.getGroupList()
                }else if(this.resourceType == 'RESOURCE_AUDIO'){
                    this.$refs.audio.loadData()
                    this.$refs.audio.getGroupList()
                }else if(this.resourceType == 'RESOURCE_VIDEO'){
                    this.$refs.video.loadData()
                    this.$refs.video.getGroupList()
                }
            },
            resourceType(val){
                if(val == 'RESOURCE_IMAGE'){
                    this.$refs.image.loadData()
                    this.$refs.image.getGroupList()
                }else if(val == 'RESOURCE_AUDIO'){
                    this.$refs.audio.loadData()
                    this.$refs.audio.getGroupList()
                }else if(val == 'RESOURCE_VIDEO'){
                    this.$refs.video.loadData()
                    this.$refs.video.getGroupList()
                }
            }
        },
        computed: {
            videoUrl() {
                return this.$store.state.app.videoUrl
            }
        },
        provide() {
            return {
                resParent: this,
                scene: this.scene
            }
        },
        methods: {
            getPasswayList() {
                getPasswayList({
                    curPage: 1,
                    size: 1000,
                    chatbotName: '',
                    userId: ''
                }).then(res => {
                    this.chatbotList = res.data.records
                    this.params.chatbotId = this.chatbotList[0].id
                })
            },
            getPasswayListChild(func){
                getPasswayList({
                    curPage: 1,
                    size: 1000,
                    chatbotName: '',
                    userId: ''
                }).then(res => {
                    func(res.data)
                })
            },
            handleClick(tab, event) {
                this.selectIndex = []
            },
            getGroupItemCount(groupType, func) {
                getGroupItemCount({
                    groupType: groupType,
                    groupId: 0,
                    model:'MODEL_NOTCHECK'
                }).then(res => {
                    func(res.code)
                    this.selectAllIndex = res.code
                })
            },
            getResourceList(params, func) {
                getResourceList(params).then(rsp => {
                    if (rsp.success) {
                        func(rsp.data)
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            },
            chooseResourceCheckList(params, func) {
                this.$nextTick(()=>{
                    params.chatbotId = this.params.chatbotId
                    delete params.periodFlag
                    console.log('params:',params)
                    chooseResourceCheckList(params).then(rsp => {
                        if (rsp.success) {
                            func(rsp.data)
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                })
            },

            deleteResource(id, func) {
                delResource({
                    resourceId: String(id)
                }).then(rsp => {
                    if (rsp.success) {
                        this.$message.success('删除成功')
                        func(rsp.data)
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            },
            sendVerifyResource(id, func) {
                sendVerifyResource({
                    resourceId: id
                }).then(rsp => {
                    if (rsp.success) {
                        this.$message.success('提交成功')
                        func(rsp.data)
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            },
            getMedia(media, $refs) {
                let arr = [],
                    obj = {}
                let flag = false
                if (!media.groupId) {
                    flag = true
                }
                if (!media.name) flag = true
                switch (media.groupType) {
                    case 'RESOURCE_TEXT': //text
                        obj.text = media.text
                        if (!obj.text) flag = true
                        arr.push(obj)
                        break;
                    case 'RESOURCE_IMAGE': //pic
                        // obj.image = $refs.imageUploadPre.getFileString()
                        obj.file = $refs.imageUpload.getFileString()
                        if (!obj.file) flag = true
                        arr.push(obj)
                        break;
                    case 'RESOURCE_AUDIO': //audio
                        obj.image = $refs.audioUploadImg.getFileString()
                        obj.file = $refs.audioUpload.getFileString()
                        if (!obj.file) flag = true
                        arr.push(obj)
                        break;
                    case 'RESOURCE_VIDEO': //video
                        obj.image = $refs.videoUploadImg.getFileString()
                        obj.file = $refs.videoUpload.getFileString()
                        if (!obj.file) flag = true
                        arr.push(obj)
                        break;
                    case 'RESOURCE_CARD': //card
                        this.cardList.forEach((card, i) => {
                            obj.image = $refs.cardUpload[i].getFileString()
                            obj.name = card.name
                            obj.text = card.text
                            obj.buttons = card.buttonList
                            arr.push(obj)
                            if (i == this.cardList.length - 1) {
                                if (!obj.image) flag = true
                                if (obj.buttons.length > 0) {
                                    let lastBtn = obj.buttons[obj.buttons.length - 1]
                                    if (!lastBtn.name || !lastBtn.text) flag = true
                                }
                            }
                            obj = {}
                        })
                        break;
                }
                media.content = JSON.stringify(arr)
                if (flag) {
                    return false
                }
                return media
            },
            setMedia(media, $refs) {
                media.type = media.type + ''
                media.resourceId = media.id + ''
                let content = JSON.parse(media.content)
                this.form = media
                switch (media.type) {
                    case 'RESOURCE_TEXT': //text
                        this.form.text = content[0].text
                        break;
                    case 'RESOURCE_IMAGE': //pic
                        // $refs.imageUploadPre.setFileString(content[0].image,'image')
                        $refs.imageUpload.setFileString(content[0].file, 'image')
                        break;
                    case 'RESOURCE_AUDIO': //audio
                        $refs.audioUploadImg.setFileString(content[0].image, 'audio')
                        $refs.audioUpload.setFileString(content[0].file, 'audio')
                        break;
                    case 'RESOURCE_VIDEO': //video
                        $refs.videoUploadImg.setFileString(content[0].image, 'video')
                        $refs.videoUpload.setFileString(content[0].file, 'video')
                        break;
                    case '5': //card
                        this.cardList = []
                        content.forEach((card, i) => {
                            let obj = {}
                            this.$nextTick(_ => {
                                $refs.cardUpload[i].setFileString(card.image, 'card')
                            })
                            obj.name = card.name
                            obj.text = card.text
                            obj.buttonList = card.buttons
                            this.cardList.push(obj)
                        })
                        break;
                }

            },
            initData(id, $refs, func) {
                if (id) {
                    getOneResource({
                        resourceId: Number(id)
                    }).then(rsp => {
                        if (rsp.success) {
                            this.setMedia(rsp.data, $refs)
                            func(rsp.data)
                        }
                    })
                }
            },
            getGroupList(type, func) {
                getGroupListAdditionCount({
                    groupType: type,
                    model:'MODEL_NOTCHECK',
                    chatbotId:this.params.chatbotId
                }).then(rsp => {
                    if (rsp.success) {
                        func(rsp.data)
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            }
        },
        mounted() {
            this.getPasswayList()
        }
    }
</script>

<style lang="less">
    .resource-manage2 {
        margin: 0 auto;
        padding: 0px 50px;

        &.wrap-container {
            // margin-top: 5px;
        }

        .item-desc {
            position: relative;

            h3 {
                font-weight: normal;
            }

            .desc {
                margin: 10px 0;
                font-size: 12px;
            }

            .bottom {
                display: flex;
                justify-content: space-between;
                font-size: 12px;

                .control {
                    margin-top: -3px;
                    font-size: 15px;

                    i {
                        margin: 0 3px;
                        cursor: pointer;
                    }
                }
            }

            .time {
                position: absolute;
                top: -38px;
                left: 2px;
                padding: 2px 8px;
                font-size: 12px;
                color: white;
                border-radius: 20px;
                background-color: rgba(0, 0, 0, .6);
            }
        }

        .check-status {
            display: flex;
            margin-top: 5px;
            justify-content: space-between;
            color: #666;

            .check {
                color: #409EFF;
                cursor: pointer;
            }
        }

        .mr10 {
            margin-right: 10px;
        }

        .el-row {
            .el-button+.el-button {
                margin-left: 0;
            }

            .el-button {
                margin-right: 10px;
                margin-bottom: 8px;
            }

            .clearSpacing {
                .el-button {
                    margin-right: 0px;
                    margin-left: 10px;
                }
            }
        }

    }
</style>
