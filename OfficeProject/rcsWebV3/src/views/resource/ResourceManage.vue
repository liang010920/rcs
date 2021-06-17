<template>
    <section class="resource-manage wrap-container">

        <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
        <!--<el-menu-item index="1">卡片</el-menu-item>-->
        <!--<el-menu-item index="2">文本</el-menu-item>-->
        <!--<el-menu-item index="3">视频</el-menu-item>-->
        <!--<el-menu-item index="4">音频</el-menu-item>-->
        <!--</el-menu>-->

        <el-tabs v-model="resourceType" @tab-click="handleClick">
            <!--<el-tab-pane label="卡片" name="5">-->
            <!--<card-resource></card-resource>-->
            <!--</el-tab-pane>-->

            <!--<el-tab-pane label="文本" name="1">-->
            <!--<text-resource></text-resource>-->
            <!--</el-tab-pane>-->

            <el-tab-pane v-if="(scene==2&&resourceType=='RESOURCE_IMAGE'||multiType==1)||scene==1" label="图片" name="RESOURCE_IMAGE">
                <image-resource></image-resource>
            </el-tab-pane>

            <el-tab-pane v-if="(scene==2&&resourceType=='RESOURCE_AUDIO'||multiType==1)||scene==1" label="音频" name="RESOURCE_AUDIO">
                <audio-resource></audio-resource>
            </el-tab-pane>

            <el-tab-pane v-if="(scene==2&&resourceType=='RESOURCE_VIDEO'||multiType==1)||scene==1" label="视频" name="RESOURCE_VIDEO">
                <video-resource></video-resource>
            </el-tab-pane>

            <!-- <el-tab-pane v-if="(scene==2&&resourceType=='RESOURCE_DOCMENT'||multiType==1)||scene==1" label="文档" name="RESOURCE_DOCMENT">
                <file-resource></file-resource>
            </el-tab-pane> -->

            <!--<el-tab-pane label="按钮" name="sixth">-->
            <!--<button-resource></button-resource>-->
            <!--</el-tab-pane>-->
        </el-tabs>
        <video :src="videoUrl" ref="unseenVideo" preload="metadata" style="position: absolute;left: -3000px"></video>
    </section>
</template>

<script>
    import CardResource from './CardResource'
    import TextResource from './TextResource'
    import VideoResource from './VideoResource'
    import AudioResource from './AudioResource'
    import ImageResource from './ImageResource'
    import ButtonResource from './ButtonResource'
    import FileResource from './FileResource'
    import {
        saveResource,
        saveResourceCatalog,
        addGroup,
        editGroup,
        deleteGroup,
        getGroupItemCount,
        getGroupListAdditionCount,
        getResourceList,
        delResource,
        getOneResource,
        sendVerifyResource,
        getResourceCheckListForTemplate
    } from '../../api/api'

    export default {
        name: "ResourceManage",
        components: {
            CardResource,
            TextResource,
            VideoResource,
            AudioResource,
            ImageResource,
            ButtonResource,
            FileResource
        },
        props: {
            scene: {
                default: 1 //1普通模式2组件模式
            },
            groupType: {
                default: 'RESOURCE_IMAGE'
            },
            chatbotId:{
                default: 0
            }
        },
        watch: {
            groupType: {
                handler(newValue) {
                    if (this.scene == 2) {
                        if (newValue == 'RESOURCE_CARD') {
                            this.resourceType = 'RESOURCE_IMAGE'
                            this.multiType = 1
                        } else {
                            this.resourceType = newValue
                            this.multiType = 0
                        }

                    }
                },
                immediate: true
            }

        },
        data() {
            return {
                // 1.纯文本，2.图片 3.音频 4.视频 5.卡片 6.vCard
                resourceType: 'RESOURCE_IMAGE',
                searchModel: {},
                checkNames: ['未审核', '审核通过', '审核失败', '审核中'],
                multiType: 0,
                selectAllIndex:0
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
                scene: this.scene,
                chatbotId:this.chatbotId
            }
        },
        methods: {
            handleClick() {

            },
            getGroupItemCount(groupType,func) {
				let param={
				    groupType: groupType,
				    groupId: 0
				}
				if(this.scene == 2){
				    param.model = 'MODEL_CHECKSUCCESS'
				}
                // param.chatbotId = this.chatbotId
                getGroupItemCount(param).then(res => {
                    func(res.code)
                    this.selectAllIndex = res.code
                })
            },
            getResourceCheckListForTemplate(params, func) {
                getResourceCheckListForTemplate(params).then(rsp => {
                    if (rsp.success) {
                        func(rsp.data)
                    } else {
                        this.$message.error(rsp.message)
                    }
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
            onSubmit(form, refs, groupType, func) {
                form.groupType = groupType
                form = Object.assign({}, form)
                let media = this.getMedia(form, refs)

                console.log('video:', this.$refs.unseenVideo.duration) //秒
                // console.log('media:', media) //秒

                if (media) {
                    saveResource(media).then(rsp => {
                        if (rsp.success) {
                            this.$message.success('操作成功')
                            func()
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                } else {
                    this.$message.warning('请先完善信息')
                }
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
                    case 'RESOURCE_DOCMENT':
                        obj.file = $refs.fileUpload.getFileString()
                        if (!obj.file) flag = true
                        arr.push(obj)
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
                    case 'RESOURCE_DOCMENT': //file
                        $refs.fileUpload.setFileString(content[0].file, 'file')
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

            deleteGroup(id, groupType, func) {
                this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteGroup({
                        groupType: groupType,
                        groupId: id
                    }).then(rsp => {
                        if (rsp.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            func(true)
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            editGroup(group, func) {
                this.$prompt('请输入新组名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '不能为空'
                }).then(({
                    value
                }) => {
                    group.name = value
                    group.groupId = group.id
                    group.groupType = group.type
                    this.saveGroup(group, func)
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '取消输入'
                    // });
                });
            },
            saveGroup(group, func) {
                if (group.groupId == undefined) {
                    addGroup(group).then(rsp => {
                        if (rsp.success) {
                            func()
                            this.$message.success('保存成功')
                            group.name = ''
                            return true
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                } else {
                    editGroup(group).then(rsp => {
                        if (rsp.success) {
                            func()
                            this.$message.success('修改成功')
                            group.name = ''
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                }

            },
            getGroupList(type, func) {
                let param={
                    groupType: type,
                    chatbotId:this.chatbotId
                }
                if(this.scene == 2){
                    param.model = 'MODEL_CHECKSUCCESS'
                }

                getGroupListAdditionCount(param).then(rsp => {
                    if (rsp.success) {
                        func(rsp.data)
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            }
        },
        mounted() {
            let rt = this.$route.query.rt
            console.log('rt----', rt)
            if (rt) {
                this.resourceType = rt
            }
            console.log('rt----', this.resourceType)
        }
    }
</script>

<style lang="less">
    .resource-manage {
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
            .clearSpacing{
                .el-button {
                    margin-right: 0px;
                    margin-left: 10px;
                }
            }
        }

    }
</style>
