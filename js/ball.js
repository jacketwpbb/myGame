var Ball = function (game) {
    var o = game.imageByName("ball")
    // var image = imageFromPath("./img/ball.png")

    o.x= 100
    o.y= 150
    o.vx= 6,
    o.vy=6
    o.fired=false


    o.move = function () {
        if(o.fired){
            o.x+=o.vx
            o.y+=o.vy

            if(o.x<0||o.x>400-o.w){
                o.vx*=-1
                if(o.x<0){
                    o.x=0
                }
                if(o.x>400-o.w){
                    o.x=400-o.w

                }
            }
            //这里不能用else if 因为两个不是互斥的
            if(o.y<0||o.y>300-o.h){
                o.vy*=-1
                if(o.y<0){
                    o.y=0
                }
                if(o.y>300-o.h){
                    o.y=300-o.h
                }
            }

        }

    }
    o.collide=function(paddle){
        var y1=paddle.y,
            x1=paddle.x,
            h1=paddle.h,
            w1=paddle.w,
            x2=o.x,
            y2=o.y,
            w2=o.w,
            h2=o.h,
            vy=o.vy,
            vx=o.vx,
            v2x=paddle.vx,
            v2y=paddle.vy;

        if(collideX(paddle,o)&&collideY(paddle,o)){
            var status={
                leftOrRight:false,
                topOrBottom:false,
                both:false,
            }
            //左右侧碰撞
            if((vy>0&&(y2+h2-vy)>=y1&&(y2+h2-vy)<=(y1+h1))||(vy<0&&(y2-vy)>=y1&&(y2-vy)<=y1+h1)){
                status.leftOrRight=true
            }
            //左右侧碰撞
            if((vx>0&&(x2+w2-vx)>=x1&&(x2+w2-vx)<=(x1+w1))||(vx<=0&&(x2-vx)>=x1&&(x2-vx)<=x1+w1)){
                status.topOrBottom=true
            }
            if(status.topOrBottom&&status.leftOrRight){
                return 2
            }else if(status.leftOrRight){
                return 1
            }else if(status.topOrBottom){
                return 3
            }


        }else{
            return false
        }
    }
    o.bounce=function(status,paddle){
        switch (status){
            case 1:
                o.vx*=-1
                break;
            case 2:
                var isInside=o.vy>0?((o.h+o.y-paddle.y)>o.vy):((paddle.h+paddle.y-o.y)>-o.vy)
                if(!isInside){
                    o.vy*=-1
                    o.vx*=-1
                }else if(isInside){
                    log(paddle)
                    var isLeft=Math.abs(o.x+o.w-paddle.x)<Math.abs(o.x-paddle.x-paddle.w)
                    o.y=o.vy>0?(paddle.y-o.h-1):(paddle.y+paddle.h+1)
                    o.x=isLeft?(paddle.x-o.w):(paddle.x+paddle.w)
                    o.vx*=-1
                    o.vy*=-1
                }
                break;
            case 3:
                o.vy*=-1
                break;
            case 4:
                break;
        }

    }
    o.hasPoint=function(x,y){
        return (x<o.x+o.h&&x>o.x)&&(y>o.y&&y<o.y+o.h)
    }
    return o
}