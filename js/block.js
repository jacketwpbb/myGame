var Block = function (position) {
    // position是[0,0,0]格式
    var p = position
    var image = imageFromPath("./img/block.png")
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        vx: 5,
        vy: 5,
        width: image.width,
        height: image.height,
        alive: true,
        health: p[2] || 0,
    }
    o.kill = function () {
        o.health--
        if (o.health < 1) {
            o.alive = false
        }
    }

    return o
}