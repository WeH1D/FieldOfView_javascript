const canvas = document.querySelector('.canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

var mousePos;
var walls = [];
var p = new particle();

window.onload = function () {
    setInterval(update, 10);
    walls[0] = new boundary(0,0,0, height);
    walls[1] = new boundary(0,0,width,0);
    walls[2] = new boundary(width, height, width, 0);
    walls[3] = new boundary(width, height, 0, height);
    for (var i = 4; i < 10; i++) {
        let x1 = Math.floor(Math.random() * width);
        let y1 = Math.floor(Math.random() * height);
        let x2 = Math.floor(Math.random() * width);
        let y2 = Math.floor(Math.random() * height);
        walls[i] = new boundary(x1, y1, x2, y2);
    }
}


function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let wall of walls) {
        wall.draw();
        if (mousePos != undefined) {
            p.position.x = mousePos.x;
            p.position.y = mousePos.y;
            p.update();
            p.look(walls);
        }
    }

}


canvas.addEventListener('mousemove', function (evt) {
    mousePos = getMousePos(canvas, evt);
})

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}