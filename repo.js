'use strict';

function repo_drawlogic(){
    if(core_mouse['down-0']){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            [
              'rect',
              core_mouse['down-x'],
              core_mouse['down-y'],
              core_mouse['x'] - core_mouse['down-x'],
              core_mouse['y'] - core_mouse['down-y'],
            ],
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
              [
                'rect',
                entity['x'],
                entity['y'],
                entity['width'],
                entity['height'],
              ],
            ],
          });
      },
    });
}

function repo_init(){
    core_repo_init({
      'events': {
        'clear': {
          'onclick': core_repo_reset,
        },
      },
      'info': '<button id=clear type=button>Clear Boxen</button> Click + Drag',
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
      'reset': canvas_setmode,
      'title': 'RTS-Boxing.htm',
    });
    canvas_init();
}
