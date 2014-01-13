function draw(){
    canvas.clearRect(
        0,
        0,
        width,
        height
    );

    canvas.strokeStyle = '#fff';

    // if mouse down, draw current box
    if(mouse_down === 1){
        canvas.beginPath();
        canvas.rect(
            mouse_lock_x,
            mouse_lock_y,
            mouse_x - mouse_lock_x,
            mouse_y - mouse_lock_y
        );
        canvas.closePath();
        canvas.stroke();
    }

    // draw saved boxes
    i = boxen.length - 1;
    if(i >= 0){
        do{
            canvas.beginPath();
            canvas.rect(
                boxen[i][0],
                boxen[i][1],
                boxen[i][2],
                boxen[i][3]
            );
            canvas.closePath();
            canvas.stroke();
        }while(i--);
    }

    canvas.font = '23pt sans-serif';
    canvas.textAlign = 'center';
    canvas.fillStyle = '#fff';
    canvas.fillText(
        'Click + Drag! ESC = Clear',
        width / 2,
        50
    );
}

function get(i){
    return document.getElementById(i);
}

function resize(){
    width = window.innerWidth;
    get('canvas').width = width;
    get('canvas').width = width;

    height = window.innerHeight;
    get('canvas').height = height;
    get('canvas').height = height;

    draw();
}

var boxen = [];
var canvas = get('canvas').getContext('2d');
var height = 0;
var i = 0;
var mouse_down = 0;
var mouse_lock_x = -1;
var mouse_lock_y = -1;
var mouse_x = 0;
var mouse_y = 0;
var width = 0;

resize();

window.onkeydown = function(e){
    i = window.event ? event : e;

    if((i.charCode ? i.charCode : i.keyCode) === 27){// ESC
        // delete all boxes
        boxen = [];

        draw();
    }
};

window.onmousedown = function(e){
    e.preventDefault();
    if(e.button === 0){// Left Click
        mouse_down = 1;

        mouse_x = e.pageX;
        mouse_y = e.pageY;

        mouse_lock_x = mouse_x;
        mouse_lock_y = mouse_y;
    }
};

window.onmousemove = function(e){
    // if mouse is down, update current box
    if(mouse_down > 0){
        mouse_x = e.pageX;
        mouse_y = e.pageY;

        draw();
    }
};

window.onmouseup = function(){
    mouse_down = 0;
    if(mouse_x - mouse_lock_x != 0 || mouse_y - mouse_lock_y != 0){
        // add current box to array of boxes
        boxen.push([
            mouse_lock_x,// top left x
            mouse_lock_y,// top left y
            mouse_x - mouse_lock_x,// width
            mouse_y - mouse_lock_y// height
        ]);
    }
};

window.onresize = resize;
