'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(mouse['down']){
        buffer.beginPath();
        buffer.rect(
          mouse['down-x'],
          mouse['down-y'],
          mouse['x'] - mouse['down-x'],
          mouse['y'] - mouse['down-y']
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

window.onload = function(e){
    init_canvas();
    init_input(
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
              if(!mouse['down']){
                  return;
              }
              draw();
          },
        },
        'mouseup': {
          'todo': function(){
              boxen.push({
                'height': mouse['y'] - mouse['down-y'],
                'width': mouse['x'] - mouse['down-x'],
                'x': mouse['down-x'],
                'y': mouse['down-y'],
              });
              draw();
          },
        },
      }
    );
};
