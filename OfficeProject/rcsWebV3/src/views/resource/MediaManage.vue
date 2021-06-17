<template>
    <section class="media-list wrap-container" @click="resetIndex--">
        <el-tabs v-model="tabType" @tab-click="handleClick">

            <el-tab-pane label="文本消息" name="TEMPLATE_TEXT">
                <media-item-list type="1" groupType="TEMPLATE_TEXT" :scene="scene" v-bind="$attrs" v-on="$listeners">
                </media-item-list>
            </el-tab-pane>

            <el-tab-pane label="图片消息" name="TEMPLATE_IMAGE">
                <media-item-list type="2" groupType="TEMPLATE_IMAGE" :scene="scene" v-bind="$attrs" v-on="$listeners">
                </media-item-list>
            </el-tab-pane>

            <el-tab-pane label="音频消息" name="TEMPLATE_AUDIO">
                <media-item-list type="3" groupType="TEMPLATE_AUDIO" :scene="scene" v-bind="$attrs" v-on="$listeners">
                </media-item-list>
            </el-tab-pane>

            <el-tab-pane label="视频消息" name="TEMPLATE_VIDEO">
                <media-item-list type="4" groupType="TEMPLATE_VIDEO" :scene="scene" v-bind="$attrs" v-on="$listeners">
                </media-item-list>
            </el-tab-pane>

            <el-tab-pane label="卡片消息" name="TEMPLATE_CARD">
                <media-item-list type="5" groupType="TEMPLATE_CARD" :scene="scene" v-bind="$attrs" v-on="$listeners">
                </media-item-list>
            </el-tab-pane>

            <!-- <el-tab-pane label="文件消息" name="TEMPLATE_DOCMENT">
               <media-item-list type="6" groupType="TEMPLATE_DOCMENT" :scene="scene" v-bind="$attrs" v-on="$listeners"></media-item-list>
           </el-tab-pane> -->

        </el-tabs>


        <!--<el-form :inline="true" :size="scene==1?'small':'mini'">-->
        <!--<el-form-item  label="模板类型">-->
        <!--<el-select v-model="params.type" placeholder="全部类型">-->
        <!--<el-option label="全部类型" value=""></el-option>-->
        <!--<el-option label="文本" value="1"></el-option>-->
        <!--<el-option label="图片" value="2"></el-option>-->
        <!--<el-option label="音频" value="3"></el-option>-->
        <!--<el-option label="视频" value="4"></el-option>-->
        <!--<el-option label="卡片" value="5"></el-option>-->
        <!--<el-option label="文件" value="6"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="模板名称">-->
        <!--<el-input clearable v-model="params.name"-->
        <!--placeholder="输入模板名称搜索"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>-->
        <!--<el-button type="primary" @click="addMedia">新建模板</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->

        <!--<el-row>-->
        <!--<el-col :span="16">-->
        <!--<el-button size="mini" round :type="activeGroupType==1?'primary':''" @click="switchGroup(1)">全部 (10)</el-button>-->
        <!--<el-button size="mini" round :type="activeGroupType==2?'primary':''" @click="switchGroup(2)">未分组 (2)</el-button>-->
        <!--<el-button size="mini" round :type="activeGroupType==3?'primary':''" @click="switchGroup(3)">仨组 (8)</el-button>-->
        <!--</el-col>-->
        <!--<el-col :span="8" style="text-align: right">-->
        <!--<el-button size="mini" round v-show="activeGroupType!=1&&activeGroupType!=2" @click="editGroup(activeGroupType)">编辑分组</el-button>-->
        <!--<el-button size="mini" round v-show="activeGroupType!=1&&activeGroupType!=2" @click="deleteGroup(activeGroupType)">删除分组</el-button>-->
        <!--<el-popover-->
        <!--placement="bottom"-->
        <!--width="200"-->
        <!--v-model="popVisible">-->
        <!--&lt;!&ndash;<div>&ndash;&gt;-->
        <!--&lt;!&ndash;新建分组&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<div style="padding: 10px 0 15px 0">-->
        <!--<el-input size="mini" v-model="groupName" placeholder="请输入分组名称"></el-input>-->
        <!--</div>-->

        <!--<div style="text-align: right; margin: 0">-->
        <!--<el-button size="mini" type="text" @click="popVisible = false">取消</el-button>-->
        <!--<el-button type="primary" size="mini" @click="popVisible = false">确定</el-button>-->
        <!--</div>-->
        <!--<el-button type="primary" size="mini" slot="reference" round>新建分组</el-button>-->
        <!--</el-popover>-->
        <!--</el-col>-->
        <!--</el-row>-->


        <!--<section>-->
        <!--<el-table :data="mediaList" fit v-loading="tableLoading" :size="scene==1?'small':'mini'" border-->
        <!--@current-change="selectCurrentChange"-->
        <!--:highlight-current-row="scene==2"-->
        <!--:header-cell-style="{'background-color': '#fafafa'}">-->
        <!--<el-table-column prop="name" label="模板名称" align="center"></el-table-column>-->
        <!--<el-table-column label="模板类型" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--{{typeObj[scope.row.type]}}-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--&lt;!&ndash;<el-table-column prop="checkStatus" label="模板状态" align="center">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
        <!--&lt;!&ndash;{{scope.row.checkStatus==0?'未审核':scope.row.checkStatus==1?'审核通过':scope.row.checkStatus==2?'审核失败':scope.row.checkStatus==3?'审核中':''}}&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--<el-table-column prop="modifyTime" label="编辑日期" align="center"></el-table-column>-->

        <!--&lt;!&ndash; 操作区 &ndash;&gt;-->
        <!--<el-table-column label="操作" align="center" width="170" v-if="scene==1">-->
        <!--<template slot-scope="scope">-->
        <!--&lt;!&ndash;<el-button  type="text" size="small" @click="toCheck(scope.row)" v-if="scope.row.checkStatus==0||scope.row.checkStatus==2">审核</el-button>&ndash;&gt;-->
        <!--<el-button  type="text" size="small" @click="toPreview(scope.row)">预览</el-button>-->
        <!--<el-button  type="text" size="small" @click="toDetail(scope.row)">编辑</el-button>-->
        <!--<el-button  type="text" size="small" @click="deleteMedia(scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</section>-->

        <!-- 页码区 -->
        <!--<div class="page-wrap">-->
        <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="page.current"-->
        <!--:page-sizes="[6, 12, 18, 24]"-->
        <!--:page-size="page.size"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="page.total">-->
        <!--</el-pagination>-->
        <!--</div>-->

        <!--<el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" center>-->
        <!--<preview-media v-if="dialogVisible" :preData="preData" :replyList="JSON.parse(preData.suggestedResponse)"></preview-media>-->
        <!--</el-dialog>-->



    </section>
