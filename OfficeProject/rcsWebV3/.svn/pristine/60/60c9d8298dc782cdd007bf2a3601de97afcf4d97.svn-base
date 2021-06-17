<template>
    <section class="dashboard wrap-container">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="管理桌面" name="first">
                <ul class="menu-item">
                    <li v-if="logoUrl">
                        <div  @click="toModifyInfo">
                            <img class="logo" :src="logoUrl | imgPath('customer')" alt="">
                        </div>
                    </li>
                    <li v-for="management in managementList">
                        <div @click="toUrl(management.path)">
                            {{management.name}}
                            <!--<i class="del theme-color-danger el-icon-error"></i>-->
                        </div>

                    </li>
                    <li class="theme-color" @click="showMenu">
                        <div>
                            <i style="font-size: 30px;" class="el-icon-plus"></i>
                        </div>

                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>

        <el-tabs value="second" type="card" style="margin-top: 20px">
            <el-tab-pane label="应用桌面" name="second">
                <ul class="menu-item">
                    <li @click="toUrl('/pushList')" v-if="userType!=1&&userType!=3">
                        <div>
                            消息推送
                        </div>
                    </li>
                    <li v-for="app in applicationList">
                        <div @click="toApp(app)">
                            {{app.name}}
                        </div>
                    </li>
                    <li class="theme-color" @click="showAppMenu">
                        <div>
                            <i style="font-size: 30px;" class="el-icon-plus"></i>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>


        <el-tabs value="third" type="card" style="margin-top: 20px">
            <el-tab-pane label="最近应用" name="third">
                <ul class="menu-item">
                    <li v-for="(recent,index) in recentList">
                        <div>
                            {{recent.name}}
                            <i class="del theme-color-danger el-icon-error" @click="delRecent(index)"></i>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>




        <!-- dialog start -->
        <el-dialog title="新增管理桌面" :visible.sync="menuDialog" width="600px" center>

            <el-tree :data="menuTree" :props="selfProps" :default-checked-keys="ownMenu" show-checkbox node-key="mId" ref="menuTree"
                     ></el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="menuDialog = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addMenu" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <!-- dialog end -->

        <!-- dialog app start -->
        <el-dialog title="新增应用桌面" :visible.sync="appDialog" width="600px" center>
            <el-table
                fit v-loading="tableLoading" size="small"
                ref="multiTable"
                :data="appDialogData"
                @selection-change="handleSelectionChange">
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column prop="name" label="chartbot名称" align="center"></el-table-column>
                <!--<el-table-column prop="name" label="状态" align="center"></el-table-column>-->
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>


            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="appDialog = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="addAppMenu">确 定</el-button>
            </span>
        </el-dialog>

        <!-- dialog app end -->

    </section>
</template>

