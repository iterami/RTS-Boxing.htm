'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(core_mouse['down']){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            {
              'type': 'rect',
              'radius': core_mouse['x'] - core_mouse['down-x'],
              'startAngle': core_mouse['y'] - core_mouse['down-y'],
              'x': core_mouse['down-x'],
              'y': core_mouse['down-y'],
            },
          ],
        });
    }

    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_draw_path({
            'style': 'stroke',
            'vertices': [
              {
                'type': 'rect',
                'radius': core_entities[entity]['width'],
                'startAngle': core_entities[entity]['height'],
                'x': core_entities[entity]['x'],
                'y': core_entities[entity]['y'],
              },
            ],
          });
      },
    });
}

function repo_init(){
    core_repo_init({
      'info': '<input id=clear type=button value="Clear Boxen"> Click + Drag',
      'info-events': {
        'clear': {
          'todo': canvas_setmode,
          'type': 'onclick',
        },
      },
      'mousebinds': {
        'mouseup': {
          'todo': function(){
              core_entity_create({
                'properties': {
                  'height': core_mouse['y'] - core_mouse['down-y'],
                  'width': core_mouse['x'] - core_mouse['down-x'],
                  'x': core_mouse['down-x'],
                  'y': core_mouse['down-y'],
                },
              });
          },
        },
      },
      'title': 'RTS-Boxing.htm',
    });
    canvas_init();
}
