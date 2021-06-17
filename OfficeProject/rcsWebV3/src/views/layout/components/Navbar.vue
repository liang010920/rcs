<template>
    <el-menu class="navbar" mode="horizontal" style="overflow: hidden">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

        <breadcrumb class="breadcrumb-container"></breadcrumb>

        <!--<div class="right-menu">-->
            <!--<el-dropdown class="avatar-container right-menu-item" trigger="click">-->
                <!--<div class="avatar-wrapper">-->
                    <!--<img class="user-avatar" src="/static/imgs/band.gif">-->
                    <!--<i class="el-icon-caret-bottom"></i>-->
                <!--</div>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                        <!--<span @click="handleLogout" style="display:block;">退出系统</span>-->
                    <!--</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
        <!--</div>-->

    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from './Breadcrumb/index.vue'
    import Hamburger from './Hamburger/index.vue'

    export default {
        components: {
            Breadcrumb,
            Hamburger,
        },
        computed: {
            ...mapGetters([
                'sidebar',
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            // handleLogout() {
            //     this.$store.dispatch('logout').then(() => {
            //         this.$router.push('/login');
            //     })
            // }
        }
    }
</script>

<style lang="less">
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .breadcrumb-container {
            float: left;
        }
        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }
        .right-menu {
            float: right;
            height: 100%;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }
            .screenfull {
                height: 20px;
            }
            .international {
                vertical-align: top;
            }
            .theme-switch {
                vertical-align: 15px;
            }
            .avatar-container {
                height: 50px;
                margin-right: 30px;
                .avatar-wrapper {
                    cursor: pointer;
                    margin-top: 0px;
                    position: relative;
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
