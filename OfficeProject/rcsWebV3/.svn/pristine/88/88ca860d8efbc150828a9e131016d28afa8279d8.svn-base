<template>
    <section class="add-member" :style="!classBool ? 'margin-top: 20px;':''">
        <el-form ref="form" :model="addMemberForm" :rules="rules" label-width="110px" size="small">
            <div class="customerScroll">
                <!-- <div class="title">登录基本信息</div> -->
                 <el-form-item label="客户名称" prop="custName">
                     <el-input v-model="addMemberForm.custName"  :disabled="!classBool" placeholder="请输入客户名称" maxlength="128"></el-input>
                 </el-form-item>
                 <el-form-item label="客户编码" prop="custCode">
                     <el-input v-model="addMemberForm.custCode" :disabled="userId!=0" placeholder="请输入客户编码" maxlength="128"></el-input>
                 </el-form-item>
                 <el-form-item label="登录账号" prop="userName">
                     <el-input v-model="addMemberForm.userName" placeholder="请输入登录账号" :disabled="userId!=0" maxlength="128"></el-input>
                 </el-form-item>
                 <el-form-item label="登录密码" prop="password" v-if="userId==0">
                     <el-input v-model="addMemberForm.password" type="password"  placeholder="请输入登录密码" maxlength="128" show-password></el-input>
                     <!-- <el-select></el-select> -->
                 </el-form-item>
                 <!-- <div class="title">基本信息</div> -->

                 <!--logoImg-->
                 <el-form-item label="客户logo">
                     <upload-file-base ref="memberLogoUpload" accept="image/jpeg,image/png" :limit="1" folderType="customer" :fileSize="2"
                                       tip="图片大小不超过2M，支持jpg/jepg、png格式"></upload-file-base>
                 </el-form-item>

                 <!--<el-form-item label="营业执照编号">-->
                     <!--<el-input v-model="addMemberForm.name" placeholder="请输入负责人"  show-word-limit></el-input>-->
                 <!--</el-form-item>-->
                 <!--<el-form-item label="营业执照">-->
                     <!--<upload-file-base ref="imageResourceUpload" accept="image/jpeg,image/png" :limit="1" folderType="image" :fileSize="2"-->
                                       <!--tip="图片大小不超过2M，支持jpg/jepg、png格式"></upload-file-base>-->
                 <!--</el-form-item>-->

                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="addMemberForm.phone" placeholder="请输入手机号码" maxlength="12"></el-input>
                </el-form-item>
                <el-form-item label="客户分组" prop="groupId">
                    <el-select v-model="addMemberForm.groupId" placeholder="请选择用户分组" size="medium">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="addMemberForm.linkMan" placeholder="请输入联系人" maxlength="12"></el-input>
                </el-form-item>
                <el-form-item label="客户地址">
                    <el-input v-model="addMemberForm.addr" placeholder="请输入客户地址" maxlength="12"></el-input>
                </el-form-item>
                <el-form-item label="客户备注">
                    <el-input v-model="addMemberForm.description" placeholder="请输入客户备注" type="textarea"></el-input>
                </el-form-item>
            </div>
            <!--<el-form-item label="IP地址">-->
                <!--<el-input v-model="addMemberForm.ipAddr" placeholder="请输入IP地址"  show-word-limit></el-input>-->
            <!--</el-form-item>-->
            <!-- <el-form-item  label="所属组">
                <el-select v-model="addMemberForm.supplierId" placeholder="请选择组">
                    <el-option label="未分组" value=""></el-option>
                    <el-option :label="supplier.name" :value="supplier.supplierId" v-for="supplier in supplierList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="角色">
                <el-select v-model="addMemberForm.roleId" placeholder="请选择角色">
                    <el-option :label="role.name" :value="role.id" v-for="role in roleList"></el-option>
                </el-select>
            </el-form-item> -->


            <!--<el-form-item label="服务器URL">-->
                <!--<el-input v-model="addMemberForm.ipAddr" placeholder="请输入服务器URL"  show-word-limit></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="API版本号">-->
                <!--<el-input v-model="addMemberForm.edition" placeholder="请输入API版本号"  show-word-limit></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="接入号">-->
                <!--<el-input v-model="addMemberForm.accessNo" placeholder="请输入接入号"  show-word-limit></el-input>-->
            <!--</el-form-item>-->


            <!--<el-form-item label="网关">-->
                <!--<el-select v-model="addMemberForm.gatewayIds" multiple placeholder="请选择网关">-->
                    <!--<el-option :label="gateway.name" :value="gateway.id" v-for="gateway in gatewayList"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->


            <!--<el-form-item label="应用ID">-->
                <!--<el-input v-model="addMemberForm.maapAccount" placeholder="请输入应用ID"  show-word-limit></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="应用密码">-->
                <!--<el-input v-model="addMemberForm.maapPassword" placeholder="请输入应用密码"  show-word-limit></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="文件服务器域名">-->
                <!--<el-input v-model="addMemberForm.maapContentServerUri" placeholder="请输入文件服务器域名"  show-word-limit></el-input>-->
            <!--</el-form-item>-->



            <!-- <el-form-item label="发送速率">

            <el-form-item label="发送速率">

            <!--<el-form-item label="发送速率">

                <el-input v-model="addMemberForm.sendRate" placeholder="请输入发送速率 xx条/秒" type="number" show-word-limit :disabled="userType!=1"></el-input>

            </el-form-item> -->

            <!-- </el-form-item> -->

            <!-- </el-form-item>-->



            <!--<div class="title">chatbot配置</div>-->
            <!--<el-form-item label="Appid">-->
                <!--<el-input v-model="addMemberForm.appid" placeholder="请输入app id"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="Appsecret">-->
                <!--<el-input v-model="addMemberForm.secret" placeholder="请输入app secret"></el-input>-->
            <!--</el-form-item>-->

        </el-form>
        <div style="padding: 10px 0;text-align: center;">
            <el-button @click="onCancel" v-if="userType==1">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </section>
