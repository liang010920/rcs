import Mock from 'mockjs'

export default {
    getDestination : function (param) {
        let jsObj = JSON.parse(param.body);
        console.log("----did---"+jsObj.did);
        let dataObj = Mock.mock({
            "destination":{
                "title": "单人间",
                "desc":"小红农家乐",
                "province":"湖南",
                "city":"湘潭市",
                "district":"雨湖区",
                "address":"娄底交界处",
                "coordinate":"112.23242,145.23412",
                "strategyUrl":"https://m.zjyou.cn",
                "images":[
                    "destination/6.png",
                    "destination/4.png",
                    "destination/5.png"
                ]
            }
        })

        let rspData = {
            success: true,
            message: '',
            data: {
                destination: dataObj.destination
            },
        };
        return rspData;
    }
}


