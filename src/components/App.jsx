import React from 'react'

import Row from './Row'

export default function({atlas}) {
  return (
    <div>
      {
        atlas.mapRows((rowArray, j) => (<Row key={`j${j}`} rowTiles={rowArray} />))
      }
    </div>
  )
}