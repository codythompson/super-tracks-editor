import React from 'react'

import Dialog from './index'
import Button from '../UI/Button'
import styles from '../../styles/MapSize.module.scss'

export default function ({rows, columns, onConfirm, onCancel}) {
  return (
    <Dialog onConfirm={onConfirm} onCancel={onCancel}>
      <div>
        Current Size: {rows}x{columns}
      </div>
      <div>
          <span>Add columns left</span>
          <Button>add</Button>
      </div>
      <div>
          <span>Add columns right</span>
          <Button>add</Button>
      </div>
      <div>
          <span>Add rows above</span>
          <Button>add</Button>
      </div>
      <div>
          <span>Add rows below</span>
          <Button>add</Button>
      </div>
  </Dialog>
)
}