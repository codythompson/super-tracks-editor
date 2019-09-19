import React from 'react'
import classnames from 'classnames'

import styles from '../styles/Dialog.module.scss'
import uiStyles from '../styles/UI.module.scss'

export default function({
    children,
    onConfirm,
    onCancel,
    confirmLabel='save',
    cancelLabel='cancel'
  }) {

  return (
    <div className={styles.Dialog}>
      {/* TODO switch to grid layout so this will work */}
      {/* <div className={styles.CancelBackdrop} onClick={onCancel}></div> */}
      <div className={styles.Box}>
        {children}
        <div className={styles.ConfirmPanel}>
          <button className={classnames(styles.Button, uiStyles.Button, uiStyles.Success)} onClick={onConfirm}>{confirmLabel}</button>
          <button className={classnames(styles.Button, uiStyles.Button)} onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  )
}