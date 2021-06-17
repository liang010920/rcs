<template>
    <section class="create-button wrap-container">
        <el-form ref="form" :model="buttonForm" label-width="80px" size="small">

            <el-form-item label="按钮名称">
                <el-input v-model="buttonForm.name" placeholder="请输入按钮名称" maxlength="8" show-word-limit></el-input>
                <!--<div>请填写有效合法的建议操作按钮名称</div>-->
            </el-form-item>
            <el-form-item label="内容">
                <template v-if="templateName">
                    <span class="button-content">{{templateName}}</span>
                    <el-button @click="dialogVisible=true">重新选择</el-button>
                </template>
                <template v-else>
                    <el-button @click="dialogVisible=true">选择模板</el-button>
                </template>


            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>

        <!-- dialog start-->
        <el-dialog
            title="选择模板"
            :visible.sync="dialogVisible"
            width="1000px"
            center
            :close-on-click-modal="false">

            <el-input
                class="template-input"
                placeholder="请输入模板名称"
                prefix-icon="el-icon-search"
                size="small"
                v-model="param">
            </el-input>

            <el-table
                fit v-loading="tableLoading" size="small"
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
                <el-table-column prop="name" label="关键词" align="center"></el-table-column>
                <el-table-column label="消息类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.type}}
                    </template>
                </el-table-column>
                <el-table-column prop="templateType" label="模板类型" align="center"></el-table-column>
                <el-table-column prop="terminal" label="可触达终端" align="center"></el-table-column>
                <el-table-column prop="templateStatus" label="模板状态" align="center"></el-table-column>

            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="confirmSelect">确 定</el-button>
            </span>
        </el-dialog>
        <!-- dialog end-->
    </section>
</template>

<script>
    export default {
        name: "CreateButton",
        components: {},
        data() {
            return {
                buttonForm:{},
                dialogVisible:false,
                tableData:[
                    {
                        name:'羊毛党音频1',
                        key:'防羊毛',
                        type:'语音',
                        templateType:'Maap',
                        terminal:'Maap',
                        templateStatus:'上架',
                        modifyTime:'2020-05-15 11:11:11',
                    },
                    {
                        name:'羊毛党音频2',
                        key:'防羊毛',
                        type:'语音',
                        templateType:'Maap',
                        terminal:'Maap',
                        templateStatus:'上架',
                        modifyTime:'2020-05-15 11:11:11',
                    }
                ],
                currentRow: null,
                tableLoading:false,
                templateName:'',
                param:''
            }
        },
        methods: {
            submitForm(){},
            cancel(){},
            handleCurrentChange(val) {
                console.log(val)
                this.currentRow = val;
            },
            confirmSelect(){
                this.dialogVisible = false
                if (this.currentRow) {
                    this.templateName = this.currentRow.name
                }

            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    .create-button{
        .button-content{
            margin-right: 10px;
        }
        .template-input{
            margin-bottom: 20px;
            width: 250px;
        }
    }
</style>
