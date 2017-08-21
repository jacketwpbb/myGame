var Game = function (fps) {
    var g = {
        //储存要激活的按键
        actions: {},
        //key status
        keydowns: {},
    }
    var cvs = document.querySelector('#my-canvas')
    var ctx = cvs.getContext('2d')
    g.canvas = cvs
    g.context = ctx
    g.drawImage=function(element){
        g.context.drawImage(element.image, element.x, element.y)
    }
    g.draw=function(){}
    g.update=function(){}
    //events
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })
    //注册按键
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }

    //timer
    var runloop=function () {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            if(g.keydowns[key]){
                //如果按键被按下，执行相应的函数
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        ctx.clearRect(0,0,cvs.width,cvs.height)
        //draw
        g.draw()
        setTimeout(runloop,1000/window.fps)
    }
    setTimeout(runloop,1000/window.fps)

    return g

}