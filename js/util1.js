var util = {
    //混入式继承
    extend:function(o1,o2){
        for(var key in o2){
            if(o2.hasOwnProperty(key)){
                o1[key] = o2[key];
            }
        }
    },
    //参数：要加在图片的资源imgUrl、回调函数fn
    loadImage:function(imgUrl,fn){
        var loaded = 0;//定义当前下载图片个数loaded
        var imgLenght = 0;//图片总个数imgLength
        var imgObj = {};//保存加载好的图片的对象容器imgObj
        var tempImg;//一个临时放置加载好图片的，tempImg具有图片属性方法的容器，以便于调用imgload和src属性
        //遍历要预加载的图片对象
        for(var key in imgUrl){
            imgLenght++;//统计需要加载的图片个数
            tempImg = new Image();//图片自带的属性方法
            tempImg.onload = function(){
                loaded++;//统计已经加载的图片个数
                //当所有图片都加载完毕
                if(loaded>=imgLenght){
                    //执行回调函数，并将加载好的图片作为参数传导外界
                   fn(imgObj);
                }
            };
            tempImg.src = imgUrl[key];//把预加载图片的地址给image里的src，就是加载过程
            imgObj[key] = tempImg;//把带有图片所有属性的，且有已加载图片网址的临时图片放在imgObj中保存起来，以便于使用
        }
    }
}