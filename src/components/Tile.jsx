import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Tile.module.scss'

export default function({tileInfo}) {
  const {leftTop, leftRight, leftBottom, topBottom, topRight, rightBottom} = tileInfo
  const {leftTopActive, leftRightActive, leftBottomActive, topBottomActive, topRightActive, rightBottomActive} = tileInfo
  return (
    <div className={styles.Tile}>
      <div className={classNames({[styles.LeftTop]:leftTop, [styles.ActiveExit]: leftTopActive})}></div>
      <div className={classNames({[styles.LeftRight]:leftRight, [styles.ActiveExit]: leftRightActive})}></div>
      <div className={classNames({[styles.LeftBottom]:leftBottom, [styles.ActiveExit]: leftBottomActive})}></div>
      <div className={classNames({[styles.TopBottom]:topBottom, [styles.ActiveExit]: topBottomActive})}></div>
      <div className={classNames({[styles.TopRight]:topRight, [styles.ActiveExit]: topRightActive})}></div>
      <div className={classNames({[styles.RightBottom]:rightBottom, [styles.ActiveExit]: rightBottomActive})}></div>
    </div>
    // TODO: second layer (in same Tile div) with buttons that toggle the connection
    //       buttons can just be mini standalone css with green or red
    //       hover shows a green or red overlaid connection (might have to be a new middle layer)
  )
}