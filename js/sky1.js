(function(w){
    //书写背景构函数的属性：绘制环境ctx、绘制img的dom点img、图片速度、绘制画的widt、height、记录当前背景个数len（为了方便计算下一帧的左边）、
function Sky(ctx,img,speed){
    this.ctx = ctx;
    this.img = img;
    this.speed = speed||2;
    this.width = this.img.width;
    this.height = this.img.height;
    Sky.len++;
    this.x =this.width*(Sky.len-1);
    this.y = 0;
}
    Sky.len = 0;//放在构造函数外，放在构造里边会导致每次创建对象都要清0
    Sky.prototype = {
        constructor:Sky,
        draw:function(){
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        update:function(){
            this.x -=this.speed;
            if(this.x<=-this.width){
                this.x+=this.width*Sky.len;
            }
        }
    };
    //工厂函数
        w.getSky = function(ctx,img,speed){
        return new Sky(ctx,img,speed);
    };

}(window));