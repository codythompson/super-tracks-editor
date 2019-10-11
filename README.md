# TODO

- !!! cleanup from scrolling optimization
    - setting map size to be much smaller (doesn't repro with just -1) crashes things
    - need to set --tiles-wide and --tiles-tall CSS props on mapsize change
- export
- edit single tile
- import

## nice to have / future
- scrolling/windowing implementation that uses dummy divs above,below,left, and right to take up the space of the un-rendered tiles.
- place track is a little wonky, make it less wonky
- add new mode that lets you do something like
    1. Select tiles
    2. Choose one of 
        - stroke track (with sub options like straight, linear, curved, etc.)
        - clear/delete track
- background image support? (unused center char)