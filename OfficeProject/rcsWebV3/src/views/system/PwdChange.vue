<template>
    <section class="account-setting">
        <el-form :label-position="'right'" label-width="110px" size="small" :model="account" ref="account"
            :rules="rules">
            <el-form-item label="用户名:">
                <el-input v-model="account.userName" disabled></el-input>
            </el-form-item>
            <!--<el-form-item label="手机:">-->
            <!--<el-input v-model="account.mobile" disabled></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="旧密码:" prop="oldPassword">
                <el-input type="password" v-model="account.oldPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
                <el-input type="password" v-model="account.newPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="newPassword2">
                <el-input type="password" v-model="account.newPassword2" autocomplete="off" show-password></el-input>
            </el-form-item>


            <!-- <el-form-item label="" style="padding: 0.2rem 0.6rem">
                <el-button type="primary"
                           @click="handleSubmit('account')">提交
                </el-button>
            </el-form-item> -->
            <el-row>
                <el-col :span="24" align="right">
                    <el-button @click="closeUpdatePwd">取 消</el-button>
                    <el-button type="primary" @click="handleSubmit('account')">确 定</el-button>
                </el-col>
            </el-row>
        </el-form>

    </section>
</template>

<script>
    import {
        modPassword
    } from '../../api/api.js'

    export default {
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.account.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                account: {
                    userName: '',
                    mobile: '',
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                },
                rules: {
                    oldPassword: [{
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur'
                    }],
                    newPassword: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            pattern: /^[\S]{6,}$/,
                            message: '密码长度要大于6位'
                        }
                    ],
                    newPassword2: [{
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }],

                }
            }
        },
        props: [],
        methods: {

            handleSubmit(value) {
                let _self = this;
                _self.$refs[value].validate((valid) => {
                    if (valid) {
                        _self.checkPassword();
                    } else {
                        _self.$message.error("请填写必填属性");
                        return;
                    }
                });
            },
            closeUpdatePwd() {
                this.$emit('closePwdChange')
            },
            checkPassword() {
                let _self = this;
                // if (_self.account.newPassword != _self.account.newPassword2) {
                //     _self.$message.error("新密码与确认密码不一致！")
                //     return;
                // }
                // if (_self.account.newPassword.length < 6) {
                //     _self.$message.error("新密码长度最少为6位")
                //     return;
                // }
                // if (_self.account.newPassword == _self.account.password) {
                //     _self.$message.error("新密码与原始密码相同")
                //     return;
                // }
                _self.editAccount();
                this.$emit('closePwdChange')

            },
            editAccount() {
                let _self = this;
                modPassword(_self.account).then(function(response) {
                    if (response.success) {
                        _self.$message.success("操作成功")
                        _self.$store.dispatch('logout').then(() => {
                            let admin = sessionStorage.getItem("admin");
                            if (admin) {
                                _self.$router.push({
                                    path: '/login'
                                })
                            } else {
                                _self.$router.push({
                                    path: '/supplierLogin'
                                })
                            }
                        })
                    } else {
                        _self.$message.error(response.message);
                    }

                })
            }
        },
        mounted() {
            this.account = {
                    mobile: '',
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                },
                this.account.userName = this.$store.state.user.userName;
        }
    }
</script>
<style lang="less">
    .account-setting {
        // padding: 0.3rem 2.5rem 0.5rem 2.5rem;
        /*padding-left: 2.5rem;*/
        /*padding-right: 2.5rem;*/
        width: 100%;
        // margin: 15px;

    }
</style>
