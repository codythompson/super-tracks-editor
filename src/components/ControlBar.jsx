import React from 'react'

import styles from '../styles/ControlBar.module.scss'

// TODO: editMode prop
export default function({}) {
  return (
    <div className={styles.ControlBar}>
      <button>Import Export</button>
      <div className={styles.ModeSelector}>
        <button className={styles.Selected}>Toggle Switches</button>
        <button>Place Track</button>
        <button>Delete Track</button>
      </div>
    </div>
  )
}