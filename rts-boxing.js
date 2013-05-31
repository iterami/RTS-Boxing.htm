function draw(){
    buffer.clearRect(
        0,
        0,
        get('buffer').width,
        get('buffer').height
    );

    buffer.strokeStyle = '#fff';

    /*if mouse down, draw current box*/
    if(mouse_down === 1){
        buffer.beginPath();
        buffer.rect(
            mouse_lock_x,
            mouse_lock_y,
            mouse_x - mouse_lock_x,
            mouse_y - mouse_lock_y
        );
        buffer.closePath();
        buffer.stroke()
    }

    /*draw saved boxes*/
    i = boxen.length-1;
    if(i >= 0){
        do{
            buffer.beginPath();
            buffer.rect(
                boxen[i][0],
                boxen[i][1],
                boxen[i][2],
                boxen[i][3]
            );
            buffer.closePath();
            buffer.stroke()
        }while(i--)
    }

    buffer.font = '23pt sans-serif';
    buffer.textAlign = 'center';
    buffer.fillStyle = '#fff';
    buffer.fillText(
        'Click+Drag! ESC=clear',
        x,
        50
    );

    canvas.clearRect(
        0,
        0,
        get('canvas').width,
        get('canvas').height
    );
    canvas.drawImage(
        get('buffer'),
        0,
        0
    )
}

function get(i){
    return document.getElementById(i)
}

function resize(){
    get('buffer').width = get('canvas').width = window.innerWidth;
    get('buffer').height = get('canvas').height = window.innerHeight;

    x = get('canvas').width / 2;
    y = get('canvas').height / 2
}

var boxen = [];
var buffer = get('buffer').getContext('2d');
var canvas = get('canvas').getContext('2d');
var i = 0;
var mouse_down = 0;
var mouse_lock_x = -1;
var mouse_lock_y = -1;
var mouse_x = 0;
var mouse_y = 0;
var x = 0;
var y = 0;

resize();

setInterval('draw()',30);

window.onkeydown = function(e){
    i = window.event ? event : e;
    i = i.charCode ? i.charCode : i.keyCode;

    if(i === 27){/*ESC*/
        /*delete all boxes*/
        boxen = []
    }
};

window.onmousedown = function(e){
    e.preventDefault();
    if(e.button === 0){/*Left Click*/
        mouse_down = 1;

        mouse_x = e.pageX;
        mouse_y = e.pageY;

        mouse_lock_x = mouse_x;
        mouse_lock_y = mouse_y
    }
};

window.onmousemove = function(e){
    /*if mouse is down, update current box*/
    if(mouse_down > 0){
        mouse_x = e.pageX;
        mouse_y = e.pageY
    }
};

window.onmouseup = function(){
    mouse_down = 0;
    if(mouse_x - mouse_lock_x != 0 || mouse_y - mouse_lock_y != 0){
        /*add current box to array of boxes*/
        boxen.push([
            mouse_lock_x,/*top left x*/
            mouse_lock_y,/*top left y*/
            mouse_x - mouse_lock_x,/*width*/
            mouse_y - mouse_lock_y/*height*/
        ])
    }
};

window.onresize = resize
