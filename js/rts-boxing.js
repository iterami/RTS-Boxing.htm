'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(input_mouse['down']){
        buffer.beginPath();
        buffer.rect(
          input_mouse['down-x'],
          input_mouse['down-y'],
          input_mouse['x'] - input_mouse['down-x'],
          input_mouse['y'] - input_mouse['down-y']
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

window.onload = function(e){
    init_canvas();
    input_init(
      {
        27: {
          'todo': function(){
              boxen = [];
              draw();
          },
        },
      },
      {
        'mousemove': {
          'todo': function(){
              if(!input_mouse['down']){
                  return;
              }
              draw();
          },
        },
        'mouseup': {
          'todo': function(){
              boxen.push({
                'height': input_mouse['y'] - input_mouse['down-y'],
                'width': input_mouse['x'] - input_mouse['down-x'],
                'x': input_mouse['down-x'],
                'y': input_mouse['down-y'],
              });
              draw();
          },
        },
      }
    );
};
