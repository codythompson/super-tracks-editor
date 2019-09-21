import React from 'react'
import classnames from 'classnames'

import Button from './UI/Button'
import styles from '../styles/ButtonGroup.module.scss'

export default function ({title=null, buttonsKeyLabelArr=[], selectedKey=null, onClick}) {
  return (
    <div className={styles.ButtonGroup}>
      {title!==null?<h3 className={styles.Title}>{title}</h3>:null}
      <div>
        {buttonsKeyLabelArr.map(keyLabel => (
          <Button
            key={keyLabel.key}
            onClick={() => onClick(keyLabel.key)}
            selected={keyLabel.key === selectedKey}
            className={classnames(styles.Button,{[keyLabel.className]: !!keyLabel.className})}>
              {keyLabel.label}
          </Button>
        ))}
      </div>
    </div>
  )
}