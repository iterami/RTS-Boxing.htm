'use strict';

function draw_box(entity){
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
}

function repo_drawlogic(){
    if(core_pointer.down_0){
        canvas_draw_path({
          'style': 'stroke',
          'vertices': [
            [
              'rect',
              core_pointer.down_x,
              core_pointer.down_y,
              core_pointer.x - core_pointer.down_x,
              core_pointer.y - core_pointer.down_y,
            ],
          ],
        });
    }

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': draw_box,
    });
}

function repo_init(){
    core_repo_init({
      'events': {
        'clear': {
          'onclick': canvas_setmode,
        },
      },
      'pointerbinds': {
        'pointerup': {
          'todo': function(){
              if(core_menu_open){
                  return;
              }

              entity_create({
                'properties': {
                  'height': core_pointer.y - core_pointer.down_y,
                  'width': core_pointer.x - core_pointer.down_x,
                  'x': core_pointer.down_x,
                  'y': core_pointer.down_y,
                },
              });
          },
        },
      },
      'title': 'RTS-Boxing.htm',
      'ui': '<button id=clear type=button>Clear</button>',
    });
    canvas_init();
}
