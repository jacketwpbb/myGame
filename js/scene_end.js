var SceneEnd=function(game){
    var s={
        game:game,
    }

    //初始化

    // 可以加入图片
    // var paddle = Paddle(game)


    //注册按键
    game.registerAction("Enter", function () {
          let scene=new Scene(game)
          game.replaceScene(scene)

    })

    s.update=function () {

    }
    s.draw=function(){
        //background
        game.context.fillStyle="#ccc"
        game.context.fillRect(0,0,400,300)

        //label
        game.context.font="30px solid black"
        game.context.fillText('Game Over!',100,150)
    }

    return s
}