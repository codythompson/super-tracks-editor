import React from 'react'
import classnames from 'classnames'

import Dialog from './Dialog'
import styles from '../../styles/EditTileDialog.module.scss'

export const DIALOG_TYPE = 'EDIT_TILE'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tileInfo: props.tileInfo
    }

    this.handleOnConfirm = this.handleOnConfirm.bind(this)
  }

  handleOnConfirm() {
    onConfirm({
      type: DIALOG_TYPE,
      newTileInfo: this.state.tileInfo
    })
  }

  render() {
    const onCancel = this.props.onCancel
    const tileInfo = this.state.tileInfo

    return (
      <Dialog onConfirm={this.handleOnConfirm} onCancel={onCancel}>
        <div className={styles.Tile}>
          <div className={classnames(styles.SubTile, styles.LeftTop)}></div>
          <div className={classnames(styles.SubTile, styles.LeftMid)}></div>
          <div className={classnames(styles.SubTile, styles.LeftBottom)}></div>
          <div className={classnames(styles.SubTile, styles.CenterTop)}></div>
          <div className={classnames(styles.SubTile, styles.CenterMid)}></div>
          <div className={classnames(styles.SubTile, styles.CenterBottom)}></div>
          <div className={classnames(styles.SubTile, styles.RightTop)}></div>
          <div className={classnames(styles.SubTile, styles.RightMid)}></div>
          <div className={classnames(styles.SubTile, styles.RightBottom)}></div>
        </div>
      </Dialog>
    )
  }
}
