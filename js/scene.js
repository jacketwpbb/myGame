var Scene=function(game){
    var s={
        game:game,

    }

    //初始化
    var score=0
    var paddle = Paddle(game)
    var ball = Ball(game)
    blocks = loadLevel(game,1)

    //注册按键
    game.registerAction("a", function () {
        paddle.moveLeft()
    })
    game.registerAction("d", function () {
        paddle.moveRight()
    })
    game.registerAction("f", function () {
        ball.fired = true
    })

    s.update=function(){
        if (pause) {
            return
        }
        //game over
        if(ball.y+ball.h+ball.vy>300){
            let endScene=SceneEnd(game)
            game.replaceScene(endScene)
        }

        ball.move()



        //collide
        ball.bounce(ball.collide(paddle), paddle)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            ball.bounce(block.alive && ball.collide(block),block)
            log(ball.collide(block))
            if(block.alive && ball.collide(block)){
                log()
                block.kill()
                score+=100
            }
        }
        //mouse event鼠标拖拽
        var enableDrag=false
        game.canvas.addEventListener('mousedown',(event)=>{
            var x=event.offsetX
            var y=event.offsetY
            //检查是否点中了ball
            if(ball.hasPoint(x,y)){
                //设置拖拽状态
                enableDrag=true
            }
        })
        game.canvas.addEventListener('mousemove',(event)=>{
            var x=event.offsetX
            var y=event.offsetY
            if(enableDrag){
                ball.x=x
                ball.y=y
            }

        })
        game.canvas.addEventListener('mouseup',(event)=>{
            var x=event.offsetX
            var y=event.offsetY
            enableDrag=false
        })

    }
    s.draw=function(){
        //background
        game.context.fillStyle="#ccc"
        game.context.fillRect(0,0,400,300)

        //draw
        game.drawImage(ball)
        game.drawImage(paddle)
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if (b.alive) {
                game.drawImage(b)
            }

        }
        //label
        game.context.fillStyle="black"
        game.context.fillText('分数'+score,10,290)
    }

    return s
}