'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(input_mouse['down']){
        canvas_buffer.beginPath();
        canvas_buffer.rect(
          input_mouse['down-x'],
          input_mouse['down-y'],
          input_mouse['x'] - input_mouse['down-x'],
          input_mouse['y'] - input_mouse['down-y']
        );
        canvas_buffer.closePath();
        canvas_buffer.stroke();
    }

    // Draw saved boxen.
    for(var box in boxen){
        canvas_buffer.beginPath();
        canvas_buffer.rect(
          boxen[box]['x'],
          boxen[box]['y'],
          boxen[box]['width'],
          boxen[box]['height']
        );
        canvas_buffer.closePath();
        canvas_buffer.stroke();
    }

    canvas_buffer.fillText(
      'Click + Drag! ESC = Clear! '
        + boxen.length + '!',
      5,
      25
    );
}

function resize_logic(){
    canvas_buffer.fillStyle = '#fff';
    canvas_buffer.strokeStyle = '#fff';
    canvas_draw();
}

var boxen = [];

window.onload = function(e){
    canvas_init();
    input_init(
      {
        27: {
          'todo': function(){
              boxen = [];
              canvas_draw();
          },
        },
      },
      {
        'mousemove': {
          'todo': function(){
              if(!input_mouse['down']){
                  return;
              }
              canvas_draw();
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
              canvas_draw();
          },
        },
      }
    );
};
