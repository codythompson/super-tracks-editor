import React from 'react'
import classnames from 'classnames'

import styles from '../../styles/UI/Button.module.scss'

export default function({children, selected=false, onClick, className}) {
  return (
    <button className={classnames(styles.button, className, {[styles.Selected]: selected})} onClick={onClick}>{children}</button>
  )
}