<script>
    import {getDesktop,modDesktop,getCustomer,getChatbotList} from '../../api/api.js'
    import {mapGetters} from 'vuex'
    import ChatbotList from '../api/ChatbotManage'


    export default {
        name: 'dashboard',
        components: {
            ChatbotList
        },
        data() {
            return{
                activeName:'first',
                menuTree: [{"icon":"infoManage","name":"信息推送","mId":1000,"pId":0,"url":"infoPush","submenuList":[]},{"icon":"home","name":"推送记录","mId":1100,"pId":0,"url":"pushList","submenuList":[]},{"icon":"home","name":"模板管理","mId":1200,"pId":0,"url":"templateManage","submenuList":[]},{"icon":"home","name":"资源管理","mId":1300,"pId":0,"url":"resourceManage","submenuList":[]},{"icon":"home","name":"会员管理","mId":1400,"pId":0,"url":"customerManage","submenuList":[]},{"icon":"home","name":"群组管理","mId":1700,"pId":0,"url":"groupManage","submenuList":[]},{"icon":"home","name":"信息上行","mId":1500,"pId":0,"url":"infoUp","submenuList":[]},{"icon":"home","name":"系统管理","mId":1600,"pId":0,"url":"","submenuList":[{"submenuList":[],"icon":"","name":"角色管理","mId":1601,"pId":1600,"url":"roleManage"},{"submenuList":[],"icon":"","name":"用户管理","mId":1602,"pId":1600,"url":"userManage"},{"submenuList":[],"icon":"","name":"日志管理","mId":1603,"pId":1600,"url":"logManage"}]}],
                ownMenu:[],//角色拥有的菜单树
                selfProps: {//自定义标签
                    label: 'name',
                    children:'submenuList'
                },
                menuDialog:false,
                appDialog:false,
                tableLoading:false,
                appDialogData:[{id:1,name:'chatbot '},{id:2,name:'chatbot1'},{id:3,name:'chatbot2'},{id:4,name:'chatbot3'}],
                deskObj:{},
                managementList: [],
                applicationList:[],
                recentList:[],
                logoUrl:'',
            }
        },
        computed: {
            ...mapGetters([
                'menuList',
                'userInfo',
                'userType'
            ]),
        },
        methods: {
            handleSelectionChange(val){
                this.applicationListTemp = val
            },
            showAppMenu(){
                this.appDialog = true
                for (let i=0;i<this.applicationList.length;i++){
                    for (let j=0;j<this.appDialogData.length;j++){
                        if (this.applicationList[i].id==this.appDialogData[j].id) {
                            this.applicationList[i] = this.appDialogData[j]
                            break
                        }
                    }

                }
                this.$nextTick(_=>{
                    this.applicationList.forEach(val=>{
                        this.$refs.multiTable.toggleRowSelection(val,true)
                    })
                })

            },
            addAppMenu(){
                this.deskObj.applicationList = this.applicationList = this.applicationListTemp
                this.modifyDesk()
            },
            showMenu(){
                this.menuDialog = true
                this.ownMenu = this.$getLeafMenuIdsByMenuJson(this.deskObj.management)
            },
            addMenu(){
                let checkedLeafNodes = this.$refs.menuTree.getCheckedNodes(true)
                // 更新权限
                let menuList = this.$getMenuListByCheckedNodes(checkedLeafNodes,this.menuTree);
                this.deskObj.managementList = menuList

                this.modifyDesk()
            },
            modifyDesk(destroyed){
                this.deskObj.management = JSON.stringify(this.deskObj.managementList)
                this.deskObj.application = JSON.stringify(this.deskObj.applicationList)
                this.deskObj.recent = JSON.stringify(this.deskObj.recentList)
                this.deskObj.desktopId = this.deskObj.id
                modDesktop(this.deskObj).then(rsp=>{
                    if (rsp.success) {
                        if (!destroyed) {
                            this.$message.success('修改成功')
                        }

                        this.initData()
                        this.appDialog = this.menuDialog=false
                    }
                })
            },
            initData(){
                getDesktop({}).then(rsp=>{
                    // console.log('desk rsp:',rsp)
                    this.deskObj = rsp.data
                    if(this.deskObj != null){
                        this.deskObj.managementList = this.deskObj.management?JSON.parse(this.deskObj.management):[]
                        this.applicationList = this.deskObj.applicationList = this.deskObj.application?JSON.parse(this.deskObj.application):[]
                        this.recentList = this.deskObj.recentList = this.deskObj.recent?JSON.parse(this.deskObj.recent):[]

                        this.setManagementList(this.deskObj.managementList)
                    }
                })

                if (this.userType==1||this.userType==3){
                    // 由于平台不是企业，所以平台管理员和账号登录进去后不需要5G消息业务相关的信息：包括：“消息推送、媒体管理、资源管理、通讯录群组、上行消息、消息管理”这几个功能点；
                    let mIDs = [1100,1200,1300,1400,1500,1600]
                    let menus = JSON.parse(JSON.stringify(this.menuList))

                    this.menuTree = menus.filter(val=>{
                        return !mIDs.includes(val.mId)
                    })
                } else{
                    this.menuTree = this.menuList
                }


                // this.menuTree = this.menuList

                getCustomer({userId:this.userInfo.userId}).then(rsp=>{
                    if (rsp.success){
                        this.logoUrl = rsp.data.customerInfo.logoImg
                    }
                })

                getChatbotList({curPage:1,size:100,regStatus:'1'}).then(rsp=>{
                    if (rsp.success){
                        this.appDialogData = rsp.data.records
                    }
                })


            },
            setManagementList(mList){
                let list = []

                for (let i=0;i<mList.length;i++){
                    f1(mList[i])
                }

                this.managementList = list

                function f1(menu) {
                    let submenuList = menu.submenuList
                    if (submenuList&&submenuList.length>0){
                        submenuList.forEach(val=>{
                            f1(val)
                        })
                    } else{
                        list.push(menu)
                    }
                }

            },
            toUrl(path){
                this.$router.push(path)
            },
            toApp(obj){
                if (!this.recentListTemp) this.recentListTemp = []
                this.recentListTemp.unshift(obj)
            },
            delRecent(index){
                this.deskObj.recentList.splice(index,1)
                this.modifyDesk(true)
            },
            toModifyInfo(){
                this.$router.push('/accountSetting/editInfo?userId='+this.userInfo.userId)
            }

        },
        destroyed(){
            let list = []
            let recentList = [...new Set(this.recentListTemp)];
            for (let i=0;i<this.recentList.length;i++) {
               let flag = 0
               for (let j=0;j<recentList.length;j++){
                   if (recentList[j].id==this.recentList[i].id){
                       flag++
                       break
                   }
               }
               if (flag==0){
                   list.push(this.recentList[i])
               }
            }
            recentList.push(...list)
            this.deskObj.recentList = recentList
            this.modifyDesk(true)
        },
        activated(){
            getCustomer({userId:this.userInfo.userId}).then(rsp=>{
                if (rsp.success){
                    this.logoUrl = rsp.data.customerInfo.logoImg
                }
            })
        },
        mounted() {
            this.initData()
        }
    }

</script>

<style lang="less">
    .dashboard{
        .menu-item{
            display: flex;
            flex-wrap: wrap;
            li{
                padding: 10px;
                div{
                    position: relative;
                    display: flex;
                    width: 90px;
                    height: 90px;
                    padding: 10px;

                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    border-radius: 8px;
                    border: 1px solid #e1e1e1;
                    background-color: #f1f1f1;
                    cursor: pointer;
                    &.theme-color{
                        font-size: 36px;
                    }
                }
                .del{
                    position: absolute;
                    opacity: 0;
                    right: -8px;
                    top: -8px;
                    font-size: 18px;
                    transition: all .3s ease;
                }
                &:hover{
                    .del{
                        opacity: 1;
                    }
                }

            }
            .logo{
                width: 100%;
            }
        }
    }

</style>
