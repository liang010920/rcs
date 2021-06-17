<template>
    <div class="customer-login">
        <div class="header">
        <!--<img src="../../assets/image/logo.jpg">-->
        <!-- <span style="padding-left: 38px;color:#fff;font-size: 22px">5G消息系统</span> -->
        <!--<span style="float: right;line-height: 80px;padding-right: 200px;font-size: 16px;color: #f1f1f1"><a class="help" href="" target="_blank"><i class="el-icon-question"></i> 帮助手册</a></span>-->
        </div>
        <div class="login-body">
            <div class="describe">
                <div class="describeTitle">
                    5G消息平台
                </div>
                <div class="describeContent">
                    助力行业客户安全、快速接入5G消息，打造属于自有的5G消息独立入口
                </div>
            </div>
            <div class="login-div">
                <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                    label-position="left" size="small">
                    <div class="title-container">
                        <h3 class="title">系统登录</h3>
                    </div>
                    <p style="padding: 0 30px">
                        <el-divider></el-divider>
                    </p>

                    <el-form-item prop="custCode" v-if="beCustomer">
                        <el-input name="username" type="text" v-model="loginForm.custCode" autoComplete="on"
                            placeholder="请输入企业代码" prefix-icon="el-icon-office-building">
                            <!--<el-button slot="prepend" icon="el-icon-s-custom"></el-button>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="account">
                        <el-input name="username" type="text" v-model="loginForm.account" autoComplete="on"
                            placeholder="请输入用户名称" prefix-icon="el-icon-s-custom">
                            <!--<el-button slot="prepend" icon="el-icon-s-custom"></el-button>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin"
                            v-model="loginForm.password" autoComplete="on" placeholder="请输入登录密码"
                            prefix-icon="el-icon-lock">
                            <!--<el-button slot="prepend" icon="el-icon-lock"></el-button>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input @keyup.enter.native="handleLogin" v-model="loginForm.captchaCode" autoComplete="on"
                            placeholder="请输入验证码">
                            <img @click="refreshVerification" class="verification" slot="append" :src="verifyCodeUrl">
                        </el-input>
                    </el-form-item>

                    <el-button type="primary" style="width:80%;font-size: 20px;margin-left:40px;margin-top: 10px"
                        :loading="loading" @click.native.prevent="handleLogin">
                        登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
                    </el-button>
                    <!--<svg aria-hidden="true">-->
                    <!--<use href="../../icons/svg/user.svg"></use>-->
                    <!--</svg>-->
                </el-form>
            </div>
        </div>
        <div class="footer" id="app-footer">
            <p style="line-height: 50px;font-size: 12px;transform: scale(0.8);">版权所有&copy; 深圳市嘉讯软件有限公司Jassonsoft Co.,
                Ltd. All right reserved</p>
        </div>


        <!-- dialog start -->
        <el-dialog class="passwd-dialog" title="修改密码" :visible.sync="dialogVisible" width="600px" center
            :close-on-click-modal="false">

            <el-form ref="passwdForm" :model="passwdForm" label-width="70px" :rules="passwdRules" size="medium">

                <el-form-item label="新密码" prop="newPasswd1">
                    <el-input v-model="passwdForm.newPassword" type="password" placeholder="请输人新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="newPasswd2">
                    <el-input v-model="passwdForm.newPassword1" type="password" placeholder="请再次输人新密码" show-word-limit>
                    </el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @keyup.enter="modifyPasswd('passwdForm')" @click="modifyPasswd('passwdForm')">
                    提交
                </el-button>
            </span>
        </el-dialog>
        <!-- dialog end -->
    </div>
</template>

