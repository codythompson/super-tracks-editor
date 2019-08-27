import React from 'react'
import classnames from 'classnames'

import EditModes from '../EditModes'
import Atlas from '../Atlas'
import ControlBar from './ControlBar'
import Map from './Map'
import styles from '../styles/App.module.scss'

// remove me
import { level_1 as atlasData } from '../../test_data/test_atlasses'

const atlas = Atlas.parseAtlasContent(atlasData)
global.atlas = atlas

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      atlas,
      controlBarVisible: true,
      editMode: EditModes.SWITCHES
    }
    this.controlBarWidth = null

    this.handleControlBarToggle = this.handleControlBarToggle.bind(this)
    this.handleEditModeSwitch = this.handleEditModeSwitch.bind(this)
  }

  handleControlBarToggle() {
    this.setState({
      controlBarVisible: !this.state.controlBarVisible
    })
  }

  handleEditModeSwitch (newMode) {
    this.setState({
      editMode: newMode
    })
  }

  renderControlBar() {
    if (this.state.controlBarVisible) {
      const { editMode } = this.state
      return (
        <div className={styles.ControlBarContainer}>
          <ControlBar editMode={editMode} onModeChange={this.handleEditModeSwitch} />
        </div>
      )
    }
  }

  render() {
    const {atlas, controlBarVisible} = this.state
    return (
      <div className={styles.App}>
        {this.renderControlBar()}
        <div className={classnames(styles.MapContainer, {[styles.ControlBarHidden]: !controlBarVisible})}>
          <Map atlas={atlas} controlBarVisible={controlBarVisible} onControlBarToggle={this.handleControlBarToggle} />
        </div>
      </div>
    )
  }
}