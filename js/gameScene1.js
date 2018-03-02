(function(w){
    function Scene(ctx,imgObj){
        this.ctx = ctx;
        this.imgObj = imgObj;
        this.roles = [];
        this._initRoles();
        //存放听众的队列
        this.listeners = [];
    }
    Scene.prototype = {
        constructor:Scene,
    //游戏场景角色设置
        _initRoles:function(){
            //背景天空2个
            this.roles.push(getSky(this.ctx,this.imgObj.sky,3));
            this.roles.push(getSky(this.ctx,this.imgObj.sky,3));
            //管道6个
            for(var i=0;i<6;i++){
                this.roles.push(getPipe(this.ctx,this.imgObj.pipeDown,this.imgObj.pipeUp,150,3,this.imgObj.land.height))
            }
            //大地4个
            for (var i = 0; i < 4; i++) {
                this.roles.push(getLand(this.ctx,this.imgObj.land,3));
            }
            //小鸟一个
            this.roles.push(getBird(this.ctx,this.imgObj.bird,3,1,10,10));
        },
        //添加听众（其实就是创建要在触发后必须执行的事件）
            addListener:function(listener){
                this.listeners.push(listener);
            },
        //告知听众(告知听众，起始就是一个事件要开始执行了)
            triggerOverBird:function(){
                this.listeners.forEach(function(oneListener){
                    oneListener();
                })
            },
    //让角色开始动起来
    draw:function(){
        /*
         * 每次绘制新的游戏画面时，
         * 先判断小鸟有没有碰撞，
         * 如果碰撞暂停定时器。
         * */
        var bird = getBird();//创建小鸟对象
        var coreX = bird.x+bird.width/2;//小鸟身子中心想x
        var coreY = bird.y+bird.height/2;//小鸟身子中心y
        //如果小鸟撞管道轮廓（也就是在管道路径内）或走出画面或撞到大地，游戏结束
        if(ctx.isPointInPath(coreX,coreY)||bird.y<0||bird.y>ctx.canvas.height-this.imgObj.land.height){
            //监听到小鸟被撞事件(其实就是调用事件执行)
            this.triggerOverBird();
        }else{
            // 先清除上一次绘制的6个管道路径，
            // 然后再按照新的位置绘制新路径
            ctx.beginPath();
            this.roles.forEach( function( role ) {
                role.draw();
                role.update();
            } );
        }
     }
   }
    w.getGameScene = function(ctx,imgObj){
        return new Scene(ctx,imgObj)
    }
}(window))