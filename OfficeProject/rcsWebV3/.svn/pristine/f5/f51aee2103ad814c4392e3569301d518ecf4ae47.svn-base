<template>
    <section class="router-detail wrap-container">
        <el-form ref="form" :model="form" label-width="150px" size="small">
            <el-form-item label="选择chatbot">
                <el-select v-model="chatbotId" placeholder="请选择">
                    <el-option v-for="(item,index) in chatbotList" :key="'chatbotId'+index" :label="item.chatbotName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规则名称">
                <el-input v-model="form.name" placeholder="请输人规则名称" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="规则类型">
                <el-radio v-model="form.ruleType" label="0">普通回复</el-radio>
                <el-radio v-model="form.ruleType" label="1">默认回复</el-radio>
                <el-radio v-model="form.ruleType" label="2" v-if="userType==1">统一回复</el-radio>
            </el-form-item>

            <el-form-item label="关键词" v-show="form.ruleType==0">

                <el-row type="flex" align="middle" v-for="(keyword,index) in keywordList" :key="index" class="keyword-row">
                    <el-col :span="3">
                        <el-select v-model="keyword.key" placeholder="请选择">
                            <el-option :key="1" label="半匹配" :value="1">
                            </el-option>
                            <el-option :key="2" label="全匹配" :value="2">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="18">
                        <el-input placeholder="" size="small" v-model="keyword.value" maxlength="30" show-word-limit>
                            <template slot="prepend">关键词</template>
                        </el-input>
                    </el-col>

                    <el-col :span="3" style="text-align: center;margin-top: -2px">
                        <el-button type="primary" icon="el-icon-plus" circle size="small" @click="addRule" v-if="index==keywordList.length-1"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteRule(index)"
                            v-if="keywordList.length!=1"></el-button>
                    </el-col>
                </el-row>

            </el-form-item>

            <el-form-item label="回复内容">

                <el-form-item label="">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="1">文本</el-radio>
                        <el-radio :label="2">图片</el-radio>
                        <el-radio :label="3">音频</el-radio>
                        <el-radio :label="4">视频</el-radio>
                        <el-radio :label="10">从模板选择</el-radio>
                        <el-radio :label="11">从应用选择</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!--text start-->
                <section v-show="form.type==1">
                    <el-form-item label="">
                        <el-input type="textarea" v-model="form.text" rows="10" maxlength="5242880"></el-input>
                    </el-form-item>
                </section>
                <!--text end-->

                <!--image start-->
                <section v-show="form.type==2">
                    <el-form-item label="">

                        <upload-file-base ref="imageUpload" accept="image/jpeg,image/png" :limit="1" folderType="router"
                            :fileSize="3" tip="图片大小不超过3M，支持jpg/jepg、png格式"></upload-file-base>

                    </el-form-item>
                </section>
                <!--image end-->

                <!--audio start-->
                <section v-show="form.type==3">
                    <el-form-item label="内容" label-width="40px">
                        <upload-file-base ref="audioUpload" accept="audio/*" :limit="1" folderType="router" :fileSize="5"
                            tip="音频大小不超过5M，mp3格式"></upload-file-base>
                    </el-form-item>
                    <el-form-item label="封面" label-width="40px">

                        <upload-file-base ref="audioUploadImg" accept="image/jpeg,image/png" :limit="1" folderType="router"
                            :fileSize="3" tip=""></upload-file-base>

                    </el-form-item>
                </section>
                <!--audio end-->

                <!--video start-->
                <section v-show="form.type==4">
                    <el-form-item label="内容" label-width="40px">
                        <upload-file-base ref="videoUpload" accept="video/mp4" :limit="1" folderType="router" :fileSize="50"
                            tip="视频大小不超过50M，MP4格式"></upload-file-base>
                    </el-form-item>
                    <el-form-item label="封面" label-width="40px">
                        <upload-file-base ref="videoUploadImg" accept="image/jpeg,image/png" :limit="1" folderType="router"
                            :fileSize="3" tip=""></upload-file-base>

                    </el-form-item>
                </section>
                <!--video end-->

                <section v-show="form.type==10" style="margin-left: -50px;width: 1000px">
                    <div style="margin-left: 50px;margin-bottom: -15px">
                        <label>当前选择模板</label>
                        <span class="theme-color">{{media.name?media.name:'没有选择模板'}}</span>
                    </div>
                    <media-list :scene="2" :tabType="tabType" :selectId="selectId" @currentChange="selectRow"></media-list>
                </section>

                <section>
                    <el-form-item v-show="form.type==11">
                        <div style="margin-bottom: -15px">
                            <label>当前选择的应用 </label>
                            <span class="theme-color">{{chatbot.appName?chatbot.appName:'没有选择应用'}}</span>
                        </div>
                        <chatbot-list scene="2" style="margin-top: 20px;" regStatus="1" @selectRow="selectRowC" :addAndUpdate="addAndUpdate" :appJson="appJson"></chatbot-list>
                    </el-form-item>
                </section>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="createRoute">确 定</el-button>
            </el-form-item>

            <!--<el-form-item label="省级行政区">-->
            <!--<el-select v-model="form.region1" multiple placeholder="请选择行政区">-->
            <!--<el-option v-for="province in provinceList" :label="province" :value="province"></el-option>-->
            <!--</el-select>-->

            <!--&lt;!&ndash;<el-cascader :options="options" :props="props" v-model="form.location">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-cascader>&ndash;&gt;-->
            <!--</el-form-item>-->
        </el-form>
    </section>