<script>
    import {canvans1} from '@/assets/js/canvas-nest.js'
    import {canvans2} from '@/assets/js/canvas-nest.umd.js'
    import {
        getAuthCodeImg,
        loginByUserName,
        modPasswordSecurity,
        getOnlyOne,
        adminLoginByUserName,
        customerLoginByUserName
    } from '../../api/api'
    import {
        Utils
    } from '../../plugins/utils'
    export default {
        name: 'login',
        components: {},
        computed: {},
        data() {
            let ut = new Utils();
            const validateUsername = (rule, value, callback) => {
                if (!ut.isvalidUsername(value)) {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码长度不能小于6'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    account: '',
                    password: ''
                },
                loginRules: {
                    account: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }]
                },
                passwdRules: {
                    account: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }]
                },
                passwdForm: {},
                passwordType: 'password',
                loading: false,
                showDialog: false,
                verifyCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==',
                verifyCode: '',
                dialogVisible: false,
                beCustomer: false,
            }
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            modifyPasswd() {
                if (this.passwdForm.newPassword) {
                    if (this.passwdForm.newPassword != this.passwdForm.newPassword1) {
                        this.$message.error("新密码与确认密码不一致！")
                        return
                    }
                } else {
                    this.$message.error("请输入密码！")
                    return
                }

                this.passwdForm.oldPassword = this.loginForm.password

                modPasswordSecurity(this.passwdForm).then(response => {
                    if (response.success) {
                        this.$message.success("操作成功,请使用新密码登录")
                        this.dialogVisible = false
                    } else {
                        this.$message.error(response.message);
                    }

                })
            },
            handleLogin() {

                let _self = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.$store.commit('UPDATE_LOADING_STATUS', {
                            isLoading: true
                        })
                        this.$store.dispatch('tagsView/delAllViews')

                        if (this.beCustomer) {

                            customerLoginByUserName({
                                userName: _self.loginForm.account,
                                password: _self.loginForm.password,
                                verifyCode: _self.verifyCode,
                                captchaCode: _self.loginForm.captchaCode,
                                custCode: _self.loginForm.custCode
                            }).then((response) => {
                                if (response.success) {
                                    //1. 将user info存入sessionStore
                                    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
                                    // console.log(response.data)
                                    if (response.data.userType == 1 || response.data.userType == 3) {
                                        sessionStorage.setItem("admin", "admin"); //储存admin印记，做调不同登录页面
                                    } else {
                                        sessionStorage.removeItem("admin")
                                    }

                                    //2. 跳往登录后的第一个页面
                                    _self.$router.push('/dashboard?from=login');
                                    document.getElementsByTagName('canvas')[0].style.display="none";

                                } else {
                                    _self.$message.error(response.message);
                                    if (response.code == 2007) {
                                        this.getVerification()
                                    } else if (response.code == 2002) {
                                        setTimeout(() => {
                                            this.dialogVisible = true
                                            this.passwdForm.userId = response.data
                                        }, 1000)
                                    }
                                }

                                this.$store.commit('UPDATE_LOADING_STATUS', {
                                    isLoading: false
                                })

                            }).catch((error) => {
                                console.log(error)
                            })

                        } else {

                            adminLoginByUserName({
                                userName: _self.loginForm.account,
                                password: _self.loginForm.password,
                                verifyCode: _self.verifyCode,
                                captchaCode: _self.loginForm.captchaCode
                            }).then((response) => {
                                if (response.success) {
                                    //1. 将user info存入sessionStore
                                    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
                                    // console.log(response.data)
                                    if (response.data.userType == 1 || response.data.userType == 3) {
                                        sessionStorage.setItem("admin", "admin"); //储存admin印记，做调不同登录页面
                                    } else {
                                        sessionStorage.removeItem("admin")
                                    }

                                    //2. 跳往登录后的第一个页面
                                    _self.$router.push('/dashboard?from=login');
                                    document.getElementsByTagName('canvas')[0].style.display="none";

                                } else {
                                    _self.$message.error(response.message);
                                    if (response.code == 2007) {
                                        this.getVerification()
                                    } else if (response.code == 2002) {
                                        setTimeout(() => {
                                            this.dialogVisible = true
                                            this.passwdForm.userId = response.data
                                        }, 1000)
                                    }
                                }

                                this.$store.commit('UPDATE_LOADING_STATUS', {
                                    isLoading: false
                                })

                            }).catch((error) => {
                                console.log(error)
                            })

                        }


                    }
                })
            },
            refreshVerification() {
                this.getVerification()
            },
            getVerification() {
                getAuthCodeImg({}).then(val => {
                    this.verifyCodeUrl = val.data.captcha
                    this.verifyCode = val.data.verifyCode
                })
            },
        },
        updated() {
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
            // document.html.style.overflow = 'hidden';
        },
        mounted() {
            // this.canvas()
            document.body.style.overflow = 'hidden';
            // document.html.style.overflow = 'hidden';
            this.getVerification()
            if (this.$route.name == 'customerLogin') {
                this.beCustomer = true
                sessionStorage.removeItem('admin')
                getOnlyOne({}).then(rsp => {
                    if (rsp.message) {
                        this.loginForm.companyName = rsp.message
                    }
                })
            } else {
                sessionStorage.setItem('admin', 'admin');
            }
            document.getElementsByTagName('canvas')[0].style.display="block";;
            // canvans1()
            // canvans2()
        },
        beforeDestroy() {
            document.body.style.overflow = 'visible';
            // document.html.style.overflow = 'visible';
        },
        refresh() {

        }
    }
