import React from 'react'
import classnames from 'classnames'

import EDIT_MODES from '../EditModes'
import styles from '../styles/Tile.module.scss'

export default function({tileInfo, editMode, isHighlighted=false, onClick, onMouseEnter}) {
  const {leftTop, leftRight, leftBottom, topBottom, topRight, rightBottom} = tileInfo
  const {leftTopActive, leftRightActive, leftBottomActive, topBottomActive, topRightActive, rightBottomActive} = tileInfo
  let isSelected = false
  switch (editMode) {
    case EDIT_MODES.SWITCHES:
      isSelected = tileInfo.exitPairs.length > 1
  }
  return (
    <div className={classnames(styles.Tile, {[styles.Highlighted]: isHighlighted, [styles.Selected]: isSelected})} onClick={onClick} onMouseEnter={onMouseEnter}>
      <div className={classnames({[styles.LeftTop]:leftTop, [styles.ActiveExit]: leftTopActive})}></div>
      <div className={classnames({[styles.LeftRight]:leftRight, [styles.ActiveExit]: leftRightActive})}></div>
      <div className={classnames({[styles.LeftBottom]:leftBottom, [styles.ActiveExit]: leftBottomActive})}></div>
      <div className={classnames({[styles.TopBottom]:topBottom, [styles.ActiveExit]: topBottomActive})}></div>
      <div className={classnames({[styles.TopRight]:topRight, [styles.ActiveExit]: topRightActive})}></div>
      <div className={classnames({[styles.RightBottom]:rightBottom, [styles.ActiveExit]: rightBottomActive})}></div>
    </div>
    // TODO: second layer (in same Tile div) with buttons that toggle the connection
    //       buttons can just be mini standalone css with green or red
    //       hover shows a green or red overlaid connection (might have to be a new middle layer)
  )
}