<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>{{orderStatus}}</h2>
    </div>
</template>

<script>
    import $ from 'jquery'
    import{test} from '../api/api'
    import {adminClient} from '../config/config'


    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                orderStatus:'',
                aaa: ''
            }
        },
        methods: {
            testOne(){
                test().then((response) => {
                    console.log("--------------",response);
                    this.orderStatus = response.username;

                    if(response.success){
                        console.log("--------------")
                        this.orderStatus = response.orderStatus;
                        console.log("--------------",this.orderStatus)
                        console.log("--------------",response)
                    }else {
                        this.$vux.toast.text(response.message, 'middle');
                        // this.close();
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }

        },
        mounted(){
            console.log("----------"+adminClient);
            this.aaa = adminClient;
            this.testOne();
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
</style>
