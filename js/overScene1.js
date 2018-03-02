(function(w){
    function OverScene(ctx){
        this.ctx = ctx;
    }
    OverScene.prototype = {
        constructor:OverScene,
    // 为了防止影响全局状态，所以先save再restore
    draw:function(){
        this.ctx.save();
        this.ctx.restore();
        this.ctx.fillStyle = "rgba(100, 100, 100, 0.8)";//结束的背景颜色设置
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);//结束的背景大小设置
        this.ctx.textAlign = "center";//结束字体位置设置
        this.ctx.textBaseLine = "middle";//结束字体位置设置
        this.ctx.fillStyle = "red";//结束字体颜色设置
        this.ctx.font = "900 40px 微软雅黑";//结束字体设置
        this.ctx.fillText("GAME OVER!!",this.ctx.canvas.width/2,this.ctx.canvas.height/2);
       }
    }
    w.getOverScene = function(ctx){
        return new OverScene(ctx);
    }
}(window))