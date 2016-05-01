'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(mouse_down){
        buffer.beginPath();
        buffer.rect(
          mouse_lock_x,
          mouse_lock_y,
          mouse_x - mouse_lock_x,
          mouse_y - mouse_lock_y
        );
        buffer.closePath();
        buffer.stroke();
    }

    // Draw saved boxen.
    for(var box in boxen){
        buffer.beginPath();
        buffer.rect(
          boxen[box]['x'],
          boxen[box]['y'],
          boxen[box]['width'],
          boxen[box]['height']
        );
        buffer.closePath();
        buffer.stroke();
    }

    buffer.font = '23pt sans-serif';
    buffer.fillText(
      'Click + Drag! ESC = Clear! '
        + boxen.length + '!',
      5,
      25
    );
}

function resize_logic(){
    buffer.fillStyle = '#fff';
    buffer.strokeStyle = '#fff';
    draw();
}

var boxen = [];
var mouse_down = false;
var mouse_lock_x = -1;
var mouse_lock_y = -1;
var mouse_x = 0;
var mouse_y = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: delete saved boxen.
    if(key === 27){
        boxen = [];
        draw();
    }
};

window.onload = init_canvas;

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
