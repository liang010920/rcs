<template>
    <section class="button-resource">
        <el-form :inline="true" :model="searchModel" size="small">
            <el-form-item label="">
                <el-input v-model="searchModel.param" placeholder="搜索按钮"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>

                <el-dropdown  @command="handleCommand" style="margin-left: 10px">
                    <el-button type="primary">
                        新建按钮<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">URL</el-dropdown-item>
                        <el-dropdown-item command="2">电话</el-dropdown-item>
                        <el-dropdown-item command="3">选模板</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

        </el-form>

        <el-row>
            <el-col :span="18">
                <el-button size="mini" round :type="activeGroupType==1?'primary':''" @click="switchGroup(1)">全部 (10)</el-button>
                <el-button size="mini" round :type="activeGroupType==2?'primary':''" @click="switchGroup(2)">未分组 (2)</el-button>
                <el-button size="mini" round :type="activeGroupType==3?'primary':''" @click="switchGroup(3)">仨组 (8)</el-button>
            </el-col>
            <el-col :span="6" style="text-align: right">
                <el-button size="mini" round class="mr10" v-show="activeGroupType!=1&&activeGroupType!=2" @click="deleteGroup(activeGroupType)">删除分组</el-button>

                <el-popover
                    placement="bottom"
                    width="200"
                    v-model="popVisible">
                    <!--<div >-->
                    <!--新建分组-->
                    <!--</div>-->
                    <div style="padding: 10px 0 15px 0">
                        <el-input size="mini" v-model="searchModel.param" placeholder="请输入分组名称"></el-input>
                    </div>

                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="popVisible = false">确定</el-button>
                    </div>
                    <el-button type="primary" size="mini" slot="reference" round>新建分组</el-button>
                </el-popover>
            </el-col>
        </el-row>

        <el-row gutter="15" style="margin-top: 15px">
            <el-col :span="24" style="margin-bottom: 15px">
                <el-table :data="pushList" fit v-loading="tableLoading" size="small" border
                          :header-cell-style="{'background-color': '#fafafa'}">
                    <el-table-column prop="no" label="编辑时间" align="center"></el-table-column>
                    <el-table-column v-if="param.catalogIds !=5" prop="name" label="按钮名称" align="center"></el-table-column>
                    <el-table-column  label="类型" align="center">
                        <template slot-scope="scope">
                            {{scope.row.type}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="内容" align="center">
                        <template slot-scope="scope">
                            <p v-if="param.catalogIds !=5">{{scope.row.contactName}}<br/>{{scope.row.contactMobile}}</p>
                            <p v-else>{{scope.row.nickName}}<br/>{{scope.row.bindUserName}}</p>
                        </template>
                    </el-table-column>
                    <!-- 操作区 -->
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="toDetail(scope.row)">编辑</el-button>

                            <el-popconfirm
                                class="res-pop-confirm"
                                title="确定删除吗？"
                                @onConfirm="deleteResource(o)">
                                <el-button  type="text" size="small" @click="toDetail(scope.row)" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>




        <!-- dialog start-->
        <el-dialog
            title="新建按钮-电话"
            :visible.sync="dialogVisibleTel"
            width="600px"
            center
            :close-on-click-modal="false">

            <el-form ref="form" :model="dialogForm" label-width="80px" size="small">
                <el-form-item label="按钮名称">
                    <el-input v-model="dialogForm.name" placeholder="请输入按钮名称" maxlength="25" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="dialogForm.name" placeholder="请输入联系电话"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleTel = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="新建按钮-URL"
            :visible.sync="dialogVisibleUrl"
            width="600px"
            center
            :close-on-click-modal="false">

            <el-form ref="form" :model="dialogForm" label-width="80px" size="small">
                <el-form-item label="按钮名称">
                    <el-input v-model="dialogForm.name" placeholder="请输入按钮名称" maxlength="25" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="操作地址">
                    <el-input v-model="dialogForm.name" placeholder="请输入操作地址"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleUrl = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- dialog end-->
    </section>
</template>

<script>
    export default {
        name: "ButtonResource",
        components: {},
        data() {
            return {
                popVisible:false,
                dialogVisibleTel:false,
                dialogVisibleUrl:false,
                dialogForm:{},
                searchModel:{},
                activeGroupType:'1',
                pushList:[
                    {
                        no:2232454252,
                        name:'羊毛党音频',
                        type:'native',
                        createTime:'2020-05-14 '
                    }
                ],
                tableLoading:false,
                param:{current:1,size:10,total:0},// 传入后台参数
            }
        },
        methods: {
            search(){},
            switchGroup(type){
                this.activeGroupType = type
            },
            deleteGroup(type){
                this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleCommand(command){
                console.log('e....',command)
                if (command==1){//url
                    this.dialogVisibleUrl = true
                    this.dialogVisibleTel = false
                } else if (command==2){//电话
                    this.dialogVisibleTel = true
                    this.dialogVisibleUrl = false
                } else if (command==3){//选模板
                    this.$router.push('/resourceManage/createButton')
                }
            },
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    .button-resource{

    }
</style>
