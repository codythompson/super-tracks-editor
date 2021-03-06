import React from 'react'
import classnames from 'classnames'

import Button from '../UI/Button'
import styles from '../../styles/Dialog.module.scss'
import uiStyles from '../../styles/UI/UI.module.scss'

export default function({
    children,
    onConfirm,
    onCancel,
    confirmLabel='save',
    cancelLabel='cancel',
    confirmIsDangerous=false,
    className=null
  }) {

  return (
    <div className={styles.Dialog}>
      {/* TODO switch to grid layout so this will work */}
      {/* <div className={styles.CancelBackdrop} onClick={onCancel}></div> */}
      <div className={styles.Box}>
        <div className={classnames(styles.Content, className)}>
          {children}
        </div>
        <div className={styles.ConfirmPanel}>
          <Button className={classnames(styles.Button, {[uiStyles.Success]:!confirmIsDangerous, [uiStyles.Danger]:confirmIsDangerous})} onClick={onConfirm}>{confirmLabel}</Button>
          <Button className={styles.Button} onClick={onCancel}>{cancelLabel}</Button>
        </div>
      </div>
    </div>
  )
}