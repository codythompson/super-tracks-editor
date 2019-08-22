import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Tile.module.scss'

export default function({tileInfo}) {
  const {leftTop, leftRight, leftBottom, topBottom, topRight, rightBottom} = tileInfo
  return (
    <div className={styles.Tile}>
      <div className={classNames({[styles.LeftTop]:true, [styles.Off]: !leftTop})}></div>
      <div className={classNames({[styles.LeftRight]:true, [styles.Off]: !leftRight})}></div>
      <div className={classNames({[styles.LeftBottom]:true, [styles.Off]: !leftBottom})}></div>
      <div className={classNames({[styles.TopBottom]:true, [styles.Off]: !topBottom})}></div>
      <div className={classNames({[styles.TopRight]:true, [styles.Off]: !topRight})}></div>
      <div className={classNames({[styles.RightBottom]:true, [styles.Off]: !rightBottom})}></div>
    </div>
    // TODO: second layer (in same Tile div) with buttons that toggle the connection
    //       buttons can just be mini standalone css with green or red
    //       hover shows a green or red overlaid connection (might have to be a new middle layer)
  )
}