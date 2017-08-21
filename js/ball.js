var Ball = function () {
    var image = imageFromPath("./img/ball.png")
    var o = {
        image: image,
        x: 100,
        y: 150,
        vx: 6,
        vy: 6,
        width: image.width,
        height: image.height,
        fired:false,
        collision:0,
    }
    o.move = function () {
        if(o.fired){
            o.x+=o.vx
            o.y+=o.vy

            if(o.x<0||o.x>400-o.width){
                o.vx*=-1
                if(o.x<0){
                    o.x=0
                }
                if(o.x>400-o.width){
                    o.x=400-o.width
                    log(o.x)
                }
            }
            //这里不能用else if 因为两个不是互斥的
            if(o.y<0||o.y>300-o.height){
                o.vy*=-1
                if(o.y<0){
                    o.y=0
                }
                if(o.y>300-o.height){
                    o.y=300-o.height
                    log(o.y)
                }
            }

        }

    }
    o.collide=function(paddle){
        var y1=paddle.y,
            x1=paddle.x,
            h1=paddle.height,
            w1=paddle.width,
            x2=o.x,
            y2=o.y,
            w2=o.width,
            h2=o.height,
            vy=o.vy,
            vx=o.vx,
            v2x=paddle.vx,
            v2y=paddle.vy;
        if(collideX(paddle,o)&&collideY(o,paddle)){

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
                log(o.collision)
                if(o.collision===0){
                    o.vy*=-1
                    o.vx*=-1
                    o.collision++
                }else if(o.collision!==0&&paddle){

                    o.y=o.vy>0?(paddle.y-o.height):(paddle.y+paddle.height)
                    o.x=paddle.speedStatus<0?(paddle.x-o.width):(paddle.x+paddle.width)
                    o.vy*=-1
                    o.vx*=-1
                    o.collision=0
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