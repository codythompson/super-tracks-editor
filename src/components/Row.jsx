import React from 'react'

import Tile from './Tile'

import styles from '../styles/Row.module.scss'

export default function({rowTiles}) {
  return (
    <div className={styles.Row}>
      {
        rowTiles.map((tileInfo, i) => <Tile key={`i${i}`} tileInfo={tileInfo}/>)
      }
    </div>
  )
}