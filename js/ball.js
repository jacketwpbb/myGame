var Ball = function () {
    var image = imageFromPath("./img/ball.png")
    var o = {
        image: image,
        x: 100,
        y: 150,
        vx: 6,
        vy: 6,
        fired:false,
    }
    o.move = function () {
        if(o.fired){
            o.x+=o.vx
            o.y+=o.vy

            if(o.x<0||o.x>400-o.image.width){
                o.vx*=-1
                if(o.x<0){
                    o.x=0
                }
                if(o.x>400-o.image.width){
                    o.x=400-o.image.width

                }
            }
            //这里不能用else if 因为两个不是互斥的
            if(o.y<0||o.y>300-o.image.height){
                o.vy*=-1
                if(o.y<0){
                    o.y=0
                }
                if(o.y>300-o.image.height){
                    o.y=300-o.image.height
                }
            }

        }

    }
    o.collide=function(paddle){
        var y1=paddle.y,
            x1=paddle.x,
            h1=paddle.image.height,
            w1=paddle.image.width,
            x2=o.x,
            y2=o.y,
            w2=o.image.width,
            h2=o.image.height,
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
                var isInside=o.vy>0?((o.image.height+o.y-paddle.y)>o.vy):((paddle.image.height+paddle.y-o.y)>-o.vy)
                if(!isInside){
                    o.vy*=-1
                    o.vx*=-1
                }else if(isInside){
                    log(paddle)
                    var isLeft=Math.abs(o.x+o.image.width-paddle.x)<Math.abs(o.x-paddle.x-paddle.image.width)
                    o.y=o.vy>0?(paddle.y-o.image.height-1):(paddle.y+paddle.image.height+1)
                    o.x=isLeft?(paddle.x-o.image.width):(paddle.x+paddle.image.width)
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
    return o
}