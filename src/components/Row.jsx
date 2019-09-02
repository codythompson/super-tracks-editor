import React from 'react'

import Tile from './Tile'

import styles from '../styles/Row.module.scss'

function makeTileHandler (tileInfo, callback) {
  return function() {
    callback(tileInfo)
  }
}

function getNewTileInfo (rowNewTiles, i) {
  const tileInfo = rowNewTiles[i]
  return tileInfo.exitPairs.length > 0? tileInfo : null
}

export default function({rowTiles, rowNewTiles, editMode, hoverTile=null, onTileClick, onTileEnter}) {
  return (
    <div className={styles.Row}>
      {
        rowTiles.map((tileInfo, i) => (
          <Tile
            key={`i${i}`}
            tileInfo={tileInfo}
            newTileInfo={getNewTileInfo(rowNewTiles, i)}
            editMode={editMode}
            isHighlighted={hoverTile?hoverTile.i === tileInfo.i && hoverTile.j === tileInfo.j : false}
            onClick={makeTileHandler(tileInfo, onTileClick)}
            onMouseEnter={makeTileHandler(tileInfo, onTileEnter)}/>
        ))
      }
    </div>
  )
}