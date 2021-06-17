<template>
    <section class="mmsTaskManage wrap-container">
        <el-form :inline="true" :model="params" size="small">
            <el-form-item label='唯一任务号'>
                <el-input v-model="params.taskNum" placeholder="请输入唯一任务号"></el-input>
            </el-form-item>
            <el-form-item label='内容搜索'>
                <el-input v-model="params.content" placeholder="请输入消息内容"></el-input>
            </el-form-item>
            <el-form-item label="发送结果" prop="chatbotId">
                <el-select v-model="params.sendRet" placeholder="请选择发送结果">
                    <el-option label="全部" :value="-1"></el-option>
                    <el-option label="未知" :value="0"></el-option>
                    <el-option label="完成" :value="1"></el-option>
                    <el-option label="失败" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loadData()" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>

        <section>
            <el-button @click="deleteTaskManage" size="mini" style="margin-bottom: 10px">删除</el-button>
            <el-table :data="manageList" fit v-loading="tableLoading" size="small" border ref="multiplePushTable"
                @selection-change="handleSelectionChange" :header-cell-style="{'background-color': '#fafafa'}">
                <el-table-column type="selection" width="45">
                </el-table-column>
                <el-table-column prop="taskNum" label="唯一任务号" align="center"></el-table-column>
                <el-table-column prop="sendTime" label="发送时间" align="center"></el-table-column>
                <!-- <el-table-column prop="realName" label="发件人" align="center"></el-table-column> -->
                <!-- <el-table-column prop="sendPhone" label="接收人" align="center"></el-table-column> -->
                <el-table-column prop="rptCode" label="回执状态" align="center"></el-table-column>
                <el-table-column prop="sendRet" label="发送结果" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sendRet == 0">未知</div>
                        <div v-if="scope.row.sendRet == 1">完成</div>
                        <div v-if="scope.row.sendRet == 2">失败</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="chatbotId" label="chatbot" align="center">
                    <template slot-scope="scope">
                        <div v-for="(item,index) in chatbotList" :key="'chatbot'+index">
                            <div v-if="scope.row.chatbotId == item.id">{{item.chatbotName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable align="center"></el-table-column>
                <el-table-column prop="sendTime" label="发送时间" sortable align="center"></el-table-column> -->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" size="small" @click="">预览</el-button> -->
                        <el-button type="text" size="small" @click="seeDetailed(scope.row)">查看明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>

        <el-dialog class="push-detail-dialog" title="查看明细" :visible.sync="seeDetailFlag" width="50%" center
            :close-on-click-modal="false">
            <div class="minXi">
                <el-row>
                    <el-col :span="2">唯一任务号</el-col>
                    <el-col :span="6">{{infoObj.taskNum}}</el-col>
                    <el-col :span="2">发送时间</el-col>
                    <el-col :span="6">{{infoObj.sendTime}}</el-col>
                    <el-col :span="2">任务下发类型</el-col>
                    <el-col :span="6">{{infoObj.taskType == 0 ? '临时下发' : infoObj.taskType == 1 ? '测试下发' : infoObj.taskType == 2 ? '订购库下发':''}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">号码</el-col>
                    <el-col :span="6">{{infoObj.mobile}}</el-col>
                    <el-col :span="2">发送结果</el-col>
                    <el-col :span="6">
                        <div v-if="infoObj.sendStatus == 0">待提交</div>
                        <div v-if="infoObj.sendStatus == 1">提交成功</div>
                        <div v-if="infoObj.sendStatus == 2">提交失败</div>
                        <div v-if="infoObj.sendStatus == 3">发送成功</div>
                        <div v-if="infoObj.sendStatus == 4">发送失败</div>
                        <div v-if="infoObj.sendStatus == 5">未知状态</div>
                    </el-col>
                    <el-col :span="2">回执时间</el-col>
                    <el-col :span="6">{{infoObj.rptTime}}</el-col>
                </el-row>

                <el-row>
                    <el-col :span="2">回执状态</el-col>
                    <el-col :span="6">{{infoObj.rptCode}}</el-col>
                    <el-col :span="2">回执描述</el-col>
                    <el-col :span="6">{{infoObj.rptDesc}}</el-col>
                </el-row>
            </div>
        </el-dialog>

        <!-- 页码区 -->
        <div class="page-wrap">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="param.current" :page-sizes="[10, 15, 20, 30]" :page-size="param.size"
                layout="total, sizes, prev, pager, next, jumper" :total="param.total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import {
        getMmsSendTaskList
    } from '../../api/api'

    export default {
        name: "MasTaskManage",
        data() {
            return {
                params: {
                },
                manageList: [],
                tableLoading: false,
                param: {
                    current: 1,
                    size: 10,
                    total: 0,
                }, // 分页
                multipleSelection: [],
                mmsDialogFlag: false,
                currentRow: {},
                seeDetailFlag:false,
                infoObj:{}
            }
        },
        methods: {
            //查看明细
            seeDetailed(row){
                this.seeDetailFlag  = true
                this.infoObj = row
            },
            //组件---确定数据以及取消
            mmsCancelOrOk(dialogType) {
                if (dialogType == 'cancel') {
                    this.$emit('mmsContentInfo', dialogType, this.mmsDialogFlag)
                }
            },
            //改变页面size
            handleSizeChange(size) {
                this.param.size = size
                this.loadData()
            },
            //改变当前页
            handleCurrentChange(currentPage) {
                this.param.current = currentPage
                this.loadData()
            },
            //组件的时候单选
            mmsCurrentChange(val) {
                this.currentRow = val;
            },
            //普通模式复选框 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //删除
            deleteTaskManage() {

            },
            //初始化数据
            loadData() {
                Object.assign(this.param, this.params)
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                this.param.customerId = userInfo.customerId
                getMmsSendTaskList(this.param).then(res => {
                    this.manageList = res.data.records
                    this.param.total = res.data.total
                })
            }
        },
        mounted() {
            // document.getElementsByClassName('el-table__body-wrapper')[0].style.height = document.documentElement
            //     .clientHeight -
            //     50 - 50 - 40 - 52 - 38 - 60 - 47 + 'px'
        },
        activated() {
            this.loadData()
            document.getElementsByClassName('el-table__body-wrapper')[0].style.height = document.documentElement
                .clientHeight -
                50 - 50 - 40 - 52 - 38 - 60 - 47 + 'px'
        }
    }
</script>

<style lang="less">
    .mmsTaskManage {
        .mms-dialog-footer {
            margin-top: 15px;
        }

        .minXi {
            >div {
                margin-bottom: 20px;
            }

            .el-col {
                padding: 1px;
            }
        }

        .el-table__body-wrapper {
            overflow: auto;

            &::-webkit-scrollbar {
                width: 4px;
                height: 0px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: rgba(0, 0, 0, 0.2);
            }

            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 0;
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }
</style>
