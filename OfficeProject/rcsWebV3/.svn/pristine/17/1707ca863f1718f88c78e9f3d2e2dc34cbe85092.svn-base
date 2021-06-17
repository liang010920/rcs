<template>
    <section class="text-resource resource-manage">
        <el-form :inline="true" :model="searchModel" size="small">
            <el-form-item label="">
                <el-input v-model="searchModel.param" placeholder="搜索文本"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="dialogVisible=true">新建文本</el-button>
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
            <el-col :span="6" v-for="(o, index) in 5" :key="o" style="margin-bottom: 15px">
                <el-card :body-style="{ padding: '15px'}">

                    <div class="item-desc">
                        <h3>好吃的汉堡</h3>
                        <p class="o-webkit-line2 theme-color-gray desc">这是详情这是详情这是详情这是详情这是详情这是详情</p>
                        <div class="bottom theme-color-gray">
                            <span>更新于 2020-05-18 11:11</span>
                            <span class="control">
                                 <i class="el-icon-edit" @click="editResource"></i>
                                <i class="el-icon-view" @click="previewResource(o)"></i>
                                <el-popconfirm
                                    class="res-pop-confirm"
                                    title="确定删除吗？"
                                    @onConfirm="deleteResource(o)">
                                    <i class="el-icon-delete" slot="reference"></i>
                                </el-popconfirm>
                            </span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>


        <!-- dialog start-->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="600px"
            center
            :close-on-click-modal="false">

            <el-form ref="form" :model="dialogForm" label-width="80px" size="small">
                <el-form-item label="名称">
                    <el-input v-model="dialogForm.name" placeholder="请输入名称" maxlength="25" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="dialogForm.desc" rows="3"></el-input>
                </el-form-item>
                <el-form-item label="分组">
                    <el-select v-model="dialogForm.region" placeholder="请选择分组">
                        <el-option label="未分组" value="shanghai"></el-option>
                        <el-option label="分组一" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- dialog end-->

        <!-- preview dialog start-->
        <el-dialog
            title="预览"
            :visible.sync="previewDialogVisible"
            width="600px"
            center
            :close-on-click-modal="false">

            <div>
                <el-card :body-style="{ padding: '15px'}">
                    <div class="item-desc">
                        <h3>好吃的汉堡</h3>
                        <p class="theme-color-gray desc">这是详情这是详情这是详情这是详情这是详情这是详情这是详情详情这是详情这是详情这是详情这是详情详情这是详情这是详情这是详情这是详情</p>
                        <div class="bottom theme-color-gray">
                            <span>更新于 2020-05-18 11:11</span>
                        </div>
                    </div>
                </el-card>
            </div>


        </el-dialog>
        <!-- preview dialog end-->

    </section>
</template>

<script>
    export default {
        name: "TextResource",
        components: {},
        data() {
            return {
                popVisible:false,
                dialogVisible:false,
                dialogForm:{},
                searchModel:{},
                activeGroupType:'1',
                dialogTitle:'新建文本',
                previewDialogVisible:false,
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
            editResource(){
                this.dialogVisible = true
                this.dialogTitle = '编辑文本'
            },
            previewResource(resource){
                this.previewDialogVisible = true
            },
            deleteResource(resource){
                console.log(resource)
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">

</style>