</template>

<script>
    import {
        getTemplateList,
        getOneResource,
        saveResource,
        delTemplate,
        getResourceCatalogList,
        saveResourceCatalog,
        delResourceCatalog
    } from '../../api/api'
    import PreviewMedia from './PreviewResource'
    import MediaItem from './MediaItem'
    import MediaItemList from './MediaItemList'

    export default {
        name: "TemplateList",
        components: {
            PreviewMedia,
            MediaItem,
            MediaItemList
        },
        props: {
            scene: {
                default: 1 //1普通模式2组件模式
            },
            tabType: {
                default: 'TEMPLATE_TEXT'
            }
        },
        data() {
            return {
                params: {
                    name: '',
                    type: '5'
                },
                mediaList: [],
                typeObj: {
                    '1': '文本',
                    '2': '图片',
                    '3': '音频',
                    '4': '视频',
                    '5': '卡片',
                    '6': '文件'
                },
                tableLoading: false,
                page: {
                    curPage: 1,
                    size: 6,
                    total: 0
                }, // 传入后台参数
                activeGroupType: '1',
                groupName: '',
                preData: {},
                dialogVisible: false,
                currentRow: {},
                resetIndex: -1,
                templateTabType: this.tabType
                // tabType:'1'
            }
        },
        methods: {
            handleCurrentChange: function(currentPage) { //改变当前页
                this.page.curPage = currentPage
                this.loadData()
            },
            handleSizeChange: function(size) { //改变页面size
                this.page.size = size;
                this.loadData()
            },
            selectCurrentChange(val) {
                this.currentRow = val;
                this.$emit('selectRow', val)
            },
            search() {
                this.loadData()
            },
            addMedia(command) {
                if (this.scene == 2) {
                    this.$emit('hideMask')
                }
                this.$router.push('/mediaManage/create')
            },
            toCheck(row) {

            },
            toPreview(row) {
                this.preData = row
                this.dialogVisible = true
            },
            toDetail(row) {
                this.$router.push('/mediaManage/edit?mid=' + row.id)
            },
            deleteMedia(media) {
                this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delTemplate({
                        id: media.id + ''
                    }).then(rsp => {
                        this.loadData()
                        if (rsp.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                }).catch(_ => {});
            },
            switchGroup(type) {
                this.activeGroupType = type
            },
            deleteGroup(type) {
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
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            editGroup(type) {
                this.$prompt('请输入新组名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '不能为空'
                }).then(({
                    value
                }) => {

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '取消输入'
                    // });
                });
            },
            loadData() {
                let param = {
                    curPage: this.page.curPage,
                    size: this.page.size
                }
                if (this.scene == 2) this.params.checkStatus = '1'
                Object.assign(param, this.params)
                this.tableLoading = true
                getTemplateList(param).then(rsp => {
                    // console.log('media resp:',rsp)
                    this.tableLoading = false
                    this.mediaList = rsp.data.records
                    this.page.total = rsp.data.total
                })
            },
            handleClick() {
                if (this.tabType == 'TEMPLATE_TEXT') {
                    this.params.type = '5'
                } else if (this.tabType == 'TEMPLATE_IMAGE') {
                    this.params.type = '1'
                } else if (this.tabType == 3) {

                }
            },
            delMedia(id) {
                delTemplate({
                    id: id + ''
                }).then(rsp => {
                    this.loadData()
                    if (rsp.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            },
            editMedia(id) {
                this.$router.push('/mediaManage/edit?mid=' + id)
            }
        },
        activated() {
            // console.log('tabType:',this.tabType)
            // this.loadData()
            // this.$emit("update:messageTabType",this.tabType)
        },
        // watch:{
        //     templateTabType(val){
        //         this.$emit('tabType',val)
        //     }
        // },
        mounted() {
            // this.loadData()
        }
    }
</script>

<style lang="less">
    .media-list {
        &.wrap-container {
            // margin-top: 5px;
        }

        .el-row {
            margin-bottom: 10px;

            // margin-right: -20px;
            .media-col {
                margin: 10px 20px 10px 0px;
            }

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
