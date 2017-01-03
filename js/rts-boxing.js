'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(input_mouse['down']){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            {
              'type': 'rect',
              'radius': input_mouse['x'] - input_mouse['down-x'], //x2
              'startAngle': input_mouse['y'] - input_mouse['down-y'], //y2
              'x': input_mouse['down-x'],
              'y': input_mouse['down-y'],
            },
          ],
        });
    }

    // Draw saved boxen.
    for(var box in boxen){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            {
              'type': 'rect',
              'radius': boxen[box]['width'], //x2
              'startAngle': boxen[box]['height'], //y2
              'x': boxen[box]['x'],
              'y': boxen[box]['y'],
            },
          ],
        });
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
}

var boxen = [];

window.onload = function(e){
    canvas_init();
    input_init({
      'keybinds': {
        27: {
          'todo': function(){
              boxen = [];
          },
        },
      },
      'mousebinds': {
        'mouseup': {
          'todo': function(){
              boxen.push({
                'height': input_mouse['y'] - input_mouse['down-y'],
                'width': input_mouse['x'] - input_mouse['down-x'],
                'x': input_mouse['down-x'],
                'y': input_mouse['down-y'],
              });
          },
        },
      },
    });
};
