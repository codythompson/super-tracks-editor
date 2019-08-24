import React from 'react'

import Row from './Row'
import TopBorder from './TopBorder'

import styles from '../styles/App.module.scss'

export default function({atlas}) {
  return (
    <div className={styles.App}>
      <TopBorder columnsWide={atlas.columns} />
      {
        atlas.mapRows((rowArray, j) => (<Row key={`j${j}`} rowTiles={rowArray} />))
      }
    </div>
  )
}