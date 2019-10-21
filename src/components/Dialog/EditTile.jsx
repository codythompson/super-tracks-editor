import React from 'react'
import classnames from 'classnames'

import TileInfo, {CONNECTIONS} from '../../TileInfo'
import Dialog from './Dialog'
import Button from '../UI/Button'
import ButtonGroup from '../ButtonGroup'
import Tile from '../Tile'
import styles from '../../styles/EditTileDialog.module.scss'

export const DIALOG_TYPE = 'EDIT_TILE'

const MODE_DEFS = [
  // {key: 'ACTIVE', label: 'Set Active Connection'},
  {key: 'PLACE', label: 'Add New Connection'},
  {key: 'DELETE', label: 'Remove Connection'}
]
const MODES = MODE_DEFS
  .reduce((modeObj, modeDef) => ({[modeDef.key]:modeDef.key, ...modeObj}), {})

export default class EditTile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: MODES.PLACE,
      tileInfo: props.tileInfo.clone(),
      newTileInfo: null,
      deletingTileInfo: null
    }

    this.handleOnConfirm = this.handleOnConfirm.bind(this)
    this.handleOnToggleClick = this.handleOnToggleClick.bind(this)
    this.handleOnModeChange = this.handleOnModeChange.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)

    // TODO more elegant mouse interaction handlers
    // click handlers
    this.handleOnLeftTopClick = this.handleOnTileInteraction.bind(this, CONNECTIONS.LEFT_TOP, false)
    this.handleOnLeftRightClick = this.handleOnTileInteraction.bind(this, CONNECTIONS.LEFT_RIGHT, false)
    this.handleOnLeftBottomClick = this.handleOnTileInteraction.bind(this, CONNECTIONS.LEFT_BOTTOM, false)
    this.handleOnTopBottomClick = this.handleOnTileInteraction.bind(this, CONNECTIONS.TOP_BOTTOM, false)
    this.handleOnTopRightClick = this.handleOnTileInteraction.bind(this, CONNECTIONS.TOP_RIGHT, false)
    this.handleOnRightBottomClick = this.handleOnTileInteraction.bind(this, CONNECTIONS.RIGHT_BOTTOM, false)

    // mouse enter handlers
    this.handleOnLeftTopEnter = this.handleOnTileInteraction.bind(this, CONNECTIONS.LEFT_TOP, true)
    this.handleOnLeftRightEnter = this.handleOnTileInteraction.bind(this, CONNECTIONS.LEFT_RIGHT, true)
    this.handleOnLeftBottomEnter = this.handleOnTileInteraction.bind(this, CONNECTIONS.LEFT_BOTTOM, true)
    this.handleOnTopBottomEnter = this.handleOnTileInteraction.bind(this, CONNECTIONS.TOP_BOTTOM, true)
    this.handleOnTopRightEnter = this.handleOnTileInteraction.bind(this, CONNECTIONS.TOP_RIGHT, true)
    this.handleOnRightBottomEnter = this.handleOnTileInteraction.bind(this, CONNECTIONS.RIGHT_BOTTOM, true)
  }

  resetState() {
    this.setState({
      newTileInfo: null,
      deletingTileInfo: null
    })
  }

  handleOnConfirm() {
    this.props.onConfirm({
      type: DIALOG_TYPE,
      newTileInfo: this.state.tileInfo
    })
  }

  handleOnToggleClick() {
    const tileInfo = this.state.tileInfo
    if (tileInfo.exitPairs.length > 1) {
      const clone = tileInfo.clone()
      clone.activeExitIndex = (clone.activeExitIndex+1)%clone.exitPairs.length
      this.setState({tileInfo: clone})
    }
  }

  handleOnModeChange(mode) {
    this.resetState()
    this.setState({mode})
  }

  handleOnMouseLeave() {
    this.resetState()
  }

  handleOnTileEnter(connection) {
    const {mode, tileInfo} = this.state
    if (mode === MODES.PLACE) {
      const newTileInfo = new TileInfo(tileInfo.i,tileInfo.j)
      newTileInfo.addExitPair(connection)
      this.setState({newTileInfo})
    } else if (mode === MODES.DELETE) {
      const deletingTileInfo = new TileInfo(tileInfo.i,tileInfo.j)
      deletingTileInfo.addExitPair(connection)
      this.setState({deletingTileInfo})
    }
  }

  handleOnTileClick(connection) {
    const {mode, tileInfo, newTileInfo} = this.state
    if (mode === MODES.PLACE && newTileInfo) {
      this.setState({
        tileInfo: tileInfo.merge(newTileInfo),
        newTileInfo:null
      })
    } else if (mode === MODES.DELETE) {
      const clone = tileInfo.clone()
      clone.removeExitPair(connection)
      this.setState({
        tileInfo: clone,
        deletingTileInfo: null
      })
    }
  }

  handleOnTileInteraction(connection, isMouseEnter) {
    isMouseEnter?
      this.handleOnTileEnter(connection) :
      this.handleOnTileClick(connection)
  }

  render() {
    const onCancel = this.props.onCancel
    const {tileInfo, newTileInfo, deletingTileInfo, mode} = this.state

    return (
      <Dialog className={styles.EditTile} onConfirm={this.handleOnConfirm} onCancel={onCancel}>
        <div className={styles.EditControlBar}>
          <Button className={styles.Button} onClick={this.handleOnToggleClick}>Toggle Active</Button>
          <ButtonGroup buttonsKeyLabelArr={MODE_DEFS} selectedKey={mode} onClick={this.handleOnModeChange} />
        </div>
        <div className={styles.TileContainer}>
        <Tile tileInfo={tileInfo} newTileInfo={newTileInfo} deletingTileInfo={deletingTileInfo} setOffsets={false} />
        <div className={styles.Tile} onMouseLeave={this.handleOnMouseLeave}>
          <div onClick={this.handleOnLeftTopClick} onMouseEnter={this.handleOnLeftTopEnter}></div>
          <div onClick={this.handleOnTopBottomClick} onMouseEnter={this.handleOnTopBottomEnter}></div>
          <div onClick={this.handleOnTopRightClick} onMouseEnter={this.handleOnTopRightEnter}></div>
          <div onClick={this.handleOnLeftRightClick} onMouseEnter={this.handleOnLeftRightEnter}></div>
          <div className={styles.CenterSubTile}>
            <span className={classnames(styles.CenterSubSubTile, styles.LeftRight)} onClick={this.handleOnLeftRightClick} onMouseEnter={this.handleOnLeftRightEnter}></span>
            <span className={classnames(styles.CenterSubSubTile, styles.topBottom)} onClick={this.handleOnTopBottomClick} onMouseEnter={this.handleOnTopBottomEnter}></span>
            <span className={classnames(styles.CenterSubSubTile, styles.LeftRight)} onClick={this.handleOnLeftRightClick} onMouseEnter={this.handleOnLeftRightEnter}></span>
          </div>
          <div onClick={this.handleOnLeftRightClick} onMouseEnter={this.handleOnLeftRightEnter}></div>
          <div onClick={this.handleOnLeftBottomClick} onMouseEnter={this.handleOnLeftBottomEnter}></div>
          <div onClick={this.handleOnTopBottomClick} onMouseEnter={this.handleOnTopBottomEnter}></div>
          <div onClick={this.handleOnRightBottomClick} onMouseEnter={this.handleOnRightBottomEnter}></div>
        </div>
        </div>
      </Dialog>
    )
  }
}
