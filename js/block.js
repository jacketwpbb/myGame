var Block = function (game,position) {
    // position是[0,0,0]格式
    var p = position
    var o = game.imageByName("block")
    // var image = imageFromPath("./img/block.png")
    // var o = {
    //     image: image,
    //     x: p[0],
    //     y: p[1],
    //     alive: true,
    //     health: p[2] || 1,
    // }
    o.x=p[0]
    o.y=p[1]
    o.alive=true
    o.health=p[2]||1

    o.kill = function () {
        o.health--
        if (o.health < 1) {
            o.alive = false
        }
    }
    return o
}