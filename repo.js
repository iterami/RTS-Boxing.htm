'use strict';

function repo_drawlogic(){
    if(core_pointer['down-0']){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            [
              'rect',
              core_pointer['down-x'],
              core_pointer['down-y'],
              core_pointer.x - core_pointer['down-x'],
              core_pointer.y - core_pointer['down-y'],
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
                entity.x,
                entity.y,
                entity.width,
                entity.height,
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
          'onclick': canvas_setmode,
        },
      },
      'info': '<button id=clear type=button>Clear Boxen</button> Click + Drag',
      'pointerbinds': {
        'pointerup': {
          'todo': function(){
              if(core_menu_open){
                  return;
              }

              entity_create({
                'properties': {
                  'height': core_pointer.y - core_pointer['down-y'],
                  'width': core_pointer.x - core_pointer['down-x'],
                  'x': core_pointer['down-x'],
                  'y': core_pointer['down-y'],
                },
              });
          },
        },
      },
      'title': 'RTS-Boxing.htm',
    });
    canvas_init();
}
