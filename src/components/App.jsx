import React from 'react'
import classnames from 'classnames'

import EditModes from '../EditModes'
import Atlas from '../Atlas'
// import MapState from '../MapState'
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
      atlas: atlas.getStateObject(),
      controlBarVisible: true,
      editMode: EditModes.SWITCHES,
      hoverTile: null
    }
    this.atlas = atlas

    this.handleControlBarToggle = this.handleControlBarToggle.bind(this)
    this.handleEditModeSwitch = this.handleEditModeSwitch.bind(this)
    this.handleTileClick = this.handleTileClick.bind(this)
    this.handleTileEnter = this.handleTileEnter.bind(this)
  }

  toggleSwitch(tileInfo) {
    if (tileInfo.exitPairs.length > 1) {
      const clone = tileInfo.clone()
      clone.activeExitIndex = (clone.activeExitIndex+1)%clone.exitPairs.length
      atlas.set(clone, tileInfo.i, tileInfo.j)
    }
    this.setState({atlas: atlas.getStateObject()})
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

  handleTileClick(tileInfo) {
    switch(this.state.editMode) {
      case EditModes.SWITCHES:
        this.toggleSwitch(tileInfo)
    }
  }

  handleTileEnter(tileInfo) {
    this.setState({hoverTile: tileInfo})
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
    const {atlas, editMode, hoverTile, controlBarVisible} = this.state
    return (
      <div className={styles.App}>
        {this.renderControlBar()}
        <div className={classnames(styles.MapContainer, {[styles.ControlBarHidden]: !controlBarVisible})}>
          <Map
            atlas={atlas}
            editMode={editMode}
            hoverTile={hoverTile}
            controlBarVisible={controlBarVisible}
            onControlBarToggle={this.handleControlBarToggle}
            onTileClick={this.handleTileClick}
            onTileEnter={this.handleTileEnter}/>
        </div>
      </div>
    )
  }
}