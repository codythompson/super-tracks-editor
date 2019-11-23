import React from 'react'

import ControlBar from './ImageEditorControlBar'

import styles from '../../styles/ImageEditor/ImageEditor.module.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.ImageEditor}>
        <div className={styles.ControlBarContainer}>
          <ControlBar />
        </div>
      </div>
  )
}
}