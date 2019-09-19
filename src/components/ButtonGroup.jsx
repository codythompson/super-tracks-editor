import React from 'react'
import classnames from 'classnames'

import uiStyles from '../styles/UI.module.scss'
import styles from '../styles/ButtonGroup.module.scss'

export default function ({title=null, buttonsKeyLabelArr=[], selectedKey=null, onClick}) {
  return (
    <div className={styles.ButtonGroup}>
      {title!==null?<h3 className={styles.Title}>{title}</h3>:null}
      <div>
        {buttonsKeyLabelArr.map(keyLabel => (
          <button
            key={keyLabel.key}
            onClick={() => onClick(keyLabel.key)}
            className={classnames(styles.Button, 'woot', uiStyles.Button,{[uiStyles.Selected]: keyLabel.key === selectedKey, [keyLabel.className]: !!keyLabel.className})}>
              {keyLabel.label}
          </button>
        ))}
      </div>
    </div>
  )
}