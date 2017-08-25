var Game = function (imgsToLoad,runCallback) {
    //imgsToLoad是一个对象，里面储存所有要加载的图片的引用名字和路径
    //程序会在图片加载完后才运行
    var g = {
        //储存要激活的按键
        actions: {},
        //key status
        keydowns: {},
        images:{},
        scene:null,
    }
    var cvs = document.querySelector('#my-canvas')
    var ctx = cvs.getContext('2d')
    g.canvas = cvs
    g.context = ctx
    g.drawImage=function(element){
        g.context.drawImage(element.image, element.x, element.y)
    }
    g.update=function(){
        g.scene.update()
    }
    g.draw=function(){
        g.scene.draw()
    }
    //替换游戏场景
    g.replaceScene=function (scene) {
        g.scene=scene
        //还需要把事件监放到场景中
        //注销掉场景的事件监听
    }

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
    //预先载入图片
    var loads=[]
    var names=Object.keys(imgsToLoad)
    for (let i = 0; i < names.length; i++) {
        let name=names[i]
        var path = imgsToLoad[name]
        let img=new Image()
        img.src=path

        img.onload=function(){
             //所有图片载入成功后
            g.images[name]=img
            loads.push(1)
            if(loads.length===names.length){
                g.run()
            }
        }
    }
    //载入图片
    g.imageByName=function(name){
        var img=g.images[name]
        var o={
            image:img,
            w:img.width,
            h:img.height
        }
        return o
    }
    //开始运行程序
    g.run=function(){
        runCallback(g)
        setTimeout(runloop,1000/window.fps)
    }

    return g

}