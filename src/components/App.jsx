import React from 'react'
import classnames from 'classnames'

import EditModes from '../EditModes'
import Atlas from '../Atlas'
import { CONNECTIONS } from '../TileInfo';
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
    this.atlas = atlas
    this.newAtlas = new Atlas(this.atlas.columns, this.atlas.rows)
    this.newAtlas.fill()
    this.placeTileIsOn = false
    this.lastLastEnter = null

    this.state = {
      atlas: atlas.getStateObject(),
      newAtlas: this.newAtlas.getStateObject(),
      controlBarVisible: true,
      editMode: EditModes.SWITCHES,
      hoverTile: null
    }

    this.handleControlBarToggle = this.handleControlBarToggle.bind(this)
    this.handleEditModeSwitch = this.handleEditModeSwitch.bind(this)
    this.handleTileClick = this.handleTileClick.bind(this)
    this.handleTileEnter = this.handleTileEnter.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  toggleSwitch(tileInfo) {
    if (tileInfo.exitPairs.length > 1) {
      const clone = tileInfo.clone()
      clone.activeExitIndex = (clone.activeExitIndex+1)%clone.exitPairs.length
      atlas.set(clone, tileInfo.i, tileInfo.j)
    }
    this.setState({atlas: atlas.getStateObject()})
  }

  placeNewTrack(enteredTileInfo) {
    let lastInfo = this.state.hoverTile
    lastInfo = this.newAtlas.get(lastInfo.i, lastInfo.j)
    const {i, j} = enteredTileInfo
    let incoming = CONNECTIONS.NONE
    let outgoing = CONNECTIONS.NONE
    if (lastInfo.i < i) {
      incoming = CONNECTIONS.LEFT
      outgoing = CONNECTIONS.RIGHT
    } else if (lastInfo.i > i) {
      incoming = CONNECTIONS.RIGHT
      outgoing = CONNECTIONS.LEFT
    } else if (lastInfo.j < j) {
      incoming = CONNECTIONS.TOP
      outgoing = CONNECTIONS.BOTTOM
    } else {
      incoming = CONNECTIONS.BOTTOM
      outgoing = CONNECTIONS.TOP
    }
    if (lastInfo.exitPairs.length > 0 && this.lastLastEnter !== null) {
      let lastIncoming = CONNECTIONS.NONE
      if (this.lastLastEnter.i < lastInfo.i) {
        lastIncoming = CONNECTIONS.LEFT
      } else if (this.lastLastEnter.i > lastInfo.i) {
        lastIncoming = CONNECTIONS.RIGHT
      } else if (this.lastLastEnter.j < lastInfo.j) {
        lastIncoming = CONNECTIONS.TOP
      } else {
        lastIncoming = CONNECTIONS.BOTTOM
      }
      lastInfo = lastInfo.clone()
      lastInfo.replaceLast(lastIncoming | outgoing)
      this.newAtlas.set(lastInfo, lastInfo.i, lastInfo.j)
    }
    this.lastLastEnter = lastInfo
    outgoing = CONNECTIONS.RIGHT
    const newInfo = this.newAtlas.get(i, j).clone()
    newInfo.addExitPair(incoming | outgoing)
    this.newAtlas.set(newInfo, i, j)
    this.setState({newAtlas: this.newAtlas.getStateObject()})
  }

  savePlacedTrack() {

  }

  handleSaveClick() {
    switch(this.state.editMode) {
      case EditModes.PLACE:
        
        break;
    }
  }

  handleControlBarToggle() {
    this.setState({
      controlBarVisible: !this.state.controlBarVisible
    })
  }

  handleEditModeSwitch (newMode) {
    this.placeTileIsOn = false
    this.lastLastEnter = null
    this.setState({
      editMode: newMode
    })
  }

  handleTileClick(tileInfo) {
    switch(this.state.editMode) {
      case EditModes.SWITCHES:
        this.toggleSwitch(tileInfo)
        break
      case EditModes.PLACE:
        this.placeTileIsOn = !this.placeTileIsOn
        break
    }
  }

  handleTileEnter(tileInfo) {
    switch(this.state.editMode) {
      case EditModes.PLACE:
        if (this.placeTileIsOn) this.placeNewTrack(tileInfo)
        break
    }
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
    const {atlas, newAtlas, editMode, hoverTile, controlBarVisible} = this.state
    return (
      <div className={styles.App}>
        {this.renderControlBar()}
        <div className={classnames(styles.MapContainer, {[styles.ControlBarHidden]: !controlBarVisible})}>
          <Map
            atlas={atlas}
            newAtlas={newAtlas}
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