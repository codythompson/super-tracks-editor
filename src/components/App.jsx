import React from 'react'
import classnames from 'classnames'

import EditModes from '../EditModes'
import Atlas from '../Atlas'
import TileInfo, { CONNECTIONS } from '../TileInfo';
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
    this.deletingAtlas = new Atlas(this.atlas.columns, this.atlas.rows)
    this.deletingAtlas.fill()
    this.placeTileIsOn = false
    this.lastLastEnter = null

    this.state = {
      atlas: atlas.getStateObject(),
      newAtlas: this.newAtlas.getStateObject(),
      deletingAtlas: this.deletingAtlas.getStateObject(),
      controlBarVisible: true,
      editMode: EditModes.SWITCHES,
      hoverTile: null,
      selectedTile: null
    }

    this.handleControlBarToggle = this.handleControlBarToggle.bind(this)
    this.handleEditModeSwitch = this.handleEditModeSwitch.bind(this)
    this.handleTileClick = this.handleTileClick.bind(this)
    this.handleTileEnter = this.handleTileEnter.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.placeNewTrack = this.placeNewTrack.bind(this)
    this.addToDeleting = this.addToDeleting.bind(this)
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
      if (lastIncoming !== outgoing) {
        lastInfo = lastInfo.clone()
        lastInfo.replaceLast(lastIncoming | outgoing)
        this.newAtlas.set(lastInfo, lastInfo.i, lastInfo.j)
      }
    }
    this.lastLastEnter = lastInfo
    const newInfo = this.newAtlas.get(i, j).clone()
    newInfo.addExitPair(incoming | outgoing)
    this.newAtlas.set(newInfo, i, j)
    this.setState({newAtlas: this.newAtlas.getStateObject()})
  }

  savePlacedTrack() {
    this.atlas.mergeInPlace(this.newAtlas)
    this.newAtlas.fill()
    this.placeTileIsOn = false
    this.lastLastEnter = null
    this.setState({atlas: this.atlas.getStateObject(), newAtlas: this.newAtlas.getStateObject()})
  }

  addToDeleting(enteredTileInfo) {
    const deletingInfo = this.atlas.get(enteredTileInfo.i, enteredTileInfo.j).clone()
    this.deletingAtlas.set(deletingInfo, deletingInfo.i, deletingInfo.j)
    this.setState({deletingAtlas: this.deletingAtlas.getStateObject()})
  }

  deleteSelectedTrack() {
    this.atlas.mapRows((row, j) => {
      row.forEach((tileInfo, i) => {
        if (this.deletingAtlas.get(i,j).exitPairs.length > 0) {
          this.atlas.set(new TileInfo(i,j), i, j)
        }
      })
    })
    this.deletingAtlas.fill()
    this.placeTileIsOn = false
    this.setState({atlas: this.atlas.getStateObject(), deletingAtlas: this.deletingAtlas.getStateObject()})
  }

  handleSaveClick() {
    switch(this.state.editMode) {
      case EditModes.PLACE:
        this.savePlacedTrack()
        break;
      case EditModes.DELETE:
        this.deleteSelectedTrack()
        break;
    }
  }

  handleCancelClick() {
    switch(this.state.editMode) {
      case EditModes.PLACE:
        this.newAtlas.fill()
        this.placeTileIsOn = false
        this.lastLastEnter = null
        this.setState({newAtlas: this.newAtlas.getStateObject()})
        break;
      case EditModes.DELETE:
        this.deletingAtlas.fill()
        this.placeTileIsOn = false
        this.setState({deletingAtlas: this.deletingAtlas.getStateObject()})
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
    this.deletingAtlas.reset()
    this.setState({
      deletingAtlas: this.deletingAtlas.getStateObject(),
      editMode: newMode
    })
  }

  handleTileInteraction(tileInfo, interactionFunc) {
    if (this.placeTileIsOn) {
      interactionFunc(tileInfo)
      this.setState({selectedTile: tileInfo})
    } else {
      this.setState({selectedTile: null})
    }
  }

  handleTileClick(tileInfo) {
    switch(this.state.editMode) {
      case EditModes.SWITCHES:
        this.toggleSwitch(tileInfo)
        break
      case EditModes.PLACE:
        this.placeTileIsOn = !this.placeTileIsOn
        this.handleTileInteraction(tileInfo, this.placeNewTrack)
        break;
      case EditModes.DELETE:
        this.placeTileIsOn = !this.placeTileIsOn
        this.handleTileInteraction(tileInfo, this.addToDeleting)
        break
    }
  }

  handleTileEnter(tileInfo) {
    switch(this.state.editMode) {
      case EditModes.PLACE:
        this.handleTileInteraction(tileInfo, this.placeNewTrack)
        break
      case EditModes.DELETE:
        this.handleTileInteraction(tileInfo, this.addToDeleting)
        break;
    }
    this.setState({hoverTile: tileInfo})
  }

  renderControlBar() {
    if (this.state.controlBarVisible) {
      const { editMode } = this.state
      return (
        <div className={styles.ControlBarContainer}>
          <ControlBar
            editMode={editMode}
            onModeChange={this.handleEditModeSwitch}
            onSave={this.handleSaveClick}
            onCancel={this.handleCancelClick}/>
        </div>
      )
    }
  }

  render() {
    const {atlas, newAtlas, deletingAtlas, editMode, hoverTile, selectedTile, controlBarVisible} = this.state
    return (
      <div className={styles.App}>
        {this.renderControlBar()}
        <div className={classnames(styles.MapContainer, {[styles.ControlBarHidden]: !controlBarVisible})}>
          <Map
            atlas={atlas}
            newAtlas={newAtlas}
            deletingAtlas={deletingAtlas}
            editMode={editMode}
            hoverTile={hoverTile}
            selectedTile={selectedTile}
            controlBarVisible={controlBarVisible}
            onControlBarToggle={this.handleControlBarToggle}
            onTileClick={this.handleTileClick}
            onTileEnter={this.handleTileEnter}/>
        </div>
      </div>
    )
  }
}