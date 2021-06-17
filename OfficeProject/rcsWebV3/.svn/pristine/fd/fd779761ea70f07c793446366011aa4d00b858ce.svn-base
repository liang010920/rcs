<template>
    <section class="info-up wrap-container">
        <el-form :inline="true" :model="params" size="small">
            <el-form-item label='接收时间'>
                <el-date-picker v-model="params.billTime" type="daterange" :editable="false" value-format="yyyy-MM-dd"
                    range-separator="至" start-placeholder="" end-placeholder="">
                </el-date-picker>
            </el-form-item>
            <el-form-item label='收件人'>
                <el-input v-model="params.mobile" placeholder="请输入用户的号码"></el-input>
            </el-form-item>
            <el-form-item label='内容搜索'>
                <el-input v-model="params.content" placeholder="请输入消息内容"></el-input>
            </el-form-item>
            <el-form-item label="选择chatbot" prop="chatbotId">
                <el-select v-model="params.chatbotId" placeholder="请选择">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="(item,index) in chatbotList" :key="'chatbotId'+index" :label="item.chatbotName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="pageGroupRcsBill" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-row class="infoList">
            <el-col :span="8">
                <div class="infoLeft">
                    <div :style="{height:scrollHeight}">
                        <div class="infoChat" v-for="(item,index) in groupBillList" @click="groupDetail(item,index)"
                            :class="index == key ? 'infoChatBgColor':''" :key="'groupBill'+index">
                            <div class="head"><img src="../../../static/imgs/band.gif" width="45px"></div>
                            <div class="phoneContent">
                                <div class="phone">{{item.mobile}}</div>
                                <div class="inboxEllipsis" v-if="item.msgType == 'REV_TEXT' || item.msgType == 'REV_REPLY' || item.msgType == 'SEND_TEXT'">
                                    {{item.showContent}}
                                </div>
                                <div v-else-if="item.msgType.indexOf('_CARD') != -1">
                                    【卡片信息】
                                </div>
                            </div>
                            <div align="right">
                                <div>{{item.billTime}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 页码区 -->
                    <div class="control">
                        <div class="page-wrap">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="page.curPage" :page-sizes="[10, 20, 30]" :page-size="page.size" layout="total, prev, pager, next,jumper"
                                :pager-count="5" :total="page.total">
                            </el-pagination>
                        </div>
                        <br>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="infoRight">
                    <div class="phoneTitle">{{groupMobile}}</div>
                    <div class="infoRightContent" :style="{height:scrollHeight2}">
                        <div class="leftInfoContent" v-for="(item,index) in mobileInfo" :key="'mobile'+index">
                            <div class="leftd" v-if="item.smsType == 1">
                                <el-row>
                                    <el-col :span="1" align="left">
                                        <span class="leftd_h">
                                            <img src="../../../static/imgs/icon.png" />
                                        </span>
                                    </el-col>
                                    <el-col :span="23">
                                        <div class="speech left" :class="item.msgType.indexOf('_CARD') != -1 ? 'delBgColor' : ''">
                                            <div v-if="item.msgType == 'REV_TEXT'">
                                                {{item.rTextContent}}
                                            </div>
                                            <div v-else-if="item.msgType == 'REV_REPLY'">
                                                {{item.rReplyContent}}
                                            </div>
                                            <div v-else-if="item.msgType == 'SEND_TEXT'">
                                                {{item.sTextContent}}
                                            </div>
                                            <div v-else-if="item.msgType.indexOf('_CARD') != -1">
                                                <pre-view :row="item.row"></pre-view>
                                            </div>
                                        </div>
                                        <div style="clear: both;"></div>
                                        <div style="margin-left: 10px;margin-top: 5px;text-align: left;">{{item.sendTime}}</div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="rightd" v-if="item.smsType == 2">
                                <el-row>
                                    <el-col :span="23" align="right">
                                        <div class="speech right" :class="item.msgType.indexOf('_CARD') != -1 ? 'delBgColor' : ''">
                                            <div v-if="item.msgType == 'REV_TEXT'">
                                                {{item.rTextContent}}
                                            </div>
                                            <div v-else-if="item.msgType == 'REV_REPLY'">
                                                {{item.rReplyContent}}
                                            </div>
                                            <div v-else-if="item.msgType == 'SEND_TEXT'">
                                                {{item.sTextContent}}
                                            </div>
                                            <div v-else-if="item.msgType.indexOf('_CARD') != -1">
                                                <pre-view :row="item.row"></pre-view>
                                            </div>
                                        </div>
                                        <div style="clear: both;"></div>
                                        <div style="text-align: right;margin-top: 5px;margin-right: 10px;">{{item.sendTime}}</div>
                                    </el-col>
                                    <el-col :span="1" align="left">
                                        <span class="rightd_h">
                                            <img src="../../../static/imgs/band.gif" />
                                        </span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <!-- 页码区 -->
                    <div class="control">
                        <div class="page-wrap" style="padding: 15px 0;margin-top: 0;">
                            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
                                :current-page="page2.curPage" :page-sizes="[10, 20, 30, 50,100]" :page-size="page2.size" layout="total, sizes, prev, pager, next, jumper"
                                :total="page2.total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- <el-table :data="billList" fit v-loading="tableLoading" size="small" border :header-cell-style="{'background-color': '#fafafa'}">
            <el-table-column prop="busiCode" label="业务编码" align="center"></el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
            <el-table-column prop="msg" label="消息内容" align="center"></el-table-column>
            <el-table-column prop="moTime" label="时间" align="center"></el-table-column>
            <el-table-column prop="" label="操作" align="center">
            </el-table-column>
        </el-table> -->

        <!-- 页码区 -->
        <!-- <div class="page-wrap">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current"
                :page-sizes="[10, 15, 20, 30]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div> -->

        <!-- 回复详情 start -->
        <el-dialog class="reply-detail-dialog" title="预览" :visible.sync="replyDetailFlag" width="40%" center
            :close-on-click-modal="false">

            <el-form ref="form" :model="replyForm" label-width="70px" size="small">

                <el-form-item label="消息类型">
                    <el-radio-group v-model="replyForm.type">
                        <!-- <el-radio v-for="(item,index) in msgTypeList" :key="item.id" :label="item.label">{{item.value}}</el-radio> -->
                        <el-radio label="SEND_TEXT">文本</el-radio>
                        <el-radio :label="2">图片</el-radio>
                        <el-radio :label="3">音频</el-radio>
                        <el-radio :label="4">视频</el-radio>
                        <el-radio :label="10">从模板选择</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- text start -->
                <section v-show="replyForm.type==1 || replyForm.type=='SEND_TEXT'">
                    <el-form-item label="内容">
                        <el-input type="textarea" v-model="replyForm.text" rows="10" maxlength="5242880"></el-input>
                    </el-form-item>
                </section>
                <!--text end

                <!--image start-->
                <section v-show="replyForm.type==2">
                    <el-form-item label="内容">

                        <upload-file-base ref="imageUpload" accept="image/jpeg,image/png" :limit="1" folderType="uplink"
                            :fileSize="3" tip="图片大小不超过3M，支持jpg/jepg、png格式"></upload-file-base>

                    </el-form-item>
                </section>
                <!--image end-->

                <!--audio start-->
                <section v-show="replyForm.type==3">
                    <el-form-item label="内容">
                        <upload-file-base ref="audioUpload" accept="audio/*" :limit="1" folderType="uplink" :fileSize="5"
                            tip="音频大小不超过5M，mp3格式"></upload-file-base>
                    </el-form-item>
                    <el-form-item label="封面">

                        <upload-file-base ref="audioUploadImg" accept="image/jpeg,image/png" :limit="1" folderType="uplink"
                            :fileSize="3" tip=""></upload-file-base>

                    </el-form-item>
                </section>
                <!--audio end-->

                <!--video start-->
                <section v-if="replyForm.type=='SEND_SINGLE_CARD'">
                    <el-form-item label="内容">
                        <upload-file-base ref="videoUpload" accept="video/mp4" :limit="1" folderType="uplink" :fileSize="50"
                            tip="视频大小不超过50M，MP4格式"></upload-file-base>
                    </el-form-item>
                    <el-form-item label="封面">
                        <upload-file-base ref="videoUploadImg" accept="image/jpeg,image/png" :limit="1" folderType="uplink"
                            :fileSize="3" tip=""></upload-file-base>
                    </el-form-item>

                </section>
                <!--video end-->


                <section v-if="replyForm.type=='SEND_REPLY_CAROUSEL_CARD' || replyForm.type==10">
                    <!-- <media-list v-if="replyDetailFlag" scene="2" :selectId="selectId" @currentChange="selectRow"
                        @hideMask="hideMask"></media-list> -->
                    <section class="item-desc">
                        <swiper ref="mySwiper" :options="swiperOptions">
                            <swiper-slide v-for="(item,index) in billMsgTypeList.cardContentList" :key="'card'+index">
                                <el-image style="width:100%;height:150px;border-radius: 5px 5px 0 0" :src="item.cardMedia.thumbnailUrl"
                                    fit="cover">
                                    <div slot="error" class="image-slot" style="font-size: 24px;margin-top: 50px;text-align: center">
                                        <i class="el-icon-folder"></i>
                                    </div>
                                </el-image>
                                <div class="desc">
                                    <h3>{{item.title}}</h3>
                                    <p class="scrollbar">{{item.description}}</p>
                                    <div class="button-wrap scrollbar" style="text-align: center;">
                                        <div class="button" style="color: #044d91;cursor: pointer;" v-for="btn in item.cardButtonList">{{btn.displayText}}</div>
                                    </div>
                                </div>
                                <div class="text-style scrollbar">
                                    {{item.cardButtonList.displayText}}
                                </div>
                            </swiper-slide>
                            <!--<div class="swiper-pagination" slot="pagination"></div>-->
                        </swiper>
                    </section>
                </section>

                <section v-if="replyForm.type=='SEND_SINGLE_CARD' || replyForm.type=='SEND_REPLY_SINGLE_CARD' || replyForm.type==10">
                    <!-- <media-list v-if="replyDetailFlag" scene="2" :selectId="selectId" @currentChange="selectRow"
                        @hideMask="hideMask"></media-list> -->

                </section>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="replyDetailFlag = false" size="small">取 消</el-button>
                <!-- <el-button @click="replyInfo" size="small" type="primary">确 定</el-button> -->
            </span>
        </el-dialog>
        <!-- 回复详情 end -->

        <!-- 查看详情 start -->
        <el-dialog class="query-detail-dialog" title="详情" :visible.sync="queryDetailFlag" width="40%" center
            :close-on-click-modal="false">
            <div class="queryDetailHeight">
                <p v-if="content.msgType=='SEND_TEXT'">
                    <el-input type="textarea" readonly v-model="content.textContent" rows="10" maxlength="5242880"></el-input>
                    <el-button style="margin-top: 10px;" type="primary" v-if="content.replyParamList.length>0" v-for="(item,index) in content.replyParamList"
                        :key="index">{{item.displayText}}</el-button>
                </p>

                <p v-else-if="content.type==2">
                    <el-image style="width: 100%;margin-bottom: 10px;" :src="content.image | imgPath('uplink')" fit="contain"></el-image>
                </p>

                <p v-else-if="content.type==3">
                    <aplayer :music="content.music" loop="none" preload="metadata" style="width: 60%" />
                </p>

                <p v-else-if="content.msgType=='SEND_SINGLE_CARD'">
                    <video width="100%" v-if="content.mtCardContent.cardMedia.mediaContentType == 'video/mp4'" controls
                        controlslist="nodownload nofullscreen" ref="video" disablePictureInPicture :src="content.mtCardContent.cardMedia.mediaUrl"
                        :poster="content.mtCardContent.cardMedia.thumbnailUrl"></video>
                    <section class="item-desc" v-else>
                        <swiper ref="mySwiper" :options="swiperOptions">
                            <swiper-slide>
                                <el-image style="width:100%;height:150px;border-radius: 5px 5px 0 0" :src="content.mtCardContent.cardMedia.thumbnailUrl"
                                    fit="cover">
                                    <div slot="error" class="image-slot" style="font-size: 24px;margin-top: 50px;text-align: center">
                                        <i class="el-icon-folder"></i>
                                    </div>
                                </el-image>
                                <div class="desc">
                                    <h3>{{content.mtCardContent.title}}</h3>
                                    <p class="scrollbar">{{content.mtCardContent.description}}</p>
                                    <div class="button-wrap scrollbar" style="text-align: center;">
                                        <div class="button" style="color: #044d91;cursor: pointer;" v-for="btn in content.mtCardContent.cardButtonList">{{btn.displayText}}</div>
                                    </div>
                                </div>
                                <div class="text-style scrollbar">
                                    <!-- {{content.mtCardContent.cardButtonList.description}} -->
                                </div>
                            </swiper-slide>
                        </swiper>
                    </section>
                </p>

                <p v-else-if="content.type==10">
                    <preview-media :preData="content.json"></preview-media>
                </p>

                <p v-if="content.msgType=='SEND_CAROUSEL_CARD'">
                    <section class="item-desc">
                        <swiper ref="mySwiper" :options="swiperOptions">
                            <swiper-slide v-for="(item,index) in content.cardContentList" :key="'card'+index">
                                <el-image style="width:100%;height:150px;border-radius: 5px 5px 0 0" :src="item.cardMedia.thumbnailUrl"
                                    fit="cover">
                                    <div slot="error" class="image-slot" style="font-size: 24px;margin-top: 50px;text-align: center">
                                        <i class="el-icon-folder"></i>
                                    </div>
                                </el-image>
                                <div class="desc">
                                    <h3>{{item.title}}</h3>
                                    <p class="scrollbar">{{item.description}}</p>
                                    <div class="button-wrap scrollbar" style="text-align: center;">
                                        <div class="button" style="color: #044d91;cursor: pointer;" v-for="btn in item.cardButtonList">{{btn.displayText}}</div>
                                    </div>
                                </div>
                                <div class="text-style scrollbar">
                                    {{item.cardButtonList.displayText}}
                                </div>
                            </swiper-slide>
                        </swiper>
                    </section>
                </p>
            </div>

        </el-dialog>
        <!-- 查看详情 end -->
    </section>
</template>

<script>
    import UploadFileBase from '../../components/UploadFileBase'
    import PreView from '../components/Preview/index.vue'
    import {
        Swiper,
        SwiperSlide,
        directive
    } from 'vue-awesome-swiper'
    import MediaList from '../resource/MediaManage.vue'
    import moment from 'moment'
    import {
        getUplinkMsgList,
        replyUplinkMsg,
        delUplinkMsg,
        msgBillList,
        msgBillCustList,
        msgBillChannelList,
        pageGroupRcsBill,
        getListByMobile,
        getPasswayList
    } from '../../api/api'
    import Aplayer from 'vue-aplayer'
    import PreviewMedia from '../resource/PreviewResource'
    export default {
        name: "InfoUp",
        components: {
            UploadFileBase,
            MediaList,
            Aplayer,
            PreviewMedia,
            Swiper,
            SwiperSlide,
            PreView
        },
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                },
                InfoUpModel: {},
                infoList: [{
                    contentList: [{}],
                }],
                tableLoading: false,
                page: {
                    curPage: 1,
                    size: 10,
                    total: 0
                }, // 传入后台参数
                page2: {
                    curPage: 1,
                    size: 10,
                    total: 0
                }, // 传入后台参数
                replyDetailFlag: false,
                queryDetailFlag: false,
                replyForm: {
                    type: 1
                },
                msgTypeList: [{
                    label: 'SEND_TEXT',
                    value: '文本'
                }, {
                    label: '2',
                    value: '图片'
                }, {
                    label: '3',
                    value: '音频'
                }, {
                    label: '4',
                    value: '视频'
                }, {
                    label: 'SEND_REPLY_CAROUSEL_CARD',
                    value: '从模板选择'
                }],
                params: {
                    chatbotId: 0
                },
                info: {},
                content: {},
                media: {},
                selectId: -1,
                billList: [], //话单列表
                billCustList: [], //会员
                billChannelList: [], //通道
                billMsgTypeList: [],
                billMsgTypeList2: {},
                previewContent: {
                    thumbnailUrl: '',
                    title: '',
                    description: '',
                    cardButtonList: []
                },
                typeObj: {
                    '1': 'text',
                    '2': 'image',
                    '3': 'audio',
                    '4': 'video',
                    '5': 'image'
                },
                scrollHeight: '',
                scrollHeight2: '',
                groupBillList: [],
                groupMobile: '',
                key: -1,
                chatbotList: [],
                mobileInfo: [],
                row: {
                    type: '',
                    content: ''
                },
                card: {},
                muchCard: [],
                buttons: []
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
                    // this.params.chatbotId = this.chatbotList[0].id
                })
            },
            groupDetail(item, index) {
                this.groupMobile = item.mobile
                this.key = index
                getListByMobile({
                    mobile: this.groupMobile,
                    current: this.page2.curPage,
                    size: this.page2.size
                }).then(res => {
                    // console.log('消息详情-----',res.data)
                    this.page2.total = res.data.total
                    this.mobileInfo = res.data.records
                    let jsonAnalysis;
                    for (var i = 0; i < this.mobileInfo.length; i++) {
                        if (this.mobileInfo[i].msgType == 'REV_TEXT') {
                            this.mobileInfo[i].rTextContent = this.mobileInfo[i].showContent
                        } else if (this.mobileInfo[i].msgType == 'REV_REPLY') {
                            jsonAnalysis = JSON.parse(this.mobileInfo[i].showContent)
                            if (jsonAnalysis.response.reply != undefined) {
                                this.mobileInfo[i].rReplyContent = jsonAnalysis.response.reply.displayText
                            } else {
                                this.mobileInfo[i].rReplyContent = jsonAnalysis.response.action.displayText
                            }
                        } else if (this.mobileInfo[i].msgType == 'SEND_TEXT') {
                            jsonAnalysis = JSON.parse(this.mobileInfo[i].showContent)
                            this.mobileInfo[i].sTextContent = jsonAnalysis.content.text
                        } else if (this.mobileInfo[i].msgType.indexOf('_CARD')) {
                            jsonAnalysis = JSON.parse(this.mobileInfo[i].showContent)
                            this.mobileInfo[i].row = {
                                type: '',
                                content: ''
                            }
                            this.mobileInfo[i].row.type = jsonAnalysis.type
                            this.mobileInfo[i].row.content = JSON.stringify(jsonAnalysis.content)
                            console.log('this.mobileInfo[i].row:', this.mobileInfo[i].row)
                        }
                    }
                })
                this.scrollHeight2 = document.documentElement.clientHeight - 50 - 50 - 40 - 50 - 63 - 64 + 'px'
            },
            pageGroupRcsBill() {
                let param = {
                    current: this.page.curPage,
                    size: this.page.size,
                }
                if (this.params.billTime != null) {
                    this.params.startBillTime = this.params.billTime[0]
                    this.params.endBillTime = this.params.billTime[1]
                } else {
                    this.params.startBillTime = ''
                    this.params.endBillTime = ''
                }
                Object.assign(param, this.params)
                pageGroupRcsBill(param).then(res => {
                    if (res.success) {
                        this.groupBillList = res.data.records
                        this.key = 0
                        let jsonAnalysis;
                        this.groupDetail(this.groupBillList[0], this.key)
                        for (var i = 0; i < this.groupBillList.length; i++) {
                            if (this.groupBillList[i].msgType == 'REV_TEXT') {
                                this.groupBillList[i].showContent = this.groupBillList[i].content
                            } else if (this.groupBillList[i].msgType == 'REV_REPLY') {
                                jsonAnalysis = JSON.parse(this.groupBillList[i].content)
                                if (jsonAnalysis.response.reply != undefined) {
                                    this.groupBillList[i].showContent = jsonAnalysis.response.reply.displayText
                                } else {
                                    this.groupBillList[i].showContent = jsonAnalysis.response.action.displayText
                                }
                            } else if (this.groupBillList[i].msgType == 'SEND_TEXT') {
                                jsonAnalysis = JSON.parse(this.groupBillList[i].content)
                                this.groupBillList[i].showContent = jsonAnalysis.textContent
                            } else if (this.groupBillList[i].msgType.indexOf('_CARD')) {
                                jsonAnalysis = JSON.parse(this.groupBillList[i].content)
                            }
                        }
                        this.page.total = res.data.total
                        this.page.curPage = res.data.current
                        // console.log('消息列表-----',this.groupBillList)
                    }
                })
            },
            handleCurrentChange(currentPage) { //改变当前页
                this.page.curPage = currentPage
                this.pageGroupRcsBill()
            },
            handleSizeChange(size) { //改变页面size
                this.page.size = size;
                this.pageGroupRcsBill()
            },
            handleCurrentChange2(currentPage) { //改变当前页
                this.page2.curPage = currentPage
                let param = {
                    mobile : this.groupMobile
                }
                this.groupDetail(param,this.key)
            },
            handleSizeChange2(size) { //改变页面size
                this.page2.size = size;
                let param = {
                    mobile : this.groupMobile
                }
                this.groupDetail(param,this.key)

            },
            msgBillList() {
                // this.params.channel = this.params.channel.toString()
                // this.params.custId = this.params.custId.toString()
                let param = {
                    curPage: this.page.curPage,
                    size: this.page.size,
                    channel: this.params.channel,
                    reMobile: this.params.reMobile,
                    custId: this.params.custId,
                    sendMobile: this.params.sendMobile,
                    status: this.params.status
                }

                Object.assign(param, this.params)
                this.tableLoading = true
                msgBillList(param).then(res => {
                    this.tableLoading = false
                    // console.log('话单管理数据--------',res)
                    this.billList = res.data.records
                    this.page.total = res.data.total
                })
            },
            msgBillCustList() {
                let params = {}
                msgBillCustList(params).then(res => {
                    this.billCustList = res.data
                })
            },
            msgBillChannelList() {
                let params = {}
                msgBillChannelList(params).then(res => {
                    this.billChannelList = res.data
                })
            },
            replyDialog(info) {
                this.replyDetailFlag = true
                this.info = info
                this.replyForm = {
                    type: this.info.msgType
                }
                let msg = JSON.parse(this.info.msg);
                this.replyForm.text = msg.textContent
                this.media = {}

                this.billMsgTypeList = JSON.parse(this.info.msg)

                this.billMsgTypeList2 = JSON.parse(this.info.msg)
                this.previewContent.thumbnailUrl = this.billMsgTypeList2.mtCardContent.cardMedia.thumbnailUrl
                this.previewContent.title = this.billMsgTypeList2.mtCardContent.title
                this.previewContent.description = this.billMsgTypeList2.mtCardContent.description
                this.previewContent.cardButtonList = this.billMsgTypeList2.mtCardContent.cardButtonList

                // console.log('类新格式-------',this.info.msgType)
                console.log('预览当前话单内容-------', this.billMsgTypeList2)
            },
            replyInfo() {
                let reply = this.getReply()
                // console.log(reply)
                if (reply) {
                    let list = Object.assign([], this.info.contentList)
                    list.push(reply)
                    let content = JSON.stringify(list)
                    replyUplinkMsg({
                        uplinkmsgId: this.info.id,
                        content: content,
                        reply: JSON.stringify(reply)
                    }).then(rsp => {
                        if (rsp.success) {
                            this.replyDetailFlag = false
                            this.msgBillList()
                            this.selectId = -1
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                } else {
                    this.$message.warning('请先完善信息')
                }
            },
            queryDetail(content) {
                var contentJson = JSON.parse(content.msg)
                this.content = contentJson
                console.log(this.content)
                if (content.msgType == '3') {
                    content.music = {}
                    content.music.title = ' '
                    content.music.src = this.$options.filters.imgPath(content.mtCardContent.cardMedia.mediaUrl,
                        'uplink')
                    content.music.pic = this.$options.filters.imgPath(content.mtCardContent.cardMedia.thumbnailUrl,
                        'uplink')
                    content.music.artist = ' '
                }
                this.queryDetailFlag = true
            },
            deleteInfo(info) {
                this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delUplinkMsg({
                        uplinkmsgId: info.id
                    }).then(rsp => {
                        if (rsp.success) {
                            this.$message.success('删除成功')
                            this.msgBillList()
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                }).catch(_ => {});
            },
            selectRow(row) { //选择媒体
                console.log('row:', row)
                // this.replyDetailFlag = false
                this.media = row
                this.selectId = row.id
            },
            hideMask() {
                this.replyDetailFlag = false
            },
            search() {
                this.msgBillList()
            },
            getReply() {
                let reply = this.replyForm
                let obj = {
                    "from": 2,
                    "text": "",
                    "createTime": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
                }
                if (flag) {
                    return false
                }
                return obj
            },
            loadData() {
                let param = {
                    curPage: this.page.curPage,
                    size: this.page.size
                }
                Object.assign(param, this.params)
                this.tableLoading = true
                getUplinkMsgList(param).then(rsp => {
                    // console.log('uplink resp:',rsp)

                    this.tableLoading = false
                    this.infoList = rsp.data.records
                    this.infoList.forEach(val => {
                        if (val.content) {
                            val.contentList = JSON.parse(val.content)
                        } else {
                            val.contentList = []
                        }
                    })
                    this.page.total = rsp.data.total
                })
            }
        },
        activated() {
            // this.loadData()
            // this.msgBillList();
            // this.msgBillCustList();
            // this.msgBillChannelList();
            this.pageGroupRcsBill();
            this.getPasswayList();
            this.scrollHeight = document.documentElement.clientHeight - 50 - 50 - 40 - 50 - 5 - 52 - 15 + 'px'
            this.scrollHeight2 = document.documentElement.clientHeight - 50 - 50 - 40 - 50 - 63 - 64 + 'px'
        }
    }
</script>

<style lang="less">
    .info-up {
        .delBgColor {
            background-color: transparent !important;
            margin-left: 0 !important;
        }

        .infoList {
            border: 1px solid #ccc;

            .infoLeft {
                width: 100%;
                border-right: 1px solid #ccc;

                >div {

                        overflow: auto;
                        scrollbar-color: #959697 transparent;
                        scrollbar-width: thin;


                    &::-webkit-scrollbar {
                        width: 4px;
                        height: 0px;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 50px;
                        -webkit-box-shadow: inset 0 0 5px #959697;
                        background: rgba(0, 0, 0, 0.5);
                    }

                    &::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
                        border-radius: 50px;
                        background: rgba(0, 0, 0, 0);
                    }
                }

                .infoChatBgColor {
                    background: #EFF8FF;
                }

                .infoChat {
                    display: flex;
                    padding: 15px;
                    line-height: 22px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;

                    .head {
                        border-radius: 100%;
                        overflow: hidden;
                        background: #e1e1e1;
                    }

                    .phoneContent {
                        margin-left: 15px;
                        flex: 1;

                        .phone {
                            font-weight: bold;
                            color: #464646;
                        }

                        .inboxEllipsis {
                            width:220px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                        }
                    }
                }
            }



            .infoRight {
                background: #FAFBFD;

                .phoneTitle {
                    padding: 20px;
                    height: 60px;
                    background: #FAFBFD;
                    border-bottom: 1px solid #ccc;
                }

                .infoRightContent {
                    overflow: auto;
                    padding: 20px;
                    scrollbar-color: #959697 transparent;
                    scrollbar-width: thin;
                    &::-webkit-scrollbar {
                        width: 4px;
                        height: 0px;
                    }
                    
                    &::-webkit-scrollbar-thumb {
                        border-radius: 50px;
                        -webkit-box-shadow: inset 0 0 5px #959697;
                        background: rgba(0, 0, 0, 0.5);
                    }
                    
                    &::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
                        border-radius: 50px;
                        background: rgba(0, 0, 0, 0);
                    }
                    .leftInfoContent {

                        /* 聊天气泡 */
                        div.speech {
                            float: left;
                            padding: 8px;
                            table-layout: fixed;
                            word-break: break-all;
                            position: relative;
                            border-radius: 8px;
                        }

                        div.speech:before {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            left: 15px;
                            top: -20px;
                        }

                        div.speech:after {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            left: 17px;
                            top: -16px;
                        }

                        div.speech.right {
                            display: inline-block;
                            margin-right: 10px;
                            text-align: left;
                            float: right;
                            background-color: #D6ECFD;
                        }

                        div.speech.right:before {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            top: 9px;
                            bottom: auto;
                            left: auto;
                            right: -10px;
                        }

                        div.speech.right:after {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            top: 10px;
                            bottom: auto;
                            left: auto;
                            right: -8px;
                        }

                        div .left {
                            display: inline-block;
                            margin-left: 10px;
                            position: relative;
                            background-color: #ECEDF1;

                            .preview-index {
                                .item-desc {
                                    width: 300px;
                                }

                                .swiper-slide {
                                    width: 100%;
                                }
                            }
                        }

                        div .left:before {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            top: 9px;
                            bottom: auto;
                            left: -10px;
                            border-width: 9px 10px 9px 0;
                            border-color: transparent #989898;
                        }

                        div .left:after {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            top: 10px;
                            bottom: auto;
                            left: -8px;
                            border-width: 8px 9px 8px 0;
                            border-color: transparent #eae8e8;
                        }

                        .leftimg {
                            float: left;
                            margin-top: 10px;
                        }

                        .rightimg {
                            float: right;
                            margin-top: 10px;
                        }

                        .leftd {
                            margin-left: 10px;
                            margin-right: 15px;
                            margin-bottom: 15px;
                        }

                        .rightd {
                            margin-right: 10px;
                            margin-left: 15px;
                            margin-bottom: 15px;
                        }

                        .leftd_h {
                            width: 39px;
                            height: 39px;
                            border-radius: 100%;
                            display: block;
                            float: left;
                            overflow: hidden;
                            border: 1px solid #ccc;
                        }

                        .leftd_h img {
                            display: block;
                            width: 100%;
                            height: auto;
                        }

                        .rightd_h {
                            width: 39px;
                            height: 39px;
                            border-radius: 100%;
                            display: block;
                            float: right;
                            overflow: hidden;
                            border: 1px solid #ccc;
                        }

                        .rightd_h img {
                            display: block;
                            width: 100%;
                            height: auto;
                        }

                        // display: flex;
                        // align-items: flex-start;
                        // // flex-direction:row-reverse
                        // .head{
                        //     border-radius: 100%;
                        //     overflow: hidden;
                        //     background: #e1e1e1;
                        // }
                        // .msgContent{
                        //     margin-left: 15px;
                        //     .msgBgColor{
                        //         background: #ECEDF1;
                        //         white-space:normal;
                        //         width:100%;
                        //         border-radius: 8px;
                        //         padding: 10px;
                        //         flex-wrap: wrap;
                        //     }
                        // }
                    }
                }

                
            }
        }

        .queryDetailHeight {
            height: 500px;
            overflow: hidden;
            // padding-bottom: 10px;
            position: relative;

            p {
                height: 100%;

                video {
                    height: 100%;
                }

                section {
                    height: 100%;
                }
            }
        }

        .comment-wrap {
            padding: 0 15px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;

            .comment-item {
                text-align: center;

                &+.comment-item {
                    border-top: 1px solid #e1e1e1;
                }

                .control {
                    width: 100px;
                    font-size: 14px;
                    cursor: pointer;

                    span {
                        margin-top: -2px;
                        font-size: 14px;
                        vertical-align: 1px;
                    }
                }

                .info {
                    flex: 1;
                    text-align: left;

                    span {
                        line-height: 32px;
                    }

                    p {
                        cursor: pointer;

                        img {
                            width: 50px;
                        }
                    }
                }

                .time {
                    width: 150px;
                }

                .comment-info {
                    display: flex;
                    align-items: flex-end;
                    padding: 10px 15px 15px 15px;
                }

                .comment-reply {
                    display: flex;
                    align-items: flex-end;
                    margin-left: 60px;
                    padding: 10px 15px 15px 15px;
                    border-top: 1px solid #e1e1e1;
                }
            }
        }

        .el-table__body {
            cursor: pointer;
        }
    }
</style>
