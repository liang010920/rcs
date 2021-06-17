<template>
    <section class="group-manage wrap-container">

        <div class="main">
            <div class="left">
                <div class="control">
                    <el-button @click="appendGroup" size="mini">增加</el-button>
                    <el-button @click="editGroup" size="mini" :disabled="disabled">编辑</el-button>
                    <el-button @click="remove" size="mini" :disabled="disabled">删除</el-button>
                    <el-button @click="allOut" size="mini">全量导出</el-button>
                    <el-button @click="dynamicPropsDialogFlag=true;setProperty()" size="mini">通讯录设置</el-button>
                </div>
                <!--:data="treeData"-->
                <el-tree @node-click="nodeClick" ref="groupTree" check-strictly node-key="id" :load="loadNode" lazy
                    :default-expanded-keys="[0]" highlight-current :expand-on-click-node="false">
                    <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
                    <!--<span>{{ node.label }}</span>-->
                    <!--<span>-->
                    <!--<el-popover-->
                    <!--placement="left"-->
                    <!--width="200"-->
                    <!--v-model="data.popVisible">-->
                    <!--<div >-->
                    <!--增加分组-->
                    <!--</div>-->
                    <!--<div style="padding: 10px 0 15px 0">-->
                    <!--<el-input size="mini" v-model="data.groupName" placeholder="请输入分组名称"></el-input>-->
                    <!--</div>-->

                    <!--<div style="text-align: right; margin: 0">-->
                    <!--<el-button size="mini" type="text" @click="data.popVisible = false">取消</el-button>-->
                    <!--<el-button type="primary" size="mini" @click="() => append(data)">确定</el-button>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<el-button type="primary" size="mini" slot="reference" round>新建分组</el-button>&ndash;&gt;-->
                    <!--<el-button type="text" size="mini" slot="reference">-->
                    <!--增加-->
                    <!--</el-button>-->
                    <!--</el-popover>-->

                    <!--<template v-if="node.label!='通讯录群组'">-->
                    <!--<el-popover-->
                    <!--placement="left"-->
                    <!--width="200"-->
                    <!--v-model="data.popEditVisible">-->
                    <!--<div >-->
                    <!--编辑分组-->
                    <!--</div>-->
                    <!--<div style="padding: 10px 0 15px 0">-->
                    <!--<el-input size="mini" v-model="editGroupName" placeholder="请输入新的分组名称"></el-input>-->
                    <!--</div>-->

                    <!--<div style="text-align: right; margin: 0">-->
                    <!--<el-button size="mini" type="text" @click="data.popEditVisible = false">取消</el-button>-->
                    <!--<el-button type="primary" size="mini" @click="saveTreeNode(data)">确定</el-button>-->
                    <!--</div>-->
                    <!--<el-button @click="editTreeNode(data)" type="text" size="mini" slot="reference">-->
                    <!--编辑-->
                    <!--</el-button>-->
                    <!--</el-popover>-->

                    <!--<el-popconfirm-->
                    <!--class="res-pop-confirm"-->
                    <!--title="确定删除吗？"-->
                    <!--@onConfirm="() => remove(node, data)">-->
                    <!--<el-button-->
                    <!--slot="reference"-->
                    <!--type="text"-->
                    <!--size="mini">-->
                    <!--删除-->
                    <!--</el-button>-->
                    <!--</el-popconfirm>-->
                    <!--</template>-->

                    <!--</span>-->
                    <!--</span>-->
                </el-tree>
            </div>

            <div class="right">
                <el-form ref="form" :model="rightForm" label-width="80px" size="small">

                    <el-form-item label="">
                        <div>当前群组 <el-input v-model="rightForm.name" placeholder="请点击左边的树选择一个分组" disabled maxlength="20"
                                show-word-limit style="width: 80%"></el-input>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label=""> -->
                    <!-- <el-button @click="batchIn">批量导入</el-button> -->
                    <!--<el-button @click="batchOut">批量导出</el-button>-->
                    <!-- <el-button @click="manuallyAdd">手动添加</el-button> -->
                    <!-- </el-form-item> -->


                    <!-- 手动添加区域 -->

                    <el-form-item label="" class="mobile-detail">
                        <h3>联系人</h3>
                        <el-form-item style="margin-bottom: 12px">

                            <el-button @click="deleteContacts">批量删除</el-button>

                            <el-button @click="batchIn">批量导入</el-button>
                            <!--<el-button @click="batchOut">批量导出</el-button>-->
                            <el-button @click="manuallyAdd">手动添加</el-button>
                        </el-form-item>
                        <!-- 手动添加区域 -->
                        <el-collapse-transition>
                            <div v-show="manuallyFlag" class="manually-add-wrapper">
                                <el-form size="small" :inline="true" :model="contact">

                                    <el-form-item v-for="prop in tablePropsList">
                                        <el-input :placeholder="prop.tableDesc" v-model="contact[prop.tableKey]"
                                            style="width: 120px"></el-input>
                                    </el-form-item>

                                    <!--<el-form-item>-->
                                    <!--<el-input placeholder="姓名" v-model="contact.name" style="width: 100px"></el-input>-->
                                    <!--</el-form-item>-->
                                    <!--<el-form-item>-->
                                    <!--<el-input placeholder="手机号码" v-model="contact.phoneNo" style="width: 120px"></el-input>-->
                                    <!--</el-form-item>-->
                                    <!--<el-form-item>-->
                                    <!--<el-input placeholder="备注" v-model="contact.userCode" style="width: 150px"></el-input>-->
                                    <!--</el-form-item>-->
                                    <el-form-item>
                                        <el-button @click="manuallyFlag=false">取消</el-button>

                                        <el-button type="primary" @click="addContact">添加</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-collapse-transition>
                        <div class="tag-wrap scrollbar">
                            <!--<el-tag-->
                            <!--v-for="(tag,index) in contacts"-->
                            <!--:key="tag.name"-->
                            <!--closable-->
                            <!--:type="tag.type"-->
                            <!--@close="handleDeleteContact(index)"-->
                            <!--:disable-transitions="false"-->
                            <!--effect="plain">-->
                            <!--{{tag.name + ',' + tag.phoneNo +','+tag.description}}-->
                            <!--</el-tag>-->

                            <el-table ref="multipleTable" class="contactInfoHeight" :data="contacts"
                                tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="45">
                                </el-table-column>
                                <el-table-column width="70px">
                                    <template slot="header" slot-scope="scope">
                                        <span>排序</span>
                                        <!--<el-tooltip class="item" effect="dark" content="数值越大排越前" placement="right">-->
                                        <!--<i class="el-icon-question"></i>-->
                                        <!--</el-tooltip>-->
                                    </template>
                                    <template slot-scope="scope">
                                        <!--<el-input size="mini" v-model="scope.row.seq" maxlength="4" @change="updateSort(scope.row)">-->
                                        <!--</el-input>-->
                                        <el-button type="text" size="small" @click="updateSort(scope.row)">置顶
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="prop in tablePropsList" :prop="prop.tableKey"
                                    :label="prop.tableDesc">
                                </el-table-column>
                                <el-table-column prop="" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="showModContact(scope.row)">修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>


                        <!-- 页码区 -->
                        <div class="page-wrap" style="width: 90%">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="page.curPage" :page-sizes="[10, 15, 20, 30]" :page-size="page.size"
                                layout="total, sizes, prev, pager, next, jumper" :total="page.total">
                            </el-pagination>
                        </div>

                    </el-form-item>
                    <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="saveManage" size="small">保存号码</el-button>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </div>


        <!--<div class="footer">-->
        <!--<el-button type="primary" @click="saveManage" size="small">保存修改</el-button>-->
        <!--</div>-->



        <!-- 手动添加 start -->
        <!--<el-dialog-->
        <!--title="手动添加"-->
        <!--:visible.sync="manuallyFlag"-->
        <!--width="600px"-->
        <!--center-->
        <!--:close-on-click-modal="false">-->

        <!--<el-form :model="dataObj">-->
        <!--<el-form-item>-->
        <!--<el-row style="margin-top:20px" type="flex" align="middle" v-for="(mobile,index) in mobileList" :key="index">-->
        <!--<el-col :span="22">-->
        <!--<el-input placeholder="" size="small" v-model="mobile.mobile">-->
        <!--<template slot="prepend">手机号</template>-->
        <!--</el-input>-->
        <!--</el-col>-->

        <!--<el-col :span="2" style="text-align: center;margin-top: -8px">-->
        <!--<el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteMobile(index)"></el-button>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--</el-form-item>-->
        <!--<el-form-item class="packageDetail">-->
        <!--<el-button type="primary" size="small" icon="el-icon-plus" @click="addMobile">添加手机号</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->

        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="manuallyFlag = false" size="small">取 消</el-button>-->
        <!--<el-button type="primary" size="small" @click="manuallyFlag = false">确 定</el-button>-->
        <!--</span>-->
        <!--</el-dialog>-->
        <!-- 手动添加 end -->



        <!-- 批量导入start -->
        <el-dialog title="批量导入" :visible.sync="batchTemplateDialogFlag" width="600px" center
            :close-on-click-modal="false">

            <el-form size="mini">
                <section v-show="!manuallyImportFlag">
                    <el-form-item label="模板下载">
                        <el-button type="primary" size="small" class="file-wrap" @click="downloadTemp">文件模板下载
                        </el-button>
                    </el-form-item>
                    <el-form-item label="数据导入">
                        <el-button type="primary" size="small" class="file-wrap" style="margin-right: 15px">
                            <input class="seat" type="file"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                @change="excel2json($event)">选择文件导入
                        </el-button>
                        <el-radio v-model="matchRadio" label="1">自动匹配</el-radio>
                        <el-radio v-model="matchRadio" label="2">手动匹配</el-radio>
                    </el-form-item>
                </section>


                <el-form-item v-show="manuallyImportFlag">
                    <el-table :data="tablePropsList" fit size="mini" border
                        :header-cell-style="{'background-color': '#fafafa'}">
                        <el-table-column prop="tableKey" label="数据库字段" align="center">
                            <template slot-scope="scope">
                                {{scope.row.tableKey}}（{{scope.row.tableDesc}}）
                            </template>
                        </el-table-column>
                        <el-table-column label="源字段" align="center">

                            <template slot-scope="scope">
                                <el-select v-model="scope.row.sourceKey" placeholder="请选择">
                                    <el-option v-for="item in sourcePropsList" :key="item" :value="item">
                                    </el-option>
                                </el-select>
                            </template>

                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button v-show="!manuallyImportFlag" @click="batchTemplateDialogFlag = false" size="small">取 消
                </el-button>
                <el-button v-show="manuallyImportFlag" @click="startMatching" size="small" type="primary">开始导入
                </el-button>
            </span>
        </el-dialog>
        <!-- 批量end -->

        <!-- 通讯录设置 start -->
        <el-dialog title="通讯录设置" :visible.sync="dynamicPropsDialogFlag" width="600px" center
            :close-on-click-modal="false">
            <el-form label-position="top" size="mini">
                <el-form-item label="自定义属性" class="custom-props">

                    <el-table ref="dynamicPropsRef" :data="dynamicProps" @selection-change="dynamicPropsSelectionChange"
                        style="width: 100%">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="全选 / 全不选" width="120">
                            <template slot-scope="scope">
                                定制信息{{scope.row.name}}名称
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.value"></el-input>
                            </template>
                        </el-table-column>


                    </el-table>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dynamicPropsDialogFlag = false" size="small">取 消</el-button>
                <el-button @click="saveProperty" size="small" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 通讯录设置 end -->

        <!-- 修改联系人start -->
        <el-dialog title="修改联系人" :visible.sync="modContactDialogFlag" width="600px" center
            :close-on-click-modal="false">
            <el-form label-position="top" size="small" :model="contactTemp">
                <el-form-item v-for="prop in tablePropsList">
                    <el-input :placeholder="prop.tableDesc" v-model="contactTemp[prop.tableKey]"></el-input>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="modContactDialogFlag = false" size="small">取 消</el-button>
                <el-button @click="modContact" size="small" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改联系人end -->
    </section>
