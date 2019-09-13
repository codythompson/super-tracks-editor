import React from 'react'
import classnames from 'classnames'

import EDIT_MODES from '../EditModes'
import styles from '../styles/Tile.module.scss'

const mergeTileInfoFlags = function (compare, propPostFix, tiA, tiB) {
  return {
    [`leftTop${propPostFix}`]: compare(tiA.leftTop, tiB && tiB.leftTop),
    [`leftRight${propPostFix}`]: compare(tiA.leftRight, tiB && tiB.leftRight),
    [`leftBottom${propPostFix}`]: compare(tiA.leftBottom, tiB && tiB.leftBottom),
    [`topBottom${propPostFix}`]: compare(tiA.topBottom, tiB && tiB.topBottom),
    [`topRight${propPostFix}`]: compare(tiA.topRight, tiB && tiB.topRight),
    [`rightBottom${propPostFix}`]: compare(tiA.rightBottom, tiB && tiB.rightBottom)
  }
}

const getVisible = mergeTileInfoFlags.bind(this, (tileFlag, newTileFlag) => tileFlag || newTileFlag,'_visible')
const getNew = mergeTileInfoFlags.bind(this, (tileFlag, newTileFlag) => !tileFlag && newTileFlag, '_new')
const getDeleting = mergeTileInfoFlags.bind(this, (tileFlag, deletingTileFlag) => tileFlag && deletingTileFlag, '_deleting')

export default function({tileInfo, newTileInfo=null, deletingTileInfo=null, isSelected, isHighlighted=false, onClick, onMouseEnter}) {
  const {leftTop_visible, leftRight_visible, leftBottom_visible, topBottom_visible, topRight_visible, rightBottom_visible} = getVisible(tileInfo, newTileInfo)
  const {leftTop_new, leftRight_new, leftBottom_new, topBottom_new, topRight_new, rightBottom_new} = getNew(tileInfo, newTileInfo)
  const {leftTop_deleting, leftRight_deleting, leftBottom_deleting, topBottom_deleting, topRight_deleting, rightBottom_deleting} = getDeleting(tileInfo, deletingTileInfo)
  const {leftTopActive, leftRightActive, leftBottomActive, topBottomActive, topRightActive, rightBottomActive} = tileInfo
  return (
    <div className={classnames(styles.Tile, {[styles.Highlighted]: isHighlighted, [styles.Selected]: isSelected})} onClick={onClick} onMouseEnter={onMouseEnter}>
      <div className={classnames({[styles.LeftTop]:leftTop_visible, [styles.ActiveExit]: leftTopActive, [styles.New]: leftTop_new, [styles.Deleting]: leftTop_deleting})}></div>
      <div className={classnames({[styles.LeftRight]:leftRight_visible, [styles.ActiveExit]: leftRightActive, [styles.New]: leftRight_new, [styles.Deleting]: leftRight_deleting})}></div>
      <div className={classnames({[styles.LeftBottom]:leftBottom_visible, [styles.ActiveExit]: leftBottomActive, [styles.New]: leftBottom_new, [styles.Deleting]: leftBottom_deleting})}></div>
      <div className={classnames({[styles.TopBottom]:topBottom_visible, [styles.ActiveExit]: topBottomActive, [styles.New]: topBottom_new, [styles.Deleting]: topBottom_deleting})}></div>
      <div className={classnames({[styles.TopRight]:topRight_visible, [styles.ActiveExit]: topRightActive, [styles.New]: topRight_new, [styles.Deleting]: topRight_deleting})}></div>
      <div className={classnames({[styles.RightBottom]:rightBottom_visible, [styles.ActiveExit]: rightBottomActive, [styles.New]: rightBottom_new, [styles.Deleting]: rightBottom_deleting})}></div>
    </div>
    // TODO: second layer (in same Tile div) with buttons that toggle the connection
    //       buttons can just be mini standalone css with green or red
    //       hover shows a green or red overlaid connection (might have to be a new middle layer)
  )
}