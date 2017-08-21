var Paddle = function () {
    var image = imageFromPath("./img/paddle.png")
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 8,
        width: image.width,
        height: image.height,
        speedStatus:4,
    }
    o.moveLeft = function () {
        o.x -= this.speed
        o.speedStatus=-o.speed;
        if (this.x < 0) {
            this.x = 0
        }
    }
    o.moveRight = function () {
        o.x += this.speed
        o.speedStatus=o.speed;

    }

    return o
}