</script>

<style lang="less">
    /*html,body{overflow: hidden;}*/
    .customer-login {
        .editor-slide-upload {
          margin-bottom: 20px;
          ::v-deep .el-upload--picture-card {
            width: 100%;
          }
        }
        // min-height: 590px;
        // background: url(../../../static/imgs/login4.png) no-repeat center;
        // background-size: 100% 100%;

          height: 100%;
          width: 100%;
          background: #151019;
        #github-iframe {
          position: fixed;
          left: 32px;
          top: 32px;
        }
        
        .login-form{
            min-width: 0px;
        }

        .header {
            height: 80px;
            line-height: 80px;

            img {
                padding-bottom: 13px;
            }
        }

        .login-body {
            height: calc(~'100vh - 130px');
            overflow: hidden;

            .describe {
                position: absolute;
                left: 15%;
                top: 50%;
                width: 500px;
                transform: translateY(-50%);
                padding-bottom: 40px;
                color: #fff;

                .describeTitle {
                    font-size: 50px;
                }

                .describeContent {
                    font-size: 20px;
                }
            }
        }

        .login-div {
            position: absolute;
            left: 65%;
            top: 50%;
            transform: translateY(-50%);
            width: 420px;
            padding-bottom: 40px;
            background: #fff;
            z-index: 999;

            .verification {
                height: 45px;
                width: 90px;
                cursor: pointer;
            }
        }

        .el-divider {
            background-color: #508eff;
        }

        .el-input {
            height: 47px;
            width: 100%;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            color: #454545;
            padding: 0 40px;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .title-container {
            position: relative;

            .title {
                padding-top: 32px;
                font-size: 24px;
                font-weight: 400;
                color: #508eff;
                text-align: center;

                &::before {
                    border-left: none;
                }
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 5px;
                right: 0px;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: #889aa4;
            cursor: pointer;
            user-select: none;
        }

        .el-button--primary {
            height: 50px;
            background-color: #508eff;
            border-color: #508eff;
        }

        .el-input__inner {
            height: 47px;
        }

        .el-input-group__prepend {
            padding: 0 8px;
        }

        .footer {
            width: 100%;
            height: 50px;
            font-size: 16px;
            text-align: center;
            color: #e1e1e1;
        }

        .el-divider--horizontal {
            margin: 30px 0;
        }

        .help:hover {
            color: #e65526;
        }

        .el-input-group__append {
            background-color: white;
        }

        .passwd-dialog {
            .el-input__inner {
                height: auto;
            }

            .el-button--primary {
                height: auto;
            }
        }
    }
</style>
