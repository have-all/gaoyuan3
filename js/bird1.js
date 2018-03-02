(function(w){
    function Bird(ctx,img,widthFrame,heightFrame,x,y){
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;//一排多少个
        this.heightFrame = heightFrame;//一列多少个
        this.x = x;//小鸟初始x坐标
        this.y = y;//小鸟初始y坐标
        this.width = this.img.width/widthFrame;//一个小鸟的宽度
        this.height = this.img.height/heightFrame;//一个小鸟的高度
        this.currentFrame = 0;//记录当前裁剪到第几帧上
        this.speed = 2;//小鸟移动速度
        this.speedPlus = 0.05;//小鸟移动加速度
        this._bind();//绑定事件，在对象创建好的时候就准备好了，一旦触发，就执行相应函数
    }
    Bird.prototype = {
        constrictor:Bird,
        draw:function(){
            var baseRadian = Math.PI/180*10;//计算小鸟旋转的初始角度
            var maxRadian = Math.PI/180*45;//计算小鸟旋转的最大角度
            var rotateRadian = baseRadian*this.speed;//让实际旋转角度与speed成正比，速度越快，旋转幅度越大
            rotateRadian = rotateRadian>=maxRadian?maxRadian:rotateRadian;//设置最大旋转范围
            this.ctx.save();//保存默认样式
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2);//先将旋转中心从坐标原点（画布左上角）移动到小鸟身子的中心
            this.ctx.rotate(rotateRadian);//进行旋转
            this.ctx.drawImage(this.img,this.width*this.currentFrame,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);//将旋转后的小鸟进行绘制
            this.ctx.restore();//在第一次创建后，回滚到最初默认样式，以便于后面的创建不被影响
        },
        update:function(){
            this.currentFrame = ++this.currentFrame>=this.widthFrame?0:this.currentFrame;//让当前帧数累加，实现动态
            this.y +=this.speed;//设置小鸟不断下落
            this.speed+=this.speedPlus;//给加速度，使小鸟下的越下，速度越快

        },
        _bind:function(){
            var self = this;
            this.ctx.canvas.addEventListener("click",function(){
                self.speed = -3;
            })
        }
    };
    var bird = null;
    w.getBird = function(ctx,img,widthFrame,heightFrame,x,y){
        if(!bird){
            bird = new Bird(ctx,img,widthFrame,heightFrame,x,y);
        }
        return bird;
    };
}(window));