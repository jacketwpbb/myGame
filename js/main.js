var loadLevel = function (game,n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i];
        var b = Block(game,p)
        blocks.push(b)
    }
    return blocks
}
var blocks
var pause=false
var fps=5
var score=0

var enableDebugMode=function(game,enable){
    if(!enable){
        return
    }
    window.addEventListener("keyup", function (event) {
        var key = event.key;
        if (event.key === "p") {
            pause = !pause
        }
        if ('1234567'.includes(key)) {
            blocks = loadLevel(game,key)
        }
    })
    document.querySelector('#input-fps').addEventListener("input",function(event){
        var input=event.target
        window.fps=input.value
    })
}
var __main = function () {



    //要载入的图片
    var images={
        ball:'img/ball.png',
        block:'img/block.png',
        paddle:'img/paddle.png',
    }
    var game = Game(images,function(game){

        var paddle = Paddle(game)

        var ball = Ball(game)
        blocks = loadLevel(game,1)

        game.registerAction("a", function () {
            paddle.moveLeft()
        })
        game.registerAction("d", function () {
            paddle.moveRight()
        })
        game.registerAction("f", function () {
            ball.fired = true
        })


        game.update = function () {
            if (pause) {
                return
            }
            ball.move()
            //collide
            ball.bounce(ball.collide(paddle), paddle)
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                ball.bounce(block.alive && ball.collide(block),block)
                if(block.alive && ball.collide(block)){
                    block.kill()
                    score+=100
                }

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

        //开始画
        game.draw = function () {
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
            game.context.fillText('分数'+score,10,290)

        }
    })
    enableDebugMode(game,true)


}
__main()