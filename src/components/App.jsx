import React from 'react'

import ControlBar from './ControlBar'
import Map from './Map'

import styles from '../styles/App.module.scss'

export default function({atlas}) {
  return (
    <div className={styles.App}>
      <div className={styles.ControlBarContainer}>
        <ControlBar />
      </div>
      <div className={styles.MapContainer}>
        <Map atlas={atlas} />
      </div>
    </div>
  )
}