import React from 'react'

import ControlBar from './ImageEditorControlBar'
import TileSVG from './TileSVG'
import {CONNECTIONS} from '../../TileInfo'

import styles from '../../styles/ImageEditor/ImageEditor.module.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeConnection: CONNECTIONS.TOP_RIGHT
    }

    this.handleControlBarValueChange = this.handleControlBarValueChange.bind(this)
  }

  handleControlBarValueChange(changeObj) {
    this.setState(changeObj)
  }

  render() {
    const {activeConnection} = this.state
    return (
      <div className={styles.ImageEditor}>
        <div className={styles.ControlBarContainer}>
          <ControlBar
            activeConnection={activeConnection}
            onValueChange={this.handleControlBarValueChange}
          />
        </div>
        <div className={styles.ImageCanvasContainer}>
          <TileSVG activeConnection={activeConnection} />
        </div>
      </div>
  )
}
}