import React from 'react'

import Tile from './Tile'
import Modes from '../EditModes'

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

function getDeletingTileInfo (rowDeletingTiles, i) {
  const tileInfo = rowDeletingTiles[i]
  return tileInfo.exitPairs.length > 0? tileInfo : null
}

function tileIsSelected(tileInfo, editMode, selectedTile) {
  if (editMode === Modes.SWITCHES) {
    return tileInfo.exitPairs.length > 1
  } else {
    return selectedTile !== null && tileInfo.i === selectedTile.i && tileInfo.j === selectedTile.j
  }
}

export default function({rowTiles, rowNewTiles, rowDeletingTiles, hoverTile=null, selectedTile=null, editMode, onTileClick, onTileEnter}) {
  return (
    <div className={styles.Row}>
      {
        rowTiles.map((tileInfo, i) => (
          <Tile
            key={`i${i}`}
            tileInfo={tileInfo}
            newTileInfo={getNewTileInfo(rowNewTiles, i)}
            deletingTileInfo={getDeletingTileInfo(rowDeletingTiles, i)}
            isHighlighted={hoverTile?hoverTile.i === tileInfo.i && hoverTile.j === tileInfo.j : false}
            isSelected={tileIsSelected(tileInfo, editMode, selectedTile)}
            onClick={makeTileHandler(tileInfo, onTileClick)}
            onMouseEnter={makeTileHandler(tileInfo, onTileEnter)}/>
        ))
      }
    </div>
  )
}