</template>

<script>
    import UploadFileBase from '../../components/UploadFileBase'
    import MediaList from '../resource/MediaManage'
    import {
        getRouteCfgList,
        saveRouteCfg,
        delRouteCfg,
        getOneRouteCfg,
        getPasswayList
    } from '../../api/api'
    import {
        mapGetters
    } from 'vuex'
    import ChatbotList from '../api/ChatbotManage'

    export default {
        name: "RouterDetail",
        components: {
            UploadFileBase,
            MediaList,
            ChatbotList
        },
        data() {
            return {
                keywordList: [{
                    key: 1,
                    value: ''
                }],
                form: {
                    type:1,
                    ruleType: '0',
                },
                chatbotList: [],
                media: {},
                chatbot: {},
                selectId: -1,
                chatbotId:0,
                routeId:0,
                addAndUpdate:0,
                appJson:{}
                // tabType:''
            }
        },
        computed: {
            ...mapGetters([
                'userType'
            ]),
        },
        methods: {
            // tabType(val){
            //     this.tabType = val
            // },
            getPasswayList(){
                getPasswayList({curPage:1,size:1000,chatbotName:'',userId:''}).then(res=>{
                    this.chatbotList = res.data.records
                })
            },
            addRule() {
                let keyword = this.keywordList[this.keywordList.length - 1]
                if (keyword.value) {
                    this.keywordList.push({
                        key: 1
                    })
                } else {
                    this.$message.warning('请填写关键词')
                }
            },
            deleteRule(index) {
                this.keywordList.splice(index, 1)
            },
            selectRow(row) { //选择媒体
                // console.log('row:',row)
                this.media = row
                this.selectId = row.id
            },
            selectRowC(row) { //选择chatbot
                console.log('row:',row)
                this.chatbot = row
            },
            createRoute() {
                if (!this.form.name) {
                    this.$message.warning('请填写规则名称')
                    return
                }
                let keyword = this.keywordList[this.keywordList.length - 1]
                if (this.form.ruleType == 0 && !keyword.value) {
                    this.$message.warning('请填写关键词')
                    return
                }


                let reply = this.getReply()
                // console.log(reply)

                this.form.chatbotId = this.chatbotId
                console.log('route:',this.form)


                if (reply) {
                    this.form.matchingWord = JSON.stringify(this.keywordList)
                    this.form.content = JSON.stringify(reply)
                    this.form.type = this.form.type + ''
                    saveRouteCfg(this.form).then(rsp => {
                        if (rsp.success) {
                            if(this.routeId != 0){
                                this.$message.success('编辑成功')
                            }else{
                                this.$message.success('新增成功')
                            }
                            this.selectId = -1
                            this.$store.dispatch('tagsView/delView', this.$route).then(() => {
                                this.$router.push('/routerManage')
                            })
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                } else {
                    this.$message.warning('请先完善信息')
                }


            },
            getReply() {
                let reply = this.form
                let obj = {
                    "from": 2,
                    "text": "",
                    "createTime": "",
                    "type": reply.type,
                    "image": "",
                    "file": "",
                    json: {}
                }

                let flag = false
                switch (reply.type) {
                    case 1: //text
                        obj.text = reply.text
                        if (!obj.text) flag = true
                        break;
                    case 2: //pic
                        obj.image = this.$refs.imageUpload.getFileString()
                        if (!obj.image) flag = true
                        break;
                    case 3: //audio
                        obj.image = this.$refs.audioUploadImg.getFileString()
                        obj.file = this.$refs.audioUpload.getFileString()
                        if (!obj.file) flag = true
                        break;
                    case 4: //video
                        obj.image = this.$refs.videoUploadImg.getFileString()
                        obj.file = this.$refs.videoUpload.getFileString()
                        if (!obj.file) flag = true
                        break;
                    case 10: //从媒体资源选择
                        obj.json = this.media
                        if (!obj.json.content) flag = true
                        break;
                    case 11: //
                        obj.json = this.chatbot
                        if (!obj.json.appName) flag = true
                        break;
                }
                if (flag) {
                    return false
                }
                return obj
            },

            setReply(reply) {
                let content = JSON.parse(reply.content)
                switch (reply.type) {
                    case 1: //text
                        this.form.text = content.text
                        break;
                    case 2: //pic
                        this.$refs.imageUpload.setFileString(content.image, 'router')
                        break;
                    case 3: //audio
                        this.$refs.audioUploadImg.setFileString(content.image, 'router')
                        this.$refs.audioUpload.setFileString(content.file, 'router')
                        break;
                    case 4: //video
                        this.$refs.videoUploadImg.setFileString(content.image, 'router')
                        this.$refs.videoUpload.setFileString(content.file, 'router')
                        break;
                    case 10: //media
                        this.media = content.json
                        break;
                    case 11: //chatbot
                        this.chatbot = content.json
                        break;
                }

            },
        },
        mounted() {
        },
        activated() {
            this.routeId = Number(this.$route.query.routeId)
            this.getPasswayList()
            if(this.$route.query.routeId == undefined){
                this.routeId = 0
            }

            if(this.routeId == 0){
                this.keywordList = [{
                    key: 1,
                    value: ''
                }]
                this.form = {
                    type: 1,
                    ruleType: '0'
                }
                getPasswayList({curPage:1,size:1000,chatbotName:'',userId:''}).then(res=>{
                    this.chatbotId = res.data.records[0].id
                })
                this.addAndUpdate = 0
                // this.chatbotId = this.chatbotList[0].id
                // this.chatbotList = []
                this.media = {}
                this.chatbot = {}
                this.selectId = -1
            }else{
                if (this.routeId) {
                    getOneRouteCfg({
                        routeId: this.routeId
                    }).then(rsp => {
                        if (rsp.success) {
                            let content = JSON.parse(rsp.data.content)
                            if(rsp.data.type == 10){
                                this.selectId = content.json.id

                                this.tabType = content.json.type
                                // console.log('this.tabType:',this.tabType)
                            }
                            if(rsp.data.type == 11){
                                this.addAndUpdate = 1
                                this.appJson = content.json
                                console.log("this.addAndUpdate1:",this.addAndUpdate)
                                console.log("this.appJson1:",this.appJson)
                            }
                            this.form = rsp.data

                            this.form.routeId = this.form.id + ''
                            this.keywordList = JSON.parse(this.form.matchingWord)
                            this.form.ruleType += ''
                            this.form.controlStatus += ''
                            this.setReply(this.form)
                            this.chatbotId = rsp.data.chatbotId
                            // console.log('chatbotId',this.chatbotId)
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    .router-detail {
        .keyword-row+.keyword-row {
            margin-top: 20px;
        }

        .el-table__body {
            cursor: pointer;
        }
    }
</style>
