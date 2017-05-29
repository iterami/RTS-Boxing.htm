'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(core_input_mouse['down']){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            {
              'type': 'rect',
              'radius': core_input_mouse['x'] - core_input_mouse['down-x'], //x2
              'startAngle': core_input_mouse['y'] - core_input_mouse['down-y'], //y2
              'x': core_input_mouse['down-x'],
              'y': core_input_mouse['down-y'],
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

function repo_init(){
    core_input_binds_add({
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
                'height': core_input_mouse['y'] - core_input_mouse['down-y'],
                'width': core_input_mouse['x'] - core_input_mouse['down-x'],
                'x': core_input_mouse['down-x'],
                'y': core_input_mouse['down-y'],
              });
          },
        },
      },
    });
    canvas_init();
}

function resize_logic(){
    canvas_buffer.fillStyle = '#fff';
    canvas_buffer.strokeStyle = '#fff';
}

var boxen = [];
