<template>
    <section class="non-signature wrap-container">
        <!-- 搜索与编辑区 -->
        <el-form :inline="true" :model="param" size="small">
            <el-form-item label='客户编码'>
                <el-input v-model="param.customerNum" placeholder="请输入客户编码"></el-input>
            </el-form-item>
            <el-form-item label='客户名称'>
                <el-input v-model="param.customerName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
            <el-form-item label='联系人手机'>
                <el-input v-model="param.contactPersonPhone" placeholder="请输入联系人手机"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="load()" icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="addCsut()" icon="el-icon-search">新增</el-button>
            </el-form-item>
        </el-form>

        <!-- 列表区 -->
        <!-- <el-button @click="deleteTemp" size="mini" style="margin-bottom: 10px">删除</el-button> -->
        <el-table :data="csutList" fit v-loading="tableLoading" size="small" border
            :header-cell-style="{'background-color': '#fafafa'}" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="customerNum" label="客户编码" align="center"></el-table-column>
            <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
            <el-table-column prop="customerContactPerson" label="客户联系人" align="center"></el-table-column>
            <el-table-column prop="contactPersonPhone" label="联系人手机" align="center"></el-table-column>
            <el-table-column prop="auditTime" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <div v-for="item in custStatuList" :key="item.id" v-if="item.id==scope.row.status">{{item.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editCsut(scope.row)"
                        v-if="scope.row.status==30||scope.row.status==11||scope.row.status==12">编辑</el-button>
                    <el-button type="text" size="small" @click="details(scope.row)">详情</el-button>
                    <el-button type="text" size="small" v-if="scope.row.status==30" @click="service(scope.row)">分配服务代码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码区 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.current" :page-sizes="[10, 20, 50, 200, 500]" :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>

        <!-- 编辑区 -->
        <el-dialog :title="editTitle" class="detailsDialog" :visible.sync="editDialog" width="60%"
            :close-on-click-modal="false">
            <el-form label-width="150px" size="small" :model="csutForm" :rules="rules" ref="csutForm">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>客户信息</span>
                    </div>
                    <div class="">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="代理商名称" prop="belongAgentName">
                                    <el-input v-model="csutForm.belongAgentName" placeholder="请输入代理商名称" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="代理商编码" prop="belongAgentCode">
                                    <el-input v-model="csutForm.belongAgentCode" placeholder="请输入代理商编码" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="客户名称" prop="customerName">
                                    <el-input v-model="csutForm.customerName" placeholder="请输入客户名称" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="客户联系人" prop="customerContactPerson">
                                    <el-input v-model="csutForm.customerContactPerson" placeholder="请输入客户联系人"
                                        maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="联系人手机" prop="contactPersonPhone">
                                    <el-input v-model="csutForm.contactPersonPhone" placeholder="请输入联系人手机"
                                        maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系人邮箱" prop="contactPersonEmail">
                                    <el-input v-model="csutForm.contactPersonEmail" placeholder="请输入联系人邮箱"
                                        maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="归属区域编码" class="is-required">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-input v-model="csutForm.bigAreaName" placeholder="归属大区编号"
                                                maxlength="128" readonly>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-select v-model="csutForm.provinceCode"
                                                @change="selectAddress(csutForm.provinceCode)" placeholder="请选择省市">
                                                <el-option v-for="item in regionList" :key="item.nodeCode"
                                                    :label="item.nodeName" :value="item.nodeCode">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-select v-model="csutForm.cityNodeCode" @change="selectCityNodeCode"
                                                placeholder="请选择地市">
                                                <el-option v-for="item in cityList" :key="item.nodeCode"
                                                    :label="item.nodeName" :value="item.nodeCode">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="行业类型编码" class="is-required">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-select v-model="csutForm.categoryType" placeholder="请选择实际类型"
                                                @change="selectCategory(csutForm.categoryType)">
                                                <el-option v-for="item in IndustryType" :key="item.nodeCode"
                                                    :label="item.nodeName" :value="item.nodeCode">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-select v-model="csutForm.categoryType2" placeholder="请选择实际行业"
                                                @change="selectCityNodeCode">
                                                <el-option v-for="item in categoryList" :key="item.nodeCode"
                                                    :label="item.nodeName" :value="item.nodeCode">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                    <!-- <el-input v-model="csutForm.industryTypeCode" placeholder="请输入行业类型编码" maxlength="128">
                                    </el-input> -->
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="备注" prop="remarkText">
                                    <el-input v-model="csutForm.remarkText" placeholder="请输入备注" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="审核意见" prop="auditOpinion">
                                    <el-input v-model="csutForm.auditOpinion" placeholder="请输入审核意见" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="版本号" prop="eTag">
                                    <el-input v-model="csutForm.eTag" placeholder="请输入版本号" maxlength="128"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="基本信息附件" prop="customerUrl" class="is-required">
                                    <upload-file-base v-if="editDialog" :limit="1" :fileSize="10" ref="customerUrl"
                                        accept="enclosure/pdf,enclosure/doc,enclosure/jpg,enclosure/jpeg,enclosure/gif,enclosure/rar,"
                                        folderType="file" :editFile="csutForm.contractUrl"
                                        tip="基本信息附件大小不超过10M，.pdf、.doc、.jpg、.gif、.rar格式"></upload-file-base>
                                    <!-- <el-input v-model="csutForm.customerUrl" placeholder="请输入附件实体附件" maxlength="128"></el-input> -->
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>合同信息</span>
                    </div>
                    <div class="">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="合同编号" prop="contractCode">
                                    <el-input v-model="csutForm.contractCode" placeholder="请输入合同编号" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="合同名称" prop="contractName">
                                    <el-input v-model="csutForm.contractName" placeholder="请输入合同名称" maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="合同生效日期" prop="contractValidDate">
                                    <el-date-picker v-model="csutForm.contractValidDate" type="date"
                                        placeholder="请选择合同生效日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="合同失效日期" prop="contractInvalidDate">
                                    <el-date-picker v-model="csutForm.contractInvalidDate" type="date"
                                        placeholder="请选择合同失效日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="合同是否自动续签" prop="isRenewed" class="is-required">
                                    <el-switch v-model="csutForm.isRenewed" active-color="#13ce66" inactive-color="#ccc"
                                        :active-value="1" :inactive-value="0">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="合同续签日期" :class="csutForm.isRenewed=='1'?'is-required':''">
                                    <el-date-picker v-model="csutForm.contractRenewDate" type="date"
                                        placeholder="请选择合同续签日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="合同电子扫描附件" prop="contractUrl" class="is-required">
                                    <upload-file-base v-if="editDialog" :limit="1" :fileSize="10" ref="contractUrl"
                                        accept="enclosure/pdf,enclosure/doc,enclosure/jpg,enclosure/jpeg,enclosure/gif,enclosure/rar,"
                                        folderType="file" :editFile="csutForm.contractUrl"
                                        tip="合同附件大小不超过10M，.pdf、.doc、.jpg、.gif、.rar格式"></upload-file-base>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="editDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="save()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情区 -->
        <el-dialog title="详情" class="detailsDialog" :visible.sync="detailsDialog" width="60%"
            :close-on-click-modal="false">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>客户信息</span>
                </div>
                <div class="detailsInfo">
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">客户编码</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.customerNum}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">状态</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent" v-if="detailsInfo.status==22">待管理平台新增审核</div>
                            <div class="detailsContent" v-if="detailsInfo.status==23">待管理平台变更审核</div>
                            <div class="detailsContent" v-if="detailsInfo.status==30">正常</div>
                            <div class="detailsContent" v-if="detailsInfo.status==40">暂停</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">客户名称</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.customerName}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">客户联系人</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.customerContactPerson}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">联系人手机</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contactPersonPhone}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">联系人邮箱</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contactPersonEmail}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">归属区域编码</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.belongRegionNodeCode}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">代理商名称</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.belongAgentName}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">代理商编码</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.belongAgentCode}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">行业类型编码</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.industryTypeCode}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">基本信息附件</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent"><a style="color: #1E9FFF;" :href="enclosureUrl"
                                    target="_blank">{{detailsInfo.custUrl}}</a></div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">备注</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.remarkText}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">版本号</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.auditOpinion}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">审核意见</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.eTag}}</div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>合同信息</span>
                </div>
                <div class="detailsInfo">
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">合同编号</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contractCode}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">合同名称</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contractName}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">合同生效日期</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contractValidDate}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">合同失效日期</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contractInvalidDate}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">合同是否自动续签</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent" v-if="detailsInfo.isRenewed == '1'">是</div>
                            <div class="detailsContent" v-if="detailsInfo.isRenewed == '0'">否</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="detailsTitle">合同续签日期</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detailsContent">{{detailsInfo.contractRenewDate}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="detailsTitle">合同电子扫描附件</div>
                        </el-col>
                        <el-col :span="20">
                            <div class="detailsContent"><a style="color: #1E9FFF;" :href="agreementUrl"
                                    target="_blank">{{detailsInfo.agreementUrl}}</a></div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <el-table :data="customerDetailsList" fit v-loading="customerDetailsLoading" size="small" border
                :header-cell-style="{'background-color': '#fafafa'}">
                <el-table-column prop="customerNum" label="被审核的非直签客户编码" align="center"></el-table-column>
                <el-table-column prop="authStatus" label="审核结果" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.authStatus == 1">通过</div>
                        <div v-if="scope.row.authStatus == 2">不通过</div>
                    </template>
                </el-table-column>
                <el-table-column prop="authType" label="操作类型" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.authType == 1">新增审核</div>
                        <div v-if="scope.row.authType == 2">变更审核</div>
                        <div v-if="scope.row.authType == 3">管理平台新增审核</div>
                        <div v-if="scope.row.authType == 4">管理平台变更审核</div>
                    </template>
                </el-table-column>
                <el-table-column prop="comment" label="审核原因" align="center"></el-table-column>
                <el-table-column prop="authPerson" label="审核人员" align="center"></el-table-column>
                <el-table-column prop="authTime" label="审核时间" align="center"></el-table-column>
            </el-table>
            <!-- 页码区 -->
            <div class="block">
                <el-pagination @size-change="customerDetailsPageSizeChange"
                    @current-change="customerDetailsPageCurrentChange" :current-page="customerDetailsPage.current"
                    :page-sizes="[10, 20, 50, 100]" :page-size="customerDetailsPage.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="customerDetailsPage.total">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="detailsDialog = false">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 分配服务代码区 -->
        <el-dialog title="分配服务代码" class="detailsDialog" :visible.sync="serviceDialog" width="60%" :close-on-click-modal="false">
            <el-form label-width="150px" size="small" :model="serviceForm" :rules="serviceRules" ref="serviceForm">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>基本填写信息</span>
                    </div>
                    <div class="">
                        <el-form-item label="非直签客户编码 " prop="customerNum">
                            <el-input v-model="serviceForm.customerNum" placeholder="请输入非直签客户编码 " maxlength="128" disabled>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="服务代码" prop="serviceCode">
                            <el-select v-model="serviceForm.serviceCode" placeholder="请选择服务代码">
                                <el-option v-for="item in orderList" :key="item.serviceCode" :label="item.serviceCode" :value="item.serviceCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="扩展码" prop="extCode">
                            <el-input v-model="serviceForm.extCode" placeholder="请输入扩展码" maxlength="20">
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label="操作类型" prop="type">
                            <el-radio-group v-model="serviceForm.type">
                                <el-radio :label="1">分配</el-radio>
                                <el-radio :label="2">收回</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <!-- <el-form-item label="操作流水号" prop="messageId">
                            <el-input v-model="serviceForm.messageId" placeholder="请输入操作流水号" maxlength="36">
                            </el-input>
                        </el-form-item> -->
                        <el-form-item label="操作">
                            <div><el-button size="small" type="primary" @click="serviceSave('serviceForm')">提 交</el-button></div>
                        </el-form-item>
                    </div>
                </el-card>
            </el-form>
            <el-table :data="serviceList" fit v-loading="serviceLoading" size="small" border
                :header-cell-style="{'background-color': '#fafafa'}">
                <el-table-column prop="customerNum" label="非直签客户编码" align="center"></el-table-column>
                <el-table-column prop="serviceCode" label="服务代码" align="center"></el-table-column>
                <el-table-column prop="extCode" label="扩展码" align="center"></el-table-column>
                <el-table-column prop="type" label="状态" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type==0">同步中</div>
                        <div v-if="scope.row.type==1">已分配</div>
                        <div v-if="scope.row.type==2">已回收</div>
                        <div v-if="scope.row.type==3">待删除</div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.type == 1" size="small" @click="recovery(scope.row)">回收</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 页码区 -->
            <div class="block">
                <el-pagination @size-change="servicePageSizeChange"
                    @current-change="servicePageCurrentChange" :current-page="servicePage.current"
                    :page-sizes="[10, 20, 50, 100]" :page-size="servicePage.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="servicePage.total">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="serviceDialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getNonSignCustList,
        addNonSignCust,
        addServiceCode,
        getCustCheckInfoList,
        getAreaCityList,
        getOrderList,
        getCustStatusList,
        getIndustryList,
        getServiceCodeList,
        cancelServiceCode
    } from '../../api/api.js'
    import UploadFileBase from '../../components/UploadFileBase'
    export default {
        components: {
            UploadFileBase,
        },
        data() {
            return {
                page: { //页码区
                    current: 1,
                    size: 10,
                    total: 0,
                },
                tableLoading: false,
                csutList: [],
                param: {},
                delListId: [],
                editTitle: '',
                editDialog: false,
                csutForm: {
                    cityNodeCode: ''
                },
                rules: {
                    customerName: [{
                        required: true,
                        message: '请输入客户名称',
                        trigger: 'blur'
                    }],
                    customerContactPerson: [{
                        required: true,
                        message: '请输入客户联系人',
                        trigger: 'blur'
                    }],
                    contactPersonPhone: [{
                            required: true,
                            message: '请输入联系人手机',
                            trigger: 'blur'
                        },
                        {
                            pattern: /^1[345789]\d{9}$/,
                            message: '请输入正确的手机号码'
                        }
                    ],
                    belongRegionCode: [{
                        required: true,
                        message: '请输入归属区域编码',
                        trigger: 'blur'
                    }],
                    belongAgentName: [{
                        required: true,
                        message: '请输入代理商名称',
                        trigger: 'blur'
                    }],
                    belongAgentCode: [{
                        required: true,
                        message: '请输入代理商编码',
                        trigger: 'blur'
                    }],
                    industryTypeCode: [{
                        required: true,
                        message: '请输入行业类型编码',
                        trigger: 'blur'
                    }],
                    contractCode: [{
                        required: true,
                        message: '请输入合同编号',
                        trigger: 'blur'
                    }],
                    contractName: [{
                        required: true,
                        message: '请输入合同名称',
                        trigger: 'blur'
                    }],
                    contractValidDate: [{
                        required: true,
                        message: '请选择合同生效日期',
                        trigger: 'change'
                    }],
                    contractInvalidDate: [{
                        required: true,
                        message: '请选择合同失效日期',
                        trigger: 'change'
                    }],
                    auditOpinion: [{
                        required: true,
                        message: '请输入审核意见',
                        trigger: 'blur'
                    }],
                    eTag: [{
                        required: true,
                        message: '请输入版本号',
                        trigger: 'blur'
                    }]
                },
                detailsDialog: false,
                detailsInfo: {},
                CustCheckId: 0,

                regionList: [], //省市
                cityList: [], //地市
                enclosureUrl: '', //附件
                agreementUrl: '', //合同地址
                IndustryType: [], //行业类型
                categoryList: [],
                orderList: [],
                custStatuList: [] ,//chatbot状态

                //详情表格数据
                customerDetailsList: [],
                customerDetailsLoading: false,
                customerDetailsPage: { //页码区
                    current: 1,
                    size: 10,
                    total: 0,
                },
                customerDetailsCustomerNum:'',

                //分配服务代码
                serviceDialog: false,
                serviceForm: {},
                serviceRules: {
                    customerNum: [{
                        required: true,
                        message: '请输入非直签客户编码',
                        trigger: 'blur'
                    }],
                    serviceCode: [{
                        required: true,
                        message: '请选择服务代码',
                        trigger: 'blur'
                    }],
                    extCode: [{
                        required: true,
                        message: '请输入扩展码',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请选择操作类型',
                        trigger: 'change'
                    }],
                    // messageId: [{
                    //     required: true,
                    //     message: '请输入操作流水号',
                    //     trigger: 'change'
                    // }],
                },
                serviceList:[],
                serviceLoading:false,
                servicePage:{ //页码区
                    current: 1,
                    size: 10,
                    total: 0,
                },
                serviceCustomerNum:''
            }
        },
        watch: {},
        methods: {

            //获取订购信息列表
            getOrderList(belongAgentCode) {
                getOrderList({customerNum:belongAgentCode}).then(res => {
                    this.orderList = res.data
                })
            },
            selectCategory(val) {
                this.csutForm.categoryType2 = ''
                this.getIndustryList(val)
            },
            selectAddress(val) {
                this.csutForm.cityNodeCode = ''
                this.selectOffice(val)
            },
            selectCityNodeCode() {
                this.$forceUpdate()
            },
            //分配服务代码
            service(row) {
                this.serviceDialog = true
                this.serviceForm.customerNum = row.customerNum
                this.getServiceCodeList(row.customerNum)
                this.getOrderList(row.belongAgentCode)
            },
            //保存分配服务代码
            serviceSave(serviceFormName) {
                this.$refs[serviceFormName].validate((valid) => {
                    if(valid){
                        addServiceCode(this.serviceForm).then(res => {
                            if (res.success) {
                                this.$message({
                                    message: '服务代码添加成功',
                                    type: 'success'
                                })
                                this.serviceForm = {
                                    customerNum:this.serviceCustomerNum
                                }
                                this.getServiceCodeList(this.serviceCustomerNum)
                            }
                        })
                    }
                })

            },
            //回收分配服务代码
            recovery(row){
                let tips = "是否回收？";
                this.$confirm(tips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    cancelServiceCode({id:row.id}).then(res=>{
                        if(res.success){
                            this.$message({
                                message: '回收成功',
                                type: 'success'
                            })
                            this.getServiceCodeList(this.serviceCustomerNum)
                        }
                    })
                })
            },
            //详情
            details(row) {
                this.detailsDialog = true
                this.detailsInfo = row
                let addressList = row.belongRegionCode.split(','),
                    bigAreaName,
                    provinceName,
                    cityName

                this.regionList.map(item => {
                    if (item.nodeCode == addressList[1]) {
                        bigAreaName = item.bigAreaName
                        provinceName = item.nodeName
                    }
                })
                getIndustryList({
                    level:2
                }).then(res => {
                    res.data.map(item=>{
                        if(item.nodeCode == this.detailsInfo.industryTypeCode){
                            this.detailsInfo.industryTypeCode = item.nodeName
                        }
                    })
                })

                getAreaCityList({
                    parentCode: addressList[1]
                }).then(res => {
                    res.data.map(item => {
                        if (item.nodeCode == addressList[2]) {
                            cityName = item.nodeName
                            this.detailsInfo.belongRegionNodeCode = bigAreaName + '-' + provinceName +
                                '-' + cityName
                        }
                    })
                })
                var customerUrl = JSON.parse(this.detailsInfo.customerUrl),
                    contractUrl = JSON.parse(this.detailsInfo.contractUrl)

                this.detailsInfo.custUrl = customerUrl[0].name
                this.detailsInfo.agreementUrl = contractUrl[0].name

                this.enclosureUrl = customerUrl[0].url
                this.agreementUrl = contractUrl[0].url
                this.CustCheckId = row.id
                this.getCustCheckInfoList(row.customerNum)

            },
            getServiceCodeList(customerNum){
                this.serviceCustomerNum = customerNum
                this.serviceLoading = true
                let param ={
                    customerNum: customerNum
                }
                Object.assign(param,this.servicePage)
                getServiceCodeList(param).then(res => {
                    if (res.success) {
                        this.serviceLoading = false
                        this.serviceList = res.data.records;
                        this.servicePage.total = res.data.total
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },

            getCustCheckInfoList(customerNum) {
                this.customerDetailsCustomerNum = customerNum
                this.customerDetailsLoading = true
                let param ={
                    customerNum: customerNum
                }
                Object.assign(param,this.customerDetailsPage)
                getCustCheckInfoList(param).then(res => {
                    if (res.success) {
                        this.customerDetailsLoading = false
                        this.customerDetailsList = res.data.records;
                        this.customerDetailsPage.total = res.data.total
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            //选择省市
            selectOffice(val) {
                this.regionList.map(item => {
                    if (item.nodeCode == val) {
                        this.csutForm.bigAreaName = item.bigAreaName
                        this.csutForm.bigAreaCode = item.bigAreaCode
                        this.getAreaCityList(item.nodeCode)
                    }
                })
            },
            //获取地区
            getAreaCityList(node) {
                getAreaCityList({
                    parentCode: node == undefined ? '-1' : node
                }).then(res => {
                    if (node == undefined) {
                        this.regionList = res.data
                    } else {
                        this.cityList = res.data
                    }
                })
            },
            //行业类型
            getIndustryList(node) {
                getIndustryList({
                    parentCode: node == undefined ? '-1' : node
                }).then(res => {
                    if (node == undefined) {
                        this.IndustryType = res.data
                    } else {
                        this.categoryList = res.data
                    }
                })
            },
            //获取chatbot状态
            getCustStatusList() {
                getCustStatusList().then(res => {
                    this.custStatuList = res.data
                })
            },
            addCsut() {
                this.editTitle = '新增'
                this.editDialog = true
                this.csutForm = {}
            },
            editCsut(row) {
                this.editTitle = '编辑'
                this.editDialog = true
                this.csutForm = row
                let addressList = row.belongRegionCode.split(',')
                this.csutForm.provinceCode = addressList[1]
                this.csutForm.cityNodeCode = addressList[2]
                this.selectOffice(this.csutForm.provinceCode)

                // let industryList = row.industryTypeCode.split(',')
                // this.csutForm.categoryType = industryList[0]
                this.csutForm.categoryType2 = row.industryTypeCode


                getIndustryList({
                    level:2
                }).then(res => {
                    res.data.map(item=>{
                        if(row.industryTypeCode == item.nodeCode){
                            this.csutForm.categoryType = item.parentCode
                            this.getIndustryList(this.csutForm.categoryType)
                        }
                    })
                })
            },
            save() {
                let t_this = this
                this.$refs.csutForm.validate((valid) => {
                    if (valid) {
                        if (!this.csutForm.bigAreaCode && !this.csutForm.provinceCode && !this.csutForm
                            .cityNodeCode) {
                            this.$message({
                                message: '请选择归属区域',
                                type: 'warning'
                            })
                            return
                        }
                        if (!this.csutForm.categoryType && !this.csutForm.categoryType2) {
                            this.$message({
                                message: '请选择行业类型编码',
                                type: 'warning'
                            })
                            return
                        }
                        if (this.csutForm.isRenewed == '1') {
                            if (!this.csutForm.contractRenewDate) {
                                this.$message({
                                    message: '请选择合同续约日期',
                                    type: 'warning'
                                })
                                return
                            }
                        }
                        if (t_this.$refs.customerUrl.fileList.length <= 0) {
                            this.$message({
                                message: '请上传基本信息附件',
                                type: 'warning'
                            })
                            return
                        }
                        if (t_this.$refs.contractUrl.fileList.length <= 0) {
                            this.$message({
                                message: '请上传合同附件',
                                type: 'warning'
                            })
                            return
                        }
                        let param = {
                            customerUrl: JSON.stringify(t_this.$refs.customerUrl.fileList),
                            contractUrl: JSON.stringify(t_this.$refs.contractUrl.fileList),
                            belongRegionCode: this.csutForm.bigAreaCode + ',' + this.csutForm.provinceCode +
                                ',' + this.csutForm.cityNodeCode,
                            industryTypeCode: this.csutForm.categoryType2
                        }
                        Object.assign(this.csutForm, param)
                        addNonSignCust(this.csutForm).then(res => {
                            if (res.success) {
                                if (this.csutForm.id != undefined) {
                                    this.$message({
                                        message: ' 编辑成功',
                                        type: 'success'
                                    })
                                } else {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    })
                                }
                                this.load()
                                this.$refs.customerUrl.fileList = ''
                                this.$refs.contractUrl.fileList = ''
                                this.csutForm = {}
                                this.editDialog = false
                            }
                        })
                    }
                });
            },
            //选择列表数据
            handleSelectionChange(val) {
                this.delListId = val;
            },
            //删除
            deleteTemp() {
                if (this.delListId.length > 0) {
                    let tips = "是否确认删除？";
                    this.$confirm(tips, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let delIds = this.delListId.map(val => val.id)
                        delPageLogs({
                            ids: delIds.join()
                        }).then(function(res) {
                            if (res.success) {
                                this.$message.success("删除成功");
                                this.load();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    })
                } else {
                    this.$message.warning('没有选择数据')
                }
            },
            handleCurrentChange(currentPage) { //改变当前页
                this.page.current = currentPage
                this.load()
            },
            handleSizeChange(size) { //改变页面size
                this.page.size = size;
                this.load()
            },
            customerDetailsPageCurrentChange(currentPage) {
                this.customerDetailsPage.current = currentPage
                this.getCustCheckInfoList(this.customerDetailsCustomerNum)
            },
            customerDetailsPageSizeChange(size) {
                this.customerDetailsPage.size = size
                this.getCustCheckInfoList(this.customerDetailsCustomerNum)
            },

            servicePageCurrentChange(currentPage) {
                this.servicePage.current = currentPage
                this.getServiceCodeList(this.serviceCustomerNum)
            },
            servicePageSizeChange(size) {
                this.servicePage.size = size
                this.getServiceCodeList(this.serviceCustomerNum)
            },

            load() { //加载列表
                this.tableLoading = true
                Object.assign(this.param, this.page)
                getNonSignCustList(this.param).then(res => {
                    // console.log(res)
                    this.tableLoading = false
                    if (res.success) {
                        this.csutList = res.data.records;
                        this.page.total = res.data.total
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
        },
        mounted() {
            // this.load();

        },
        activated() {
			document.getElementsByClassName('el-table__body-wrapper')[0].style.height = document.documentElement
			    .clientHeight -
			    50 - 50 - 41 - 51 - 60 - 47 + 'px'
            this.load();
            this.getAreaCityList()
            this.getIndustryList()
            this.getCustStatusList()

        }
    }
</script>
<style lang="less">
    .non-signature {
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

        .edit {
            .el-input {
                width: 100% !important;
            }
        }

        .detailsInfo {
            border: 1px solid #DFE5F2;

            .el-row {
                border-bottom: 1px solid #DFE5F2;

                .el-col:first-child {
                    .detailsTitle {
                        border-left: 0;
                    }
                }
            }

            .el-row:last-child {
                border-bottom: 0;
            }

            .detailsTitle {
                background-color: #F9FBFF;
                padding: 15px;
                font-weight: bold;
                border-right: 1px solid #DFE5F2;
                border-left: 1px solid #DFE5F2;
            }

            .detailsContent {
                padding: 15px;
            }
        }

        .detailsDialog {
            .el-dialog {
                margin-top: 13vh !important;
            }

            .el-dialog__footer {
                text-align: center;
            }

            .el-dialog__body {
                height: 610px;
                overflow: auto;

                &::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
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

        .el-pagination {
            margin-top: 15px;
            text-align: center;
        }

        .el-date-editor .el-range-separator {
            width: 10%;
        }


        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }

        .box-card {
            width: 100%;
            margin-bottom: 20px;

            .el-card__header {
                font-weight: bold;
                background-color: #F9FBFF;
            }
        }

    }
</style>
