import React from 'react'

import Tile from './Tile'

import styles from '../styles/Row.module.scss'

function makeTileHandler (tileInfo, callback) {
  return function() {
    callback(tileInfo)
  }
}

export default function({rowTiles, onTileClick, onTileEnter}) {
  return (
    <div className={styles.Row}>
      {
        rowTiles.map((tileInfo, i) => (
          <Tile
            key={`i${i}`}
            tileInfo={tileInfo}
            onClick={makeTileHandler(tileInfo, onTileClick)}
            onMouseEnter={makeTileHandler(tileInfo, onTileEnter)}/>
        ))
      }
    </div>
  )
}