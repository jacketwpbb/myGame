var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}
var collideX=function(a,b){
    var x1=a.x,
        w1=a.width,
        x2=b.x,
        w2=b.width;
    return (x1>=x2&&x1<=x2+w2)||(x2>=x1&&x2<=x1+w1);
}
var collideY=function(a,b){
    var y1=a.y,
        h1=a.height,
        y2=b.y,
        h2=b.height;
    return (y1>=y2&&y1<=y2+h2)||(y2>=y1&&y2<=y1+h1);
}



