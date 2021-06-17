<template>
    <section class="preview-index">
        <div :class="type == 'TEMPLATE_VIDEO' ? 'previewHeight' : ''">
            <!--text start-->
            <section v-if="type=='TEMPLATE_TEXT' || type=='1'">
                <el-input type="textarea" v-model="preview.text" readonly rows="10" maxlength="5242880"></el-input>
            </section>
            <!--text end-->

            <!--image start-->
            <section v-else-if="type=='TEMPLATE_IMAGE' || type=='2'" style="text-align: center;">
                <el-image v-if="preview.image != undefined" :src="imageRootPath+preview.image"></el-image>
                <el-image v-else :src="imageRootPath+preview.file"></el-image>
            </section>
            <!--image end-->

            <!--audio start-->
            <section v-else-if="type=='TEMPLATE_AUDIO' || type=='3'" style="text-align: center;">
                <aplayer :music="preview.pic?preview:src" loop="none" preload="metadata" />
            </section>
            <!--audio end-->

            <!--video start-->
            <section v-else-if="type=='TEMPLATE_VIDEO' || type=='4'" style="text-align: center;">
                <video width="100%" controls controlslist="nodownload nofullscreen" ref="video" disablePictureInPicture
                    :src="imageRootPath+preview.file" :poster="imageRootPath+preview.image"></video>
            </section>
            <!--video end-->

            <section class="item-desc" v-else-if="type=='TEMPLATE_CARD' || type=='5'">
                <swiper ref="mySwiper" :options="swiperOptions">
                    <swiper-slide v-for="(item,index) in preview" :key="'card'+index">
                        <el-image style="width:100%;height:150px;border-radius: 5px 5px 0 0" :src="imageRootPath+item.image"
                            fit="cover">
                            <div slot="error" class="image-slot" style="font-size: 24px;margin-top: 50px;text-align: center">
                                <i class="el-icon-folder"></i>
                            </div>
                        </el-image>
                        <div class="desc">
                            <h3>{{item.name}}</h3>
                            <p class="scrollbar">{{item.text}}</p>
                            <div class="button-wrap scrollbar" style="text-align: center;margin-top:20px">
                                <div class="button" style="color: #044d91;cursor: pointer;" v-for="(btn,index) in item.buttons"
                                    :key="'btn'+index">{{btn.displayText}}</div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </section>

            <section v-else-if="type == 'TEMPLATE_DOCMENT' || type=='6'">
                <p>{{imageRootPath+preview.file}}</p>
            </section>

            <!--card start-->
            <section v-else-if="type==10" class="item-desc">
                <swiper ref="mySwiper" :options="swiperOptions">
                    <swiper-slide v-for="(item,index) in previewListJSON" :key="'card'+index">
                        <el-image style="width:100%;height:150px;border-radius: 5px 5px 0 0" :src="imageRootPath+item.image"
                            fit="cover">
                            <div slot="error" class="image-slot" style="font-size: 24px;margin-top: 50px;text-align: center">
                                <i class="el-icon-folder"></i>
                            </div>
                        </el-image>
                        <div class="desc">
                            <h3>{{item.name}}</h3>
                            <p class="scrollbar">{{item.text}}</p>
                            <div class="button-wrap scrollbar" style="text-align: center;margin-top:20px">
                                <div class="button" style="color: #044d91;cursor: pointer;" v-for="(btn,index) in item.buttons"
                                    :key="'btn'+index">{{btn.displayText}}</div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </section>
            <!--card end-->

            <section class="reply">
                <swiper ref="mySwiper1" :options="swiperOptions1">
                    <swiper-slide v-for="(reply,i) in suggestedResponse" :key="'reply'+i" style="width: auto">
                        <span class="suggest">
                            {{reply.displayText}}
                        </span>
                    </swiper-slide>
                </swiper>
            </section>
            <div></div>
        </div>
    </section>
</template>

<script>
    import 'swiper/css/swiper.css'
    import Aplayer from 'vue-aplayer'
    import {
        imageRootPath
    } from '../../../config/config.js'
    import {
        Swiper,
        SwiperSlide,
        directive
    } from 'vue-awesome-swiper'
    import UploadFileBase from '../../../components/UploadFileBase'
    import {
        regionDataPlus,
        provinceAndCityData,
        CodeToText,
        TextToCode
    } from 'element-china-area-data'
    export default {
        name: "preViewIndex",
        components: {
            Aplayer,
            UploadFileBase,
            Swiper,
            SwiperSlide
        },
        props: ['row'],
        data() {
            return {
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
                music: {
                    title: '羊毛党音频',
                    artist: ' ',
                    src: 'http://qyb-bucket.oss-cn-qingdao.aliyuncs.com/test/audio/f78a1f1867e6196731233d6791d0a63f.mp3',
                    pic: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
                },
                imageRootPath,
                preview: {},
                previewListJSON: [],
                type: 0,
                suggestedResponse:[]
            }
        },
        mounted() {
            
            console.log('row:', this.row)
            this.type = this.row.type
            console.log('row.content:', this.row.content)
            if(this.row.suggestedResponse!=undefined){
                this.suggestedResponse = this.row.suggestedResponse
            }
            this.preview = JSON.parse(this.row.content)
            // console.log('预览效果数据-----', this.preview)
            if (this.type == 3 || this.type == 'TEMPLATE_AUDIO') {
                this.preview.title = this.row.name
                this.preview.src = this.$options.filters.imgPath(this.preview.file, 'audio')
                this.preview.pic = this.$options.filters.imgPath(this.preview.image, 'audio')
                this.preview.artist = ' '
            } else if (this.type == 10) {
                let previewJson = this.preview.json
                this.previewListJSON = JSON.parse(previewJson.content)
                // console.log('预览效果数据JSON-----', this.previewListJSON)
            }

        }
    }
</script>

<style scoped lang="less">
    .preview-index {

        .reply {
            margin-top: 10px;
            // position: absolute;
            width: 100%;

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


        .item-desc {
            margin: auto;
            width: 60%;
            font-size: 0;
            box-shadow: 2px 2px 10px 1px rgba(100, 100, 100, 0.2);
            border-radius: 5px;
            overflow: hidden;

            // .swiper-container {
            //     margin-left: auto;
            //     margin-right: auto;
            //     position: relative;
            //     overflow: hidden;
            //     list-style: none;
            //     padding: 0;
            //     z-index: 1;

            //     .swiper-wrapper {
            //         position: relative;
            //         width: 100%;
            //         height: 100%;
            //         z-index: 1;
            //         display: flex;
            //         transition-property: transform;
            //         box-sizing: content-box;

            //         .swiper-slide {
            //             flex-shrink: 0;
            //             width: 100%;
            //             height: 100%;
            //             position: relative;
            //             transition-property: transform;
            //         }
            //     }
            // }
        }

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
                height: 50px;
                overflow-y: auto;

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

            .button {
                width: 80%;
                margin: 5px auto 8px auto;
                /*line-height: 34px;*/
                font-size: 14px;
                // background-color: white;
                border-radius: 10px;
                text-align: center;
            }
        }

        .text-style {
            height: 150px;
            padding: 10px;
            font-size: 14px;
            overflow-y: auto;
            word-break: break-all;
        }

        .previewHeight {
            height: 500px;
            overflow: hidden;
            // padding-bottom: 10px;
            position: relative;

            video {
                height: 100%
            }

            section {
                height: 100%
            }
        }
    }
</style>