</template>

<script>
    import {
        getGroupListByParent,
        saveGroup,
        delGroup,
        getContactPhoneList,
        delContactPhone,
        saveContactPhone,
        updateContactPhone,
        getDynamicProperty,
        saveDynamicProperty,
        sortTop
    } from '../../api/api'
    let id = 1000;
    export default {
        name: "GroupManage",
        components: {},
        data() {
            const data = [{
                id: 1,
                label: '通讯录群组',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }]
                }],
            }];

            let list = Array.from({
                length: 8
            }, (val, i) => {
                return {
                    name: i + 1,
                    value: null
                }
            })

            return {
                treeData: [],
                rightForm: {
                    name: '',
                    dataObj: {}
                },
                batchTemplateDialogFlag: false,
                manuallyFlag: false,
                mobileList: [],
                disabled: false, //禁用
                contact: {},
                contacts: [
                    // { name: 'name1', phoneNo:'13444444444',description:'上海市普陀区'},
                ],
                contactTemp: {},
                editGroupName: '',
                dynamicPropsDialogFlag: false,
                modContactDialogFlag: false,
                dynamicProps: list,
                currPropsStr: '',
                inputVisible: false,
                inputValue: '',
                tablePropsList: [{
                    tableKey: 'name',
                    tableDesc: '姓名',
                    sourceKey: ''
                }, {
                    tableKey: 'phoneNo',
                    tableDesc: '手机号',
                    sourceKey: ''
                }, {
                    tableKey: 'description',
                    tableDesc: '备注',
                    sourceKey: ''
                }],
                matchRadio: '1', // 1自动2手动
                manuallyImportFlag: false, //手动导入匹配标记
                sourcePropsList: [],
                jsonArrayTemp: [],
                jsonArray: [], // 保存时清空
                multipleSelection: [],
                rootCode: '',
                page: {
                    curPage: 1,
                    size: 10,
                    total: 0
                }, // 传入后台参数
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
            loadData() {
                this.getContacts(0, 0)
            },
            test() {
                let data = this.$refs.groupTree.getCurrentNode()
                let node = this.$refs.groupTree.getNode(data)
                console.log(data)
                console.log(this.$refs.groupTree.getNode(data))
            },
            batchIn() {
                if (this.checkGroup()) {
                    this.batchTemplateDialogFlag = !this.batchTemplateDialogFlag;
                    this.manuallyImportFlag = false
                }
            },
            batchOut() {
                if (this.checkGroup()) {

                }
            },
            manuallyAdd() {
                if (this.checkGroup()) {
                    this.manuallyFlag = !this.manuallyFlag
                }
            },
            checkGroup() {
                if (!this.rightForm.dataObj.code) {
                    this.$message.warning('请从左边选择一个分组')
                    return false
                }
                return true
            },
            allOut() {
                let headDesc = '姓名,手机号,备注'
                if (this.currPropsStr) {
                    headDesc += (',' + this.currPropsStr)
                }
                let head = headDesc.split(',')
                let data = [head]
                this.getContacts(1, 1, contacts => {
                    contacts.forEach(contact => {
                        let arr = [contact.name, contact.phoneNo, contact.description]
                        for (let i = 3; i < head.length; i++) {
                            arr.push(contact['extend' + (i - 2)])
                        }
                        data.push(arr)
                    })
                    // rightForm:{name:'',dataObj:{}},
                    this.$array2Excel(data, '全量导出' + this.rightForm.name)
                })
            },
            downloadTemp() {
                // 批量导入联系人模板
                let head = 'name,phoneNo,description'
                let headDesc = '姓名,手机号,备注'
                let headArr = head.split(',')
                if (this.currPropsStr) {
                    headDesc += (',' + this.currPropsStr)
                    let len = this.currPropsStr.split(',').length

                    let list = Array.from({
                        length: len
                    }, (val, i) => {
                        return 'extend' + (i + 1)
                    })
                    headArr.push(...list)
                }

                this.$array2Excel([headArr, headDesc.split(',')], '批量导入联系人模板')
            },

            excel2json(evt) {
                this.$excel2Array(evt, jsonArray => {

                    if (jsonArray.length > 0) {

                        if (jsonArray[0].name == '姓名' && jsonArray[0].phoneNo == '手机号') {
                            jsonArray.splice(0, 1)
                            if (jsonArray.length == 0) {
                                this.$message.warning("没有匹配到数据");
                                return
                            }
                        }

                        this.sourcePropsList = []
                        this.sourcePropsList.push(...Object.keys(jsonArray[0]))
                        if (this.matchRadio == 1) { // 自动匹配
                            let num = 0
                            for (let pro in this.sourcePropsList) {
                                for (let tpro in this.tablePropsList) {
                                    if (this.sourcePropsList[pro] == this.tablePropsList[tpro]['tableKey']) {
                                        num++
                                    }
                                }
                            }
                            if (num == 0) {
                                this.$message.warning("自动匹配失败，请尝试手动匹配");
                                return
                            }

                            this.contacts.reverse().push(...jsonArray)
                            this.contacts.reverse()
                            this.batchTemplateDialogFlag = false
                            this.jsonArray.push(...jsonArray)
                            this.saveContacts(jsonArray)
                            // this.$message.success("操作成功");
                        } else { //手动匹配
                            this.manuallyImportFlag = true
                            this.jsonArrayTemp = jsonArray
                            this.cleanSourceKey()
                        }
                    } else {
                        this.$message.warning("没有数据");
                    }
                })
            },

            startMatching() {
                // this.manuallyImportFlag = false

                // 校验
                let num = 0
                for (let i in this.tablePropsList) {
                    if (this.tablePropsList[i]['sourceKey'] === '') {
                        num++
                    }
                }
                if (num == this.tablePropsList.length) {
                    this.$message.warning('请选择源字段')
                    return
                }

                // alert('arr:', arr.length)
                let arr = this.jsonArrayTemp.map(contact => {
                    let item = {}
                    // tablePropsList:[{tableKey:'name',sourceKey:''},{tableKey:'phoneNo',sourceKey:''},{tableKey:'userCode',sourceKey:''}],

                    this.tablePropsList.forEach(val => {
                        item[val.tableKey] = contact[val.sourceKey]
                    })

                    return item
                })


                this.jsonArray.push(...arr)
                this.saveContacts(arr)

                this.contacts.reverse().push(...arr)
                this.contacts.reverse()
                this.batchTemplateDialogFlag = false
            },
            cleanSourceKey() {
                this.tablePropsList.forEach(val => {
                    val.sourceKey = ''
                })
            },

            editGroup() {
                let data = this.$refs.groupTree.getCurrentNode()
                if (!data) {
                    this.$message({
                        message: '请先选择一个节点',
                        type: 'warning'
                    });
                    return
                } else {
                    let node = this.$refs.groupTree.getNode(data)
                    if (!node) {
                        this.$message({
                            message: '请先选择一个节点',
                            type: 'warning'
                        });
                        return
                    }
                }

                this.$prompt('请输入新组名', '编辑提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '不能为空'
                }).then(({
                    value
                }) => {
                    data.label = value
                    saveGroup({
                        id: data.id + '',
                        name: value
                    }).then(rsp => {
                        if (rsp.success) {
                            this.$store.commit('SET_INFO_PUSH_FLAG', false)
                            this.$message.success("编辑成功");
                        } else {
                            this.$message.warning(rsp.message)
                        }
                    })
                });
            },
            appendGroup() {
                let currentNode = this.$refs.groupTree.getCurrentNode()
                if (!currentNode) {
                    this.$message({
                        message: '请先选择一个节点',
                        type: 'warning'
                    });
                    return
                } else {
                    let node = this.$refs.groupTree.getNode(currentNode)
                    if (!node) {
                        this.$message({
                            message: '请先选择一个节点',
                            type: 'warning'
                        });
                        return
                    }
                }

                this.$prompt('请输入组名', '增加提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '不能为空'
                }).then(({
                    value
                }) => {
                    currentNode.groupName = value
                    saveGroup({
                        parentCode: currentNode.code,
                        name: value
                    }).then(rsp => {
                        if (rsp.success) {
                            this.append(currentNode, rsp.data)
                            // 让消息推送群组重新加载
                            this.$store.commit('SET_INFO_PUSH_FLAG', false)
                        } else {
                            this.$message.warning(rsp.message)
                        }
                    })

                });
            },
            append(currNode, obj) {
                currNode.popVisible = false
                let newChild = {
                    id: obj.id,
                    label: currNode.groupName,
                    code: obj.code,
                    children: []
                };
                if (!currNode.children) {
                    this.$set(currNode, 'children', []);
                }
                console.log('newChild:', newChild)
                currNode.children.push(newChild);
                this.$message.success("增加成功");
                this.initData()
            },

            remove() {
                let data = this.$refs.groupTree.getCurrentNode()
                if (!data) {
                    this.$message({
                        message: '请先选择一个节点',
                        type: 'warning'
                    });
                    return
                }
                let node = this.$refs.groupTree.getNode(data)
                if (!node) {
                    this.$message({
                        message: '请先选择一个节点',
                        type: 'warning'
                    });
                    return
                }

                this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delGroup({
                        code: data.code
                    }).then(rsp => {
                        console.log('rrr:', rsp)
                        if (rsp.success) {
                            // const parent = node.parent;
                            // const children = parent.childNodes;
                            // const index = children.findIndex(d => d.id === node.id);
                            // children.splice(index, 1);
                            this.$refs.groupTree.remove(node)
                            console.log('children：', children)
                            this.$message.success("删除成功");
                            this.$store.commit('SET_INFO_PUSH_FLAG', false)
                        } else {
                            this.$message.warning(rsp.message)
                        }
                    })
                })
            },
            handleCheckChange(data, checked, indeterminate) {

                console.log('data---', data)
                // this.page.curPage = 1
                // let code = data.code
                // if (checked){
                //     // console.log('this.contactMap[code]--------',this.contactMap[code])
                //     // if (!this.contactMap[code]) {
                //         getContactPhoneList({type:0,paging:1,groupCode:code}).then(rsp=>{
                //             if (rsp.success){
                //                 this.contactMap[code] = rsp.data
                //             }
                //         })
                //     // }
                // }
                // console.log(checked)
                // if (checked) {
                //     if (data.label == '通讯录群组') {
                //         this.disabled = true
                //     } else {
                //         this.disabled = false
                //     }
                //     this.rightForm.name = data.label
                //     this.rightForm.dataObj = data

                //     this.getContacts(0, 0)
                // } else {
                //     this.rightForm.name = ''
                //     this.rightForm.dataObj = ''
                //     getContactPhoneList({
                //         type: 0,
                //         paging: 0,
                //         groupCode: '',
                //         current: this.page.curPage,
                //         size: this.page.size
                //     }).then(rsp => {
                //         if (rsp.success) {
                //             this.contacts = rsp.data.records
                //             this.page.total = rsp.data.total
                //         }
                //     })
                // }
            },
            // saveManage(){
            //     this.$message.success("保存成功");
            //
            // },
            // addMobile(){
            //     this.mobileList.push({})
            // },
            // deleteMobile(index){
            //     this.mobileList.splice(index,1)
            // },
            // 选中的数据、选中的节点、节点组件

            nodeClick(dataObj, nodeObj, node) {
                // alert(1)
                console.log(dataObj, nodeObj, node)
                if (dataObj.label == '通讯录群组') {
                    this.disabled = true
                } else {
                    this.disabled = false
                }
                this.rightForm.name = dataObj.label
                this.rightForm.dataObj = dataObj

                this.getContacts(0, 0)

                this.$refs.groupTree.setCheckedNodes([])

            },
            loadNode(node, resolve) {
                // console.log('node:',node)
                if (node.level === 0) {
                    let customerId = this.$store.state.user.customerId
                    this.rootCode = customerId + '01'
                    return resolve([{
                        id: 0,
                        label: '通讯录群组',
                        code: this.rootCode
                    }]);
                } else {
                    this.getGroup(node.data.code, resolve)
                }

            },
            editTreeNode(node) {
                this.editGroupName = node.label
            },
            saveTreeNode(data) {
                data.popEditVisible = false
                data.label = this.editGroupName
                this.$message.success("编辑成功");
            },
            // handleDeleteContact(index){
            //     this.contacts.splice(index,1)
            // },
            addContact() {
                let contact = this.contact
                if (this.$checkMobile(contact.phoneNo)) {
                    this.contacts.unshift(contact)
                    this.manuallyFlag = false
                    this.saveContacts([contact])
                    this.contact = {}
                }
            },
            deleteContacts() {
                if (this.multipleSelection.length > 0) {
                    let loading = this.$loading({
                        text: '删除中，请稍后...'
                    })
                    let contacts = []
                    let delContacts = []
                    this.contacts.forEach(contact => {
                        let num = 0
                        this.multipleSelection.forEach(val => {
                            if (val.id) {
                                delContacts.push(val.id)
                            }
                            if (val === contact) {
                                num++
                            }
                        })
                        if (num == 0) {
                            contacts.push(contact)
                        }
                    })


                    // delete ajax
                    delContactPhone({
                        contactIds: delContacts.join()
                    }).then(rsp => {
                        if (rsp.success) {
                            this.$message.success('删除成功')
                            this.contacts = contacts
                            this.multipleSelection = []
                            this.loadData()
                            loading.close()
                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                } else {
                    this.$message.warning('请选择联系人')
                }

            },
            showModContact(row) {
                // console.log('this.multipleSelection:',this.multipleSelection)
                this.contactTemp = Object.assign({}, row)
                this.modContactDialogFlag = true
            },
            modContact() {
                this.contactTemp.contactId = this.contactTemp.id + ''
                updateContactPhone(this.contactTemp).then(rsp => {
                    if (rsp.success) {
                        this.$message.success('修改成功')
                        this.getContacts(0, 0)
                        this.contactTemp = {}
                        this.modContactDialogFlag = false
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            updateSort(contact) {
                console.log(contact)
                sortTop({
                    contactId: contact.id.toString(),
                    groupCode: this.rightForm.dataObj.code
                }).then(rsp => {
                    if (rsp.success) {
                        this.getContacts(0, 0)
                        this.$message.success('置顶成功')
                    }
                })

            },
            getGroup(parentCode, resolve) {
                getGroupListByParent({
                    parentCode: parentCode
                }).then(rsp => {
                    // console.log('rsp-----:',rsp)
                    if (rsp.success) {
                        rsp.data.forEach(val => {
                            val.label = val.name
                        })
                        resolve(rsp.data)
                    }

                })
            },
            initData() {
                // let customerId = this.$store.state.user.customerId
                // this.rootCode = customerId +'01'
                // let treeData0 = this.treeData[0]
                // treeData0.code = this.rootCode
                // getGroupListByParent({parentCode:this.rootCode}).then(rsp=>{
                //     // console.log(rsp)
                //     if (rsp.success){
                //         rsp.data.forEach(val=>{
                //             val.label = val.name
                //         })
                //         treeData0.children = rsp.data
                //     }
                //
                // })
                this.setProperty()
            },
            saveProperty() {
                let p = '@@@.###.%%%'
                this.selectDynamicProps.sort((val1, val2) => {
                    return val1.name - val2.name
                })
                let result = this.selectDynamicProps.map(val => {
                    if (val.value) {
                        return val.value
                    } else {
                        return p
                    }
                })

                let resultStr = result.join()
                if (resultStr.indexOf(p) == -1) {
                    let json = {}
                    json.type = 'string' // 1 字符串，2 radio 3 checkbox 4 select 5 multiSelect
                    // json.show=0// 不在系统配置显示
                    json.value = resultStr

                    saveDynamicProperty({
                        dynamicProperty: JSON.stringify(json)
                    }).then(rsp => {
                        if (rsp.success) {
                            this.$message.success('保存成功')
                            this.dynamicPropsDialogFlag = false
                            this.dynamicProps = Array.from({
                                length: 8
                            }, (val, i) => {
                                return {
                                    name: i + 1,
                                    value: null
                                }
                            })
                            this.currPropsStr = resultStr

                            this.initTableProps(this.currPropsStr)

                        } else {
                            this.$message.error(rsp.message)
                        }
                    })
                } else {
                    this.$message.warning('属性未设置')
                }
            },
            initTableProps(currPropsStr) {
                let len = 0
                if (currPropsStr) {
                    let arr = currPropsStr.split(',')
                    len = arr.length
                    arr.forEach((val, i) => {
                        this.tablePropsList[i + 3] = {
                            tableKey: 'extend' + (i + 1),
                            tableDesc: val,
                            sourceKey: ''
                        }
                    })
                }
                // 保证属性有效长度
                this.tablePropsList = this.tablePropsList.slice(0, len + 3)
            },
            dynamicPropsSelectionChange(val) {
                this.selectDynamicProps = val
            },
            setProperty() {
                // console.log(1)
                getDynamicProperty({}).then(rsp => {
                    if (rsp.success) {
                        let props = rsp.data
                        if (props) {
                            let json = JSON.parse(props.cfgValue)
                            this.currPropsStr = json.value
                            this.initTableProps(this.currPropsStr)

                            if (this.currPropsStr) {
                                let names = json.value.split(',')
                                let arr = this.dynamicProps.slice(0, names.length)

                                this.$nextTick(_ => {
                                    arr.forEach((row, i) => {
                                        row.value = names[i]
                                        if (this.dynamicPropsDialogFlag) {
                                            this.$refs.dynamicPropsRef.toggleRowSelection(row,
                                                true);
                                        }

                                    })
                                });
                            }
                        }
                    }
                })
            },
            saveContacts(list) {
                // let arr = [],success=0,fail=0
                // list.forEach(val=>{
                //     let mobile = val.phoneNo = val.phoneNo.trim()
                //     if (this.$checkMobile(mobile,false)){
                //         arr.push(val)
                //         success++
                //     } else{
                //         fail++
                //     }
                // })
                saveContactPhone({
                    contact: list,
                    groupCode: this.rightForm.dataObj.code
                }).then(rsp => {
                    if (rsp.success) {
                        // this.$message.success(`成功${success}条，失败${fail}条`)
                        this.$message.success('保存成功')
                    } else {
                        this.$message.error(rsp.message)
                    }
                })
            },
            /**
             *
             * @param type 0查当前群组，不查子群组
             * @param paging 0需要分页
             */
            getContacts(type, paging, fn) {
                let code = this.rightForm.dataObj.code;
                if (!code) {
                    code = this.rootCode
                }
                getContactPhoneList({
                    type: type,
                    paging: paging,
                    groupCode: code,
                    current: this.page.curPage,
                    size: this.page.size
                }).then(rsp => {
                    if (rsp.success) {
                        if (paging == 0) {
                            this.contacts = rsp.data.records
                            this.page.total = rsp.data.total
                        } else {
                            if (fn) {
                                fn(rsp.data)
                            }
                        }
                    }
                })
            }
        },
        watch: {

        },
        mounted() {
            this.initData()
            this.loadData();
            document.getElementsByClassName('el-table__body-wrapper')[0].style.height = document.documentElement
                .clientHeight - 50 - 50 - 40 - 51 - 25 - 45 - 51 - 60 - 51 - 18 - 2 + 'px'

            document.getElementsByClassName('el-tree')[0].style.height = document.documentElement
                .clientHeight - 50 - 50 - 40 - 38 + 'px'
            // this.getContacts(0,1,'')
        },
        activated() {
            this.initData()
            this.loadData();
        }
    }
</script>

<style lang="less">
    .group-manage {
        width: 100%;
        margin-left: 0px;

        .contactInfoHeight {
            .el-table__body-wrapper {
                overflow-y: hidden;
                &:hover{
                    overflow-y: auto;
                    scrollbar-color: #959697 transparent;
                    scrollbar-width: thin;
                }

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
        }
        .el-tree{
            overflow-y: hidden;
            &:hover{
                overflow-y: auto;
                scrollbar-color: #959697 transparent;
                scrollbar-width: thin;
            }

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

        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }

        .main {
            display: flex;

            .left {
                min-width: 400px;
                max-width: 60%;
                overflow: auto;

                .control {
                    margin-bottom: 10px;
                }

                .el-tree-node {
                    white-space: normal;
                }

                .el-tree-node__content {
                    height: auto;

                    .el-tree-node__label {
                        margin-top: 0;
                    }
                }
            }

            .right {
                flex: 1;

                .mobile-detail {
                    h3 {
                        margin-bottom: 10px;
                    }

                    .tag-wrap {
                        width: 90%;
                        max-width: 100%;
                        padding: 0px 15px;
                        white-space: normal;
                        word-break: break-all;
                        border: 1px solid #e1e1e1;
                        // overflow: auto;
                        // min-height: 100px;
                        // max-height: calc(~'100vh - 450px');
                        border-radius: 4px;
                    }

                    .el-input__inner {
                        padding: 0 10px;
                    }
                }
            }
        }

        .custom-tree-node>span:last-child {
            margin-left: 5px;
            width: 92px;
            display: inline-block;
        }

        .manually-add-wrapper {
            // margin-left: 80px;
        }

        .footer {
            margin-top: 20px;
            margin-left: 600px;
            text-align: left;
        }



        .el-tag {
            margin-right: 10px;

        }

        .custom-props .el-tag {
            margin-bottom: 10px;
        }

        .button-new-tag {
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }

        .input-new-tag {
            width: 90px;
            vertical-align: bottom;
        }

    }
</style>
