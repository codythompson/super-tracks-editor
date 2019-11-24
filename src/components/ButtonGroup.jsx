import React from 'react'
import classnames from 'classnames'

import Button from './UI/Button'
import styles from '../styles/ButtonGroup.module.scss'

/**
 * 
 * @param {string} key the selected key
 * @param {string|Array} selectedKeys a string representing the single selected key, or an array of selected keys
 */
function isSelected(key, selectedKeys) {
  if (Array.isArray(selectedKeys)) {
    return selectedKeys.indexOf(key) >= 0
  } else {
    return key === selectedKeys
  }
}

export default function ({title=null, buttonsKeyLabelArr=[], selectedKey=null, children, onClick}) {
  return (
    <div className={styles.ButtonGroup}>
      {title!==null?<h3 className={styles.Title}>{title}</h3>:null}
      <div>
        {buttonsKeyLabelArr.map(keyLabel => (
          <Button
            key={keyLabel.key}
            onClick={() => onClick(keyLabel.key)}
            selected={isSelected(keyLabel.key, selectedKey)}
            className={classnames(styles.Button,{[keyLabel.className]: !!keyLabel.className})}>
              {keyLabel.label}
          </Button>
        ))}
        {children}
      </div>
    </div>
  )
}