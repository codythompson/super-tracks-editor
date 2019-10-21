import React from 'react'
import classnames from 'classnames'
import debounce from 'lodash/debounce'

import EditModes from '../EditModes'
import Atlas from '../Atlas'
import TileInfo, { CONNECTIONS } from '../TileInfo';
import Storage from '../Storage'
import ControlBar from './ControlBar'
import Map from './Map'
import DialogComponent from './Dialog'
import {DIALOG_TYPE as MAP_DIALOG_TYPE} from './Dialog/MapSize'
import {DIALOG_TYPE as EXPORT_DIALOG_TYPE} from './Dialog/Export'
import {DIALOG_TYPE as EDIT_TILE_DIALOG_TYPE} from './Dialog/EditTile'
import styles from '../styles/App.module.scss'

const STORAGE_WRITE_DEBOUNCE_TIME_MS = 500

export default class App extends React.Component {
  static loadAtlasFromStorage() {
    let atlas = Storage.readAtlas()
    if (!atlas) {
      const {width, height} = Storage.read().atlasDefaults
      atlas = new Atlas(width, height)
      atlas.fill()
    }
    return atlas
  }

  constructor(props) {
    super(props)
    this.atlas = App.loadAtlasFromStorage()
    this.newAtlas = new Atlas(this.atlas.columns, this.atlas.rows)
    this.newAtlas.fill()
    this.deletingAtlas = new Atlas(this.atlas.columns, this.atlas.rows)
    this.deletingAtlas.fill()
    this.placeTileIsOn = false
    this.lastLastEnter = null

    this.state = {
      atlas: this.atlas.getStateObject(),
      newAtlas: this.newAtlas.getStateObject(),
      deletingAtlas: this.deletingAtlas.getStateObject(),
      controlBarVisible: true,
      editMode: EditModes.TILE,
      hoverTile: null,
      selectedTile: null,
      activeDialog: null
    }

    this.saveAtlasToStorage = debounce(this.saveAtlasToStorage.bind(this), STORAGE_WRITE_DEBOUNCE_TIME_MS)

    this.handleControlBarToggle = this.handleControlBarToggle.bind(this)
    this.handleEditModeSwitch = this.handleEditModeSwitch.bind(this)
    this.handleTileClick = this.handleTileClick.bind(this)
    this.handleTileEnter = this.handleTileEnter.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleChangeMapSize = this.handleChangeMapSize.bind(this)
    this.handleDialogCancel = this.handleDialogCancel.bind(this)
    this.handleDialogConfirm = this.handleDialogConfirm.bind(this)
    this.placeNewTrack = this.placeNewTrack.bind(this)
    this.addToDeleting = this.addToDeleting.bind(this)
  }

  saveAtlasToStorage() {
    Storage.writeAtlas(this.atlas)
  }

  toggleSwitch(tileInfo) {
    if (tileInfo.exitPairs.length > 1) {
      const clone = tileInfo.clone()
      clone.activeExitIndex = (clone.activeExitIndex+1)%clone.exitPairs.length
      this.atlas.set(clone, tileInfo.i, tileInfo.j)
      this.setState({atlas: this.atlas.getStateObject()})
    }
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

  changeMapSize({newColumnsLeft, newColumnsRight, newRowsTop, newRowsBottom}) {
    this.atlas.addColumnsLeft(newColumnsLeft)
    this.newAtlas.addColumnsLeft(newColumnsLeft)
    this.deletingAtlas.addColumnsLeft(newColumnsLeft)
    this.atlas.addColumnsRight(newColumnsRight)
    this.newAtlas.addColumnsRight(newColumnsRight)
    this.deletingAtlas.addColumnsRight(newColumnsRight)
    this.atlas.addRowsTop(newRowsTop)
    this.newAtlas.addRowsTop(newRowsTop)
    this.deletingAtlas.addRowsTop(newRowsTop)
    this.atlas.addRowsBottom(newRowsBottom)
    this.newAtlas.addRowsBottom(newRowsBottom)
    this.deletingAtlas.addRowsBottom(newRowsBottom)
    this.saveAtlasToStorage()
    this.setState({
      atlas: this.atlas.getStateObject(),
      newAtlas: this.newAtlas.getStateObject(),
      deletingAtlas: this.deletingAtlas.getStateObject()
    })
  }

  export(fileName) {
    const atlasContents = this.atlas.getContentString()
    const dataURI = `data:text/text;charset=utf-8,${encodeURIComponent(atlasContents)}`
    const dlAnchor = document.createElement('a')
    dlAnchor.href = dataURI
    dlAnchor.download = fileName
    dlAnchor.click()
  }

  updateTileInfo(e) {
    const tileInfo = e.newTileInfo
    this.atlas.set(tileInfo, tileInfo.i, tileInfo.j)
    this.saveAtlasToStorage()
    this.setState({atlas: this.atlas.getStateObject()})
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
    this.saveAtlasToStorage()
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
      case EditModes.TILE:
        this.setState({activeDialog: EDIT_TILE_DIALOG_TYPE})
        break
      case EditModes.SWITCHES:
        this.toggleSwitch(tileInfo)
        this.saveAtlasToStorage()
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

  handleChangeMapSize() {
    this.setState({
      activeDialog: MAP_DIALOG_TYPE
    })
  }

  handleExport() {
    this.setState({
      activeDialog: EXPORT_DIALOG_TYPE
    })
  }

  handleDialogConfirm(e) {
    switch(e.type) {
      case MAP_DIALOG_TYPE:
        this.changeMapSize(e)
        break
      case EXPORT_DIALOG_TYPE:
        this.export(e.fileName)
        break
      case EDIT_TILE_DIALOG_TYPE:
        this.updateTileInfo(e)
        break
    }
    this.setState({
      activeDialog: null
    })
  }

  handleDialogCancel() {
    this.setState({
      activeDialog: null
    })
  }

  renderControlBar() {
    if (this.state.controlBarVisible) {
      const { editMode } = this.state
      return (
        <div className={styles.ControlBarContainer}>
          <ControlBar
            editMode={editMode}
            onExport={this.handleExport}
            onChangeMapSize={this.handleChangeMapSize}
            onModeChange={this.handleEditModeSwitch}
            onSave={this.handleSaveClick}
            onCancel={this.handleCancelClick}/>
        </div>
      )
    }
  }

  render() {
    document.body.style.setProperty('--tiles-wide', this.atlas.columns)
    document.body.style.setProperty('--tiles-tall', this.atlas.rows)
    const {atlas, newAtlas, deletingAtlas, editMode, hoverTile, selectedTile, controlBarVisible, activeDialog} = this.state
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
        {/*
          rows and columns will be ignored by non MapSize Dialogs,
          tileInfo will be ignored by non EditTile Dialogs,
          but lets ignore that until a more elegant solution comes to mind
         */}
        <DialogComponent
          dialogType={activeDialog}
          columns={atlas.columnsWide}
          rows={atlas.rowsTall}
          tileInfo={hoverTile}
          onConfirm={this.handleDialogConfirm}
          onCancel={this.handleDialogCancel} />
      </div>
    )
  }
}