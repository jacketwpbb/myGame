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

var pause=false
var fps=5
var blocks=0

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
        game.scene=new SceneTitle(game)
    })
    enableDebugMode(game,true)


}
__main()