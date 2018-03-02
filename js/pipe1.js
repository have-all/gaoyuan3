(function(w){
    /*
     * 管道的特点：
     * 1、成对出现，所以x轴可以共享，但是y轴不共享
     * 2、上下管道之间的路径固定，可以由用户指定
     * 3、管道的高度是随机生成的，随机生成上管道的高度，下管道就可以计算了
     * 4、当管道走出画布，从右边出来时，高度需要重新随机生成
     * */
    //Pipe构造函数，参数：ctx、pipeup、pipedown、space、speed、landheight、width、height、len、x、y、
    //Pipe原型方法：初始化_init方法、draw方法、updata方法
    //工厂函数
    //初始化_init方法：管道xy坐标，上管道生成一个随机数，管道最低值，计算下管道xy坐标
    function Pipe(ctx,pipeUp,pipeDown,space,speed,landHeight){
        this.ctx = ctx;
        this.pipeUp = pipeUp;
        this.pipeDown = pipeDown;
        this.space = space;
        this.speed = speed||2;
        this.landHeight = landHeight;
        this.minHeight= 100;//管道最低高度限定
        this.width = this.pipeDown.width;
        this.height = this.pipeDown.height;
        Pipe.len++;
        this.x=300+this.width*3*(Pipe.len-1);//每个管道中间都隔有三个管道宽的空白距离
        this.y = 0;
        this._init();// 初始化管道的坐标，让其每创建一个对象，就初始化一下，来生成一个随机不同的管子高度
    }
    Pipe.len = 0;
    Pipe.prototype = {
            _init:function(){
               var maxHeight = this.ctx.canvas.height-this.landHeight-this.space-this.minHeight;//求管子最大可取的长度
                var randomHeight = Math.random()*maxHeight;//random在0~1之间
                randomHeight=randomHeight<=50?50:randomHeight;
                this.upY = randomHeight-this.height;//上管道y等于所取随机数长度-管总长，为负值
                this.downY = randomHeight+this.space;//下管道y等于上管道随机长+中间空隙space
            },
        draw:function(){
            this.ctx.drawImage(this.pipeUp,this.x,this.upY);
            this.ctx.drawImage(this.pipeDown,this.x,this.downY);
            this._drawPath();//每画一对管道的时候，调用画路径函数
        },
        //画管道的轮廓路径，用来判断是否鸟撞管道了
        _drawPath:function(){
            this.ctx.rect(this.x,this.upY,this.width,this.height);
            this.ctx.rect(this.x,this.downY,this.width,this.height);
        },
        update:function(){
            this.x-=this.speed;//往前移动
            if(this.x<=-this.width){
                this._init();//在出界后的再次进入时，要通过init改变管道长度
                this.x+=this.width*3*Pipe.len;
            }
        }
     };
    w.getPipe = function(ctx,pipeUp,pipeDown,space,speed,landHeight){
        return new Pipe(ctx,pipeUp,pipeDown,space,speed,landHeight);
    }
}(window));