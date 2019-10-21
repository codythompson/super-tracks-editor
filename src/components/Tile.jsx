import React from 'react'
import classnames from 'classnames'

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

const getClassNames = function(baseClassname, visible, isActive, isNew, isDeleting, customActiveClassName, customNewClassName, customDeletingClassName) {
  const classNamesObj ={
    [baseClassname]: visible,
    [styles.ActiveExit]: isActive,
    [styles.New]: isNew,
    [styles.Deleting]: isDeleting
  }
  if (customActiveClassName) {
    classNamesObj[customActiveClassName] = isActive
  }
  if (customNewClassName) {
    classNamesObj[customNewClassName] = isNew
  }
  if (customDeletingClassName) {
    classNamesObj[customDeletingClassName] = isDeleting
  }
  return classnames(classNamesObj)
}

export default function({
  tileInfo,
  newTileInfo=null,
  deletingTileInfo=null,
  isSelected,
  isHighlighted=false,
  setOffsets=true,
  activeClassName,
  newClassName,
  deletingClassName,
  onClick,
  onMouseEnter
}) {
  const leftOffsetStyle = setOffsets? {
      left: `calc(${tileInfo.i}*var(--tile-width))`
    } :
    null
  const {leftTop_visible, leftRight_visible, leftBottom_visible, topBottom_visible, topRight_visible, rightBottom_visible} = getVisible(tileInfo, newTileInfo)
  const {leftTop_new, leftRight_new, leftBottom_new, topBottom_new, topRight_new, rightBottom_new} = getNew(tileInfo, newTileInfo)
  const {leftTop_deleting, leftRight_deleting, leftBottom_deleting, topBottom_deleting, topRight_deleting, rightBottom_deleting} = getDeleting(tileInfo, deletingTileInfo)
  const {leftTopActive, leftRightActive, leftBottomActive, topBottomActive, topRightActive, rightBottomActive} = tileInfo
  return (
    <div style={leftOffsetStyle} className={classnames(styles.Tile, {[styles.Highlighted]: isHighlighted, [styles.Selected]: isSelected})} onClick={onClick} onMouseEnter={onMouseEnter}>
      <div className={getClassNames(styles.LeftTop, leftTop_visible, leftTopActive, leftTop_new, leftTop_deleting, activeClassName, newClassName, deletingClassName)}></div>
      <div className={getClassNames(styles.LeftRight, leftRight_visible, leftRightActive, leftRight_new, leftRight_deleting, activeClassName, newClassName, deletingClassName)}></div>
      <div className={getClassNames(styles.LeftBottom, leftBottom_visible, leftBottomActive, leftBottom_new, leftBottom_deleting, activeClassName, newClassName, deletingClassName)}></div>
      <div className={getClassNames(styles.TopBottom, topBottom_visible, topBottomActive, topBottom_new, topBottom_deleting, activeClassName, newClassName, deletingClassName)}></div>
      <div className={getClassNames(styles.TopRight, topRight_visible, topRightActive, topRight_new, topRight_deleting, activeClassName, newClassName, deletingClassName)}></div>
      <div className={getClassNames(styles.RightBottom, rightBottom_visible, rightBottomActive, rightBottom_new, rightBottom_deleting, activeClassName, newClassName, deletingClassName)}></div>
    </div>
    // TODO: second layer (in same Tile div) with buttons that toggle the connection
    //       buttons can just be mini standalone css with green or red
    //       hover shows a green or red overlaid connection (might have to be a new middle layer)
  )
}