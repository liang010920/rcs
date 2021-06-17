<template>
    <section class="sensitivity-manage wrap-container">
        <el-form :inline="true" :model="chatbotModel" size="small">

            <!--<el-form-item>-->
                <!--<el-input v-model="params.name" placeholder="搜索名称"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item>-->
                <!--<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>-->
            <!--</el-form-item>-->

            <el-form-item>
                <el-button type="primary" @click="dialogFlag=true;dialogTitle='新增敏感词';dialogForm={}" >新增敏感词</el-button>
            </el-form-item>

        </el-form>

        <section>
            <el-table :data="dataList" fit v-loading="tableLoading" size="small" border
            :header-cell-style="{'background-color': '#fafafa'}">
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column prop="controlStatus" label="状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.controlStatus==1?'已启用':scope.row.controlStatus==0?'已停用':''}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

                <!-- 操作区 -->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="setStatus(scope.row,1)" v-if="scope.row.controlStatus==0">启用</el-button>
                        <el-button  type="text" size="small" @click="setStatus(scope.row,0)" v-if="scope.row.controlStatus==1">停用</el-button>
                        <el-button  type="text" size="small" @click="toDetail(scope.row),dialogTitle='编辑敏感词'">编辑</el-button>
                        <el-button  type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </section>

        <!-- 页码区 -->
        <!-- <div class="page-wrap">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.curPage" :page-sizes="[10, 15, 20, 30]" :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div> -->


        <!-- 查看详情 start -->
        <el-dialog
            class="query-detail-dialog"
            :title="dialogTitle"
            :visible.sync="dialogFlag"
            width="35%"
            center
            :close-on-click-modal="false">

           <el-form label-width="100px" size="mini" :model="dialogForm" :rules="rules">

               <el-form-item label="名称">
                   <el-input v-model="dialogForm.name" maxlength="32" placeholder="请输入名称"></el-input>
               </el-form-item>
               <el-form-item label="内容">
                   <el-input
                       type="textarea"
                       :rows="6"
                       placeholder="请输入敏感词，敏感词之间使用英文逗号 ',' 隔开。"
                       v-model="dialogForm.content">
                   </el-input>
               </el-form-item>

           </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFlag = false" size="small">取 消</el-button>
                <el-button @click="addData" size="small" type="primary">确 定</el-button>
            </span>

        </el-dialog>
        <!-- 查看详情 end -->
    </section>
</template>

<script>
    import {getSensitiveWordsList,addSensitiveWords,modSensitiveWords,delSensitiveWords} from '../../api/api'
    export default {
        name: "SensitivityManage",
        components: {},
        data() {
            return {
                params:{},
                dialogTitle:'详情',
                chatbotModel:{},
                tableLoading:false,
                dialogFlag:false,
                dataList:[
                ],
                dialogForm:{},
                rules:{},
                page:{curPage:1,size:10,total:0},
            }
        },
        methods: {
            search(){

            },
            handleCurrentChange(currentPage) { //改变当前页
                this.page.curPage = currentPage
                this.loadData()
            },
            handleSizeChange(size) { //改变页面size
                this.page.size = size;
                this.loadData()
            },
            toDetail(row){
                this.dialogForm = Object.assign({},row)
                this.dialogFlag = true
                this.dialogTitle = '详情'
            },
            deleteData(row){
                let tips = "是否确认删除此信息？";

                this.$confirm(tips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   delSensitiveWords({sensitiveWordsId:row.id}).then(rsp=>{
                       if (rsp.success){
                           this.$message.success('删除成功')
                           this.loadData()
                       }
                   })
                }).catch(() => {
                    //取消
                });

            },
            setStatus(row,status){
                modSensitiveWords({sensitiveWordsId:row.id,controlStatus:status}).then(rsp=>{
                    if (rsp.success){
                        this.$message.success('修改成功')
                        this.loadData()
                    }
                })
            },
            addData(){
                if (this.dialogForm.id){
                    this.dialogForm.sensitiveWordsId = this.dialogForm.id
                    modSensitiveWords(this.dialogForm).then(rsp=>{
                        if (rsp.success){
                            this.$message.success('修改成功')
                            this.loadData()
                        }
                    })
                } else{
                    addSensitiveWords(this.dialogForm).then(rsp=>{
                        if (rsp.success){
                            this.$message.success('新增成功')
                            this.dialogFlag=false;
                            this.loadData()
                        }else {
                            this.$message.error(rsp.message)
                        }
                    })
                }

            },
            loadData(){
                // let param = {curPage:this.page.curPage,size:this.page.size}
                let param = {}
                Object.assign(param,this.params)
                this.tableLoading = true
                getSensitiveWordsList(param).then(rsp=>{
                    // console.log('sensitive resp:',rsp)
                    this.tableLoading = false
                    // this.dataList = rsp.data.records
                    this.dataList = rsp.data
                    this.page.total = rsp.data.total
                })
                this.dialogFlag = false
            }
        },
        activated() {
            this.loadData()
            document.getElementsByClassName('el-table__body-wrapper')[0].style.height = document.documentElement
                .clientHeight -
                50 - 50 - 40 - 51 - 60 - 47 + 'px'
        }
    }
</script>

<style scoped lang="less">
    .sensitivity-manage{

    }
</style>
