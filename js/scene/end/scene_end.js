// var SceneEnd=function(game){
//     var s={
//         game:game,
//     }
//
//     //初始化
//
//     // 可以加入图片
//     // var paddle = Paddle(game)
//
//
//     //注册按键
//     game.registerAction("r", function () {
//
//           let scene=new SceneTitle(game)
//           game.replaceScene(scene)
//     })
//
//     s.update=function () {
//
//     }
//     s.draw=function(){
//         //background
//         game.context.fillStyle="#ccc"
//         game.context.fillRect(0,0,400,300)
//
//         //label
//         game.context.font="30px solid "
//         game.context.fillStyle="black"
//         game.context.fillText('Game Over!',100,150)
//     }
//
//     return s
// }
class SceneEnd extends Scene{
    constructor(game){
        super(game)
        game.registerAction("r", function () {

            let scene=new SceneTitle(game)
            game.replaceScene(scene)
        })
    }
    draw(){
        //background
        this.game.context.fillStyle="#ccc"
        this.game.context.fillRect(0,0,400,300)

        //label
        this.game.context.font="30px solid "
        this.game.context.fillStyle="black"
        this.game.context.fillText('Game Over!',100,150)

    }
}