<template>
    <section class="info-statistics wrap-container">
        <el-form :inline="true" :model="infoSearch" size="small">
            <el-form-item label="起止时间">
                <el-date-picker
                    v-model="infoSearch.queryTime"
                    type="daterange"
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="chatbotID">
                <el-select v-model="infoSearch.operatorId" placeholder="请选择chatbotID">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="chatbot in chatbotList" :label="chatbot.appId" :value="chatbot.appId" :key="chatbot"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="信息类型">
                <el-select v-model="infoSearch.mediaType" placeholder="请选择类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="AO-文本" :value="1"></el-option>
                    <el-option label="AO-文件（图片）" :value="2"></el-option>
                    <el-option label="AO-文件（音频）" :value="3"></el-option>
                    <el-option label="AO-文件（视频）" :value="4"></el-option>
                    <el-option label="AO-文件（卡片）" :value="5"></el-option>
                    <el-option label="AO-文件（其他文件）" :value="6"></el-option>
                    <el-option label="MO（上行）" :value="7"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机">
               <el-input placeholder="请输入手机" v-model="infoSearch.address"></el-input>
            </el-form-item>
            <el-form-item label="通道类型">
                <el-select v-model="infoSearch.type" placeholder="请选择通道类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="上行路由列表" :value="1"></el-option>
                </el-select>
            </el-form-item>


            <!--<el-form-item label="操作人员">-->
            <!--<el-input v-model="infoSearch.userName"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button  type="primary" @click="search" icon="el-icon-search">查询</el-button>
                <el-button  type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
        </el-form>


        <section>
            <!--<el-button  @click="deleteTemp" size="mini" style="margin-bottom: 10px">删除</el-button>-->
            <el-table :data="infoList" fit v-loading="tableLoading" size="small" border
                      ref="multiplePushTable"
                      :header-cell-style="{'background-color': '#fafafa'}">

                <el-table-column prop="modifyTime" label="话单时间" align="center"></el-table-column>
                <el-table-column prop="address" label="手机号码" align="center"></el-table-column>
                <el-table-column label="消息类型" align="center">
                    <template slot-scope="scope">
                        {{typeName[scope.row.mediaType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="chatbotID" align="center"></el-table-column>
                <el-table-column prop="createTime" label="标志" align="center">
                    <template slot-scope="scope">
                        {{deliveryStatus[scope.row.deliveryStatus]}}
                    </template>

                </el-table-column>
                <el-table-column prop="errorDesc" label="失败原因" align="center"></el-table-column>
                <el-table-column prop="operatorName" label="姓名" align="center"></el-table-column>

            </el-table>
        </section>

        <!-- 页码区 -->
        <div class="page-wrap">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 20, 50, 200, 500]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import {getMessageQueryStatistics,getChatbotList} from '../../api/api'

    export default {
        name: "InfoStatistics",
        components: {},
        data() {
            return {
                page:{ //页码区
                    current:1,
                    size:10,
                    total:0,
                },
                infoSearch:{},
                infoList:[],
                tableLoading:false,
                typeName: ['','文本','图片','音频','视频','卡片','文件'],
                deliveryStatus:['','发送中','发送成功','发送失败','发送超时'],
                chatbotList:[]
            }
        },
        methods: {
            handleCurrentChange:function (currentPage) { //改变当前页
                this.page.current = currentPage
                this.loadData()
            },
            handleSizeChange: function (size) { //改变页面size
                this.page.size = size;
                this.loadData()
            },
            loadData(){
                this.infoSearch.startTime = this.infoSearch.endTime = ''
                let arr = this.infoSearch.queryTime
                if (arr){
                    this.infoSearch.startTime = arr[0]
                    this.infoSearch.endTime = arr[1]
                }
                this.infoSearch.current = this.page.current
                this.infoSearch.size = this.page.size
                this.tableLoading = true
                getMessageQueryStatistics(this.infoSearch).then(rsp=>{
                    this.tableLoading = false
                    console.log(rsp)
                    if (rsp.success) {
                        this.infoList = rsp.data.records;
                        this.page.total = rsp.data.total
                    } else {
                        this.$message.error(rsp.message);
                    }
                })
            },
            search(){
                this.loadData()
            },
            exportExcel(){
                let headDesc = '话单时间,手机号码,消息类型,chatbotID,标志,失败原因,姓名'
                let head = headDesc.split(',')
                let data = [head]
                this.infoList.forEach(info=>{
                    let arr = [info.modifyTime,info.address,this.typeName[info.mediaType],this.deliveryStatus[info.deliveryStatus],info.errorDesc,info.operatorName]
                    data.push(arr)
                })
                this.$array2Excel(data,'消息查询统计')
            }
        },
        mounted() {
            getChatbotList({curPage:1,size:100,regStatus:'1'}).then(rsp=>{
                if (rsp.success){
                    this.chatbotList = rsp.data.records
                }
            })
        }
    }
</script>

<style scoped lang="less">
    .info-statistics{

    }
</style>
