import React from 'react'

import Row from './Row'

export default function({tileRows}) {
  return (
    <div>
      {
        tileRows.map((rowTiles, i) => <Row key={i} rowTiles={rowTiles}/>)
      }
    </div>
  )
}