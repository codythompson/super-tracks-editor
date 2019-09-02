import React from 'react'

import Tile from './Tile'

import styles from '../styles/Row.module.scss'
// REMOVE ME
import TileInfo from '../TileInfo';

function makeTileHandler (tileInfo, callback) {
  return function() {
    callback(tileInfo)
  }
}

export default function({rowTiles, editMode, hoverTile=null, onTileClick, onTileEnter}) {
  const fakeRemoveMe = new TileInfo(1, rowTiles[0].j)
  fakeRemoveMe.addExitPair(10)
  return (
    <div className={styles.Row}>
      {
        rowTiles.map((tileInfo, i) => (
          <Tile
            key={`i${i}`}
            tileInfo={tileInfo}
            newTileInfo={i==1 && fakeRemoveMe || null}
            editMode={editMode}
            isHighlighted={hoverTile?hoverTile.i === tileInfo.i && hoverTile.j === tileInfo.j : false}
            onClick={makeTileHandler(tileInfo, onTileClick)}
            onMouseEnter={makeTileHandler(tileInfo, onTileEnter)}/>
        ))
      }
    </div>
  )
}