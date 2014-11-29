function draw(){
    canvas.clearRect(
      0,
      0,
      width,
      height
    );

    canvas.strokeStyle = '#fff';

    // If mouse down, draw current unsaved box.
    if(mouse_down){
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

    // Draw saved boxem.
    var loop_counter = boxen.length - 1;
    if(loop_counter >= 0){
        do{
            canvas.beginPath();
            canvas.rect(
              boxen[loop_counter][0],
              boxen[loop_counter][1],
              boxen[loop_counter][2],
              boxen[loop_counter][3]
            );
            canvas.closePath();
            canvas.stroke();
        }while(loop_counter--);
    }

    canvas.font = '23pt sans-serif';
    canvas.textAlign = 'center';
    canvas.fillStyle = '#fff';
    canvas.fillText(
      'Click + Drag! '
        + boxen.length + '!'
        + ' ESC = Clear',
      width / 2,
      50
    );
}

function resize(){
    height = window.innerHeight;
    document.getElementById('canvas').height = height;

    width = window.innerWidth;
    document.getElementById('canvas').width = width;

    draw();
}

var boxen = [];
var canvas = document.getElementById('canvas').getContext('2d');
var height = 0;
var mouse_down = false;
var mouse_lock_x = -1;
var mouse_lock_y = -1;
var mouse_x = 0;
var mouse_y = 0;
var width = 0;

resize();

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: delete saved boxen.
    if(key === 27){
        boxen = [];
        draw();
    }
};

window.onmousedown =
  window.ontouchstart = function(e){
    e.preventDefault();

    // Left Click: begin new unsaved box.
    if(e.button === 0){
        mouse_down = true;

        mouse_x = e.pageX;
        mouse_y = e.pageY;

        mouse_lock_x = mouse_x;
        mouse_lock_y = mouse_y;
    }
};

window.onmousemove =
  window.ontouchmove = function(e){
    // If mouse is down, update current unsaved box.
    if(mouse_down){
        mouse_x = e.pageX;
        mouse_y = e.pageY;

        draw();
    }
};

window.onmouseup =
  window.ontouchcancel =
  window.ontouchend = function(){
    mouse_down = false;

    if(mouse_x - mouse_lock_x != 0
      || mouse_y - mouse_lock_y != 0){
        // Add current box to array of saved boxen.
        boxen.push([
          mouse_lock_x,// X
          mouse_lock_y,// Y
          mouse_x - mouse_lock_x,// Width
          mouse_y - mouse_lock_y,// Height
        ]);

        draw();
    }
};

window.onresize = resize;