</template>

<script>
    import UploadFileBase from '../../components/UploadFileBase'
    import {addCustomer,getRoleList,getGatewayList,getCustomer,modCustomer,getGroupListAdditionCount} from '../../api/api'
    import {mapGetters} from 'vuex'
    export default {
        name: "AddMember",
        components: {
            UploadFileBase
        },
        computed: {
        ...mapGetters([
                'userType',
            ])
        },
        props:['userId','classBool','selectGroupId'],
        data() {
            return {
                addMemberForm:{roleId:'2',logoImg:'',groupId:0},
                roleList:[],
                gatewayList:[],
                beMod:false,//是否修改
                rules: {
                    userName: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    custName: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' }
                    ],
                    custCode: [
                        { required: true, message: '请输入客户编码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                },
                queryUserId:0,
                groupList:[]
            }
        },
        methods: {
            getGroupListAdditionCount() {
                getGroupListAdditionCount({groupType:'CUSTOMER'}).then(res => {
                    // console.log('groupList:', res)
                    this.groupList = res.data

                })
            },
            onSubmit(){
                this.$refs.form.validate(valid => {
                    if (valid) {

                        let logoImg = this.$refs.memberLogoUpload.getFileString()
                        console.log(logoImg)
                        if (logoImg){
                            this.addMemberForm.logoImg = logoImg
                        }
                        // this.addMemberForm.gatewayId = this.addMemberForm.gatewayIds.join()

                        if (this.addMemberForm.sendRate) {
                            this.addMemberForm.sendRate = Number(this.addMemberForm.sendRate)
                        }

                        if (this.beMod) {
                            modCustomer(this.addMemberForm).then(resp=>{
                                if (resp.success){
                                    this.$message.success('修改成功')
                                    this.getGroupListAdditionCount()
                                    // if (this.userType==1){
                                    //     this.$store.dispatch('tagsView/delView', this.$route).then(()=>{
                                    //         this.$router.push('/customerManage')
                                    //     })
                                    // }
                                    this.$emit('hideDialog')
                                }else {
                                    this.$message.error(resp.message)
                                }
                            })
                        }else {
                            addCustomer(this.addMemberForm).then(resp=>{
                                if (resp.success) {
                                    this.$message.success('新增成功')
                                    this.getGroupListAdditionCount()
                                    // this.$store.dispatch('tagsView/delView', this.$route).then(()=>{
                                    //     this.$router.push('/customerManage')
                                    // })
                                    this.$emit('hideDialog')
                                }else{
                                    this.$message.error(resp.message)
                                }
                            })
                        }
                    }
                })
            },
            onCancel(){
                this.$emit('hideDialog')
            },
            init(){
                getRoleList({}).then(resp=>{
                    if (resp.success) {
                       let roleList = resp.data;
                       this.roleList = roleList.filter(role=>role.id!=1);
                    } else {
                        this.$message.error(resp.message);
                    }
                })
                this.getGroupListAdditionCount();
                // getGatewayList({curPage: 1, size: 1000}).then(resp=>{
                //     if (resp.success){
                //         this.gatewayList = resp.data.records
                //     } else {
                //         this.$message.error(resp.message)
                //     }
                // })
                this.addMemberForm.groupId = this.selectGroupId
                let userId = this.userId
                this.queryUserId = this.$route.query.userId
                if(typeof(this.queryUserId) != 'undefined'){
                    userId = this.queryUserId
                }
                if (userId){
                    this.beMod = true
                    this.rules.password[0].required = false
                    getCustomer({id:Number(userId)}).then(resp=>{
                        if (resp.success){
                            console.log('resp ----- 客户info---------',resp)
                            this.addMemberForm = resp.data
                            let roleId = resp.data.roleId
                            this.$set(this.addMemberForm,'roleId',roleId)
                            let userName = resp.data.userName
                            this.$set(this.addMemberForm,'userName',userName)
                            // let gatewayIds = this.addMemberForm.gatewayId.split(',')
                            // gatewayIds = gatewayIds.map(val=>Number(val))
                            // this.$set(this.addMemberForm,'gatewayIds',gatewayIds)
                            this.$refs.memberLogoUpload.setFileString(this.addMemberForm.logoImg,'customer')

                            this.addMemberForm.userId = Number(userId)
                            this.addMemberForm.customerId = Number(resp.data.id)
                            // this.addMemberForm.maapPassword = null
                        }
                    })
                }
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped lang="less">
    .add-member{
        .customerScroll {
            // height: 550px;
            overflow-y: auto;
            padding-right: 15px;
        }
        .customerScroll::-webkit-scrollbar {
            width: 4px;
            height: 0px;
        }

        .customerScroll::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: rgba(0, 0, 0, 0.2);
        }

        .customerScroll::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);
        }


    }
</style>
