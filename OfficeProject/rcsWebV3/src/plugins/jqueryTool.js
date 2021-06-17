/**
 * Created by tanxijun on 2017/11/21.
 */

(function($){

    $.extend({
        loading:{
            show: function (msg) {
                var defaultMsg = "正在上传，请稍后...";
                if(!msg){
                    msg = defaultMsg
                }

                function getBox(msg) {
                    var html = '<div id="loading-box" class="mask">'+
                        '<div class="upload-prompt-box">' + msg + '</div>'+
                    '</div>';
                    return html;
                }

                $("body").append(getBox(msg))


            },
            hide: function () {
                $("#loading-box").remove()
            }
        }
    })
})(jQuery)

