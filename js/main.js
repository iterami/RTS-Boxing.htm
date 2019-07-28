'use strict';

function draw_logic(){
    // If mouse down, draw current unsaved box.
    if(core_mouse['down-0']){
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

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_draw_path({
            'style': 'stroke',
            'vertices': [
              {
                'type': 'rect',
                'radius': entity_entities[entity]['width'],
                'startAngle': entity_entities[entity]['height'],
                'x': entity_entities[entity]['x'],
                'y': entity_entities[entity]['y'],
              },
            ],
          });
      },
    });
}

function repo_init(){
    core_repo_init({
      'events': {
        'clear': {
          'onclick': canvas_setmode,
        },
      },
      'info': '<input id=clear type=button value="Clear Boxen"> Click + Drag',
      'mousebinds': {
        'mouseup': {
          'todo': function(){
              if(core_menu_open){
                  return;
              }

              entity_create({
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
