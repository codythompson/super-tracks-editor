import React from 'react'

import Tile from './Tile'

export default function({rowTiles}) {
  return (
    <div>
      {
        rowTiles.map((tileInfo, i) => <Tile key={i} tileInfo={tileInfo}/>)
      }
    </div>
  )
}