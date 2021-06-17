<template>
    <section :class="['media-item',{'active': selectId==preData.id}]" @click="showIndex=-1">
        <section class="media-header">
            <span>模板ID：{{preData.id}}</span>
            <span>{{preData.name}}</span>
        </section>
        <section class="item-desc">

            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(item,index) in list" :key="'card'+index">
                    <el-image v-show="type!='TEMPLATE_TEXT'" style="width:100%;height:150px;border-radius: 5px 5px 0 0"
                        :src="item.image | imgPath(typeObj[item.type])" fit="cover">
                        <div v-if="type=='TEMPLATE_DOCMENT'" slot="error" class="image-slot"
                            style="font-size: 24px;margin-top: 50px;text-align: center">
                            <i class="el-icon-folder"></i>
                        </div>
                    </el-image>
                    <div class="desc" v-show="type=='TEMPLATE_CARD'">
                        <h3 :title="item.name">{{item.name}}</h3>
                        <p class="scrollbar">{{item.text}}</p>
                        <div class="button-wrap scrollbar">
                            <div class="button" v-for="btn in item.buttons">{{btn.displayText}}</div>
                        </div>
                    </div>
                    <div class="text-style scrollbar" v-show="type=='TEMPLATE_TEXT'">
                        {{item.text}}
                    </div>
                </swiper-slide>
                <!--<div class="swiper-pagination" slot="pagination"></div>-->
            </swiper>

        </section>
        <section class="reply">
            <!--建议回复-->
            <swiper ref="mySwiper1" :options="swiperOptions1">
                <swiper-slide v-for="(reply,i) in preData.suggestedResponse" :key="'reply'+i" style="width: auto">
                    <span class="suggest">
                        {{reply.displayText}}
                    </span>
                </swiper-slide>
            </swiper>
        </section>
        <section class="media-status">
            <div class="left"></div>
            <div class="right">
                <template v-if="scene==1">
                    {{preData.createTime}}
                    <i class="el-icon-more" @click.stop="showIndex=0"></i>
                    <div class="control" v-show="showIndex==0">
                        <i class="el-icon-edit" @click="editMedia"> 编辑</i>
                        <br>
                        <el-popconfirm class="res-pop-confirm" title="确定删除吗？" @onConfirm="delMedia()">
                            <i class="el-icon-delete" slot="reference"> 删除</i>
                        </el-popconfirm>
                    </div>
                </template>
                <template v-else-if="scene==2">
                    <el-button type="primary" size="mini" @click.native="currentChange">选择</el-button>
                </template>
            </div>
        </section>
    </section>
</template>

