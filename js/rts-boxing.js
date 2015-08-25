'use strict';

function draw(){
    canvas.clearRect(
      0,
      0,
      width,
      height
    );

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

    // Draw saved boxen.
    for(var box in boxen){
        canvas.beginPath();
        canvas.rect(
          boxen[box]['x'],
          boxen[box]['y'],
          boxen[box]['width'],
          boxen[box]['height']
        );
        canvas.closePath();
        canvas.stroke();
    }

    canvas.font = '23pt sans-serif';
    canvas.fillText(
      'Click + Drag! ESC = Clear! '
        + boxen.length + '!',
      5,
      25
    );
}

function resize(){
    height = window.innerHeight;
    document.getElementById('canvas').height = height;

    width = window.innerWidth;
    document.getElementById('canvas').width = width;

    canvas.fillStyle = '#fff';
    canvas.strokeStyle = '#fff';
    draw();
}

var boxen = [];
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
var height = 0;
var mouse_down = false;
var mouse_lock_x = -1;
var mouse_lock_y = -1;
var mouse_x = 0;
var mouse_y = 0;
var width = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: delete saved boxen.
    if(key === 27){
        boxen = [];
        draw();
    }
};

window.onload = resize;

window.onmousedown =
  window.ontouchstart = function(e){
    // Only handle left clicks.
    if(e.button !== 0){
        return;
    }

    e.preventDefault();

    mouse_down = true;
    mouse_x = e.pageX;
    mouse_y = e.pageY;

    mouse_lock_x = mouse_x;
    mouse_lock_y = mouse_y;
};

window.onmousemove =
  window.ontouchmove = function(e){
    if(!mouse_down){
        return;
    }

    mouse_x = e.pageX;
    mouse_y = e.pageY;

    draw();
};

window.onmouseup =
  window.ontouchcancel =
  window.ontouchend = function(){
    mouse_down = false;

    if(mouse_x - mouse_lock_x === 0
      && mouse_y - mouse_lock_y === 0){
        return;
    }

    boxen.push({
      'height': mouse_y - mouse_lock_y,
      'width': mouse_x - mouse_lock_x,
      'x': mouse_lock_x,
      'y': mouse_lock_y,
    });

    mouse_lock_x = 0;
    mouse_lock_y = 0;
    mouse_x = 0;
    mouse_y = 0;

    draw();
};

window.onresize = resize;
