var Paddle = function (game) {
    var o = game.imageByName("paddle")
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 8,
    //     speedStatus:4,
    // }
    o.x=100
    o.y=250
    o.speed=15
    o.speedStatus=4
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