<script>
    import {
        Swiper,
        SwiperSlide,
        directive
    } from 'vue-awesome-swiper'
    export default {
        name: "MediaItem",
        components: {
            Swiper,
            SwiperSlide,
        },
        props: {
            preData: {
                type: Object,
                default: {}
            },
            resetIndex: {
                type: Number,
                default: -1
            },
            scene: {
                default: 1 //1普通模式2组件模式
            },
            selectId: {
                default: -1
            }
        },
        data() {
            return {
                typeObj: {
                    '1': 'text',
                    '2': 'image',
                    '3': 'audio',
                    '4': 'video',
                    '5': 'image'
                },
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                },
                swiperOptions1: {
                    slidesPerView: 'auto',
                    freeMode: true,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                    mousewheel: true,
                },
                type: 1,
                replyList: [],
                showIndex: -1,
                activeGroupType: '-1',
            }
        },
        methods: {
            delMedia() {
                this.$emit('delMedia', this.preData.id)
            },
            editMedia() {
                this.$emit('editMedia', this.preData.id)
            },
            currentChange() {
                // this.$store.commit('UPDATE_BUS',{selectMediaId:this.preData.id})
                this.$emit('currentChange', this.preData)
            }
        },
        computed: {
            list() {
                let obj = this.preData
                console.log('preData:', this.preData)
                let content = []
                if (obj.content) {
                    content = JSON.parse(obj.content)
                    this.preData.suggestedResponse = JSON.parse(this.preData.suggestedResponse)
                    this.type = obj.type
                    if (this.type == 'TEMPLATE_IMAGE' || this.type == 'TEMPLATE_VIDEO') {
                        content[0].name = obj.name
                    } else if (this.type == 'TEMPLATE_AUDIO') {
                        content[0].title = obj.name
                        content[0].src = this.$options.filters.imgPath(content[0].file, 'audio')
                        content[0].pic = this.$options.filters.imgPath(content[0].image, 'audio')
                        content[0].artist = ' '
                    }
                }
                return content
            },
            bus() {
                return this.$store.state.app.bus
            }
        },
        watch: {
            resetIndex(index) {
                this.showIndex = index;
            },
            // 'preData.suggestedResponse'(val){
            //     return JSON.parse(val)
            // }
        },
        mounted() {
            // this.replyList = JSON.parse(this.preData.suggestedResponse)
            // this.preData.suggestedResponse = JsonReplyList
            // console.log('preData:-----',this.replyList)
        },
        activated() {
            // this.replyList = JSON.parse(this.preData.suggestedResponse)
            // this.preData.suggestedResponse = JsonReplyList
            // console.log('preData222222:-----',this.replyList)
        }
    }
</script>

<style scoped lang="less">
    .media-item {
        padding: 10px;
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        box-shadow: 2px 2px 10px 1px rgba(100, 100, 100, .2);
        position: relative;
        overflow: hidden;

        &.active {
            border: 1px solid rgb(64, 158, 255);
            box-shadow: 2px 2px 10px 1px rgba(64, 158, 255, .2);
        }

        .media-header {
            display: flex;
            justify-content: space-between;
            margin: auto;
            padding-bottom: 10px;
        }

        .item-desc {
            margin: 10px auto;
            width: 60%;
            font-size: 0;
            box-shadow: 2px 2px 10px 1px rgba(100, 100, 100, .2);
            border-radius: 5px;
            overflow: hidden;

            .desc {
                padding: 10px 0;
                font-size: 14px;
                line-height: 20px;
                word-break: break-word;

                h3 {
                    padding: 8px 50px;
                    min-height: 22px;
                    font-size: 15px;
                    color: #303133;
                    text-align: center;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                p {
                    margin: 10px 0;
                    padding: 0 20px;
                    height: 60px;
                    // overflow-y: auto;
                    // overflow-x: hidden;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    -webkit-box-orient: vertical;
                }

                .button-wrap {
                    margin-top: 15px;
                    height: 60px;
                    overflow-y: auto;
                }

                .button {
                    width: 80%;
                    margin: 5px auto 8px auto;
                    /*line-height: 34px;*/
                    font-size: 14px;
                    background-color: white;
                    border-radius: 10px;
                    text-align: center;
                    cursor: pointer;

                }
            }

            .text-style {
                height: 150px;
                padding: 10px;
                font-size: 14px;
                overflow-y: auto;
                word-break: break-all;
            }
        }

        .reply {
            margin: 20px 0 0 0;
            position: absolute;
            width: 80%;

            .suggest {
                cursor: pointer;
                display: inline-block;
                padding: 0 10px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                border-radius: 4px;
                margin-right: 10px;
                background-color: #f1f1f1;
            }
        }

        .media-status {
            margin-top: 45px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;

            .right {
                position: relative;
                color: #c1c1c1;

                i {
                    margin-left: 5px;
                    cursor: pointer;
                    line-height: 24px;
                }

                .control {
                    position: absolute;
                    bottom: 22px;
                    right: 0;
                    color: #333;

                    i {
                        padding: 2px 0;
                    }
                }

                .el-icon-more:hover,
                .control:hover {}
            }
        }

        .scrollbar::-webkit-scrollbar {
            width: 4px;
        }
    }
</style>
