'use strict';

function draw_boxen(args){
    canvas_draw_path({
      'style': 'stroke',
      'vertices': [
        {
          'type': 'rect',
           'radius': args['radius'],
           'startAngle': args['startAngle'],
           'x': args['x'],
           'y': args['y'],
         },
      ],
    });
}

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(core_mouse['down']){
        draw_boxen({
          'radius': core_mouse['x'] - core_mouse['down-x'],
          'startAngle': core_mouse['y'] - core_mouse['down-y'],
          'x': core_mouse['down-x'],
          'y': core_mouse['down-y'],
        });
    }

    // Draw saved boxen.
    for(var box in boxen){
        draw_boxen({
          'radius': boxen[box]['width'],
          'startAngle': boxen[box]['height'],
          'x': boxen[box]['x'],
          'y': boxen[box]['y'],
        });
    }

    canvas_buffer.fillText(
      'Click + Drag! ESC = Clear! '
        + boxen.length + '!',
      5,
      25
    );
}

function repo_escape(){
    boxen = [];
}

function repo_init(){
    core_events_bind({
      'mousebinds': {
        'mouseup': {
          'todo': function(){
              boxen.push({
                'height': core_mouse['y'] - core_mouse['down-y'],
                'width': core_mouse['x'] - core_mouse['down-x'],
                'x': core_mouse['down-x'],
                'y': core_mouse['down-y'],
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
