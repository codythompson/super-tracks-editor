import React from 'react'

import {CONNECTIONS,DOUBLE_CONNECTIONS,CONNECTION_NAMES} from '../../TileInfo'
import Button from '../UI/Button'
import ButtonGroup from '../ButtonGroup'
import ControlBarStyles from '../../styles/ControlBar.module.scss'

function makeListener(key, changeListener) {
  return function(value) {
    changeListener({[key]: value})
  }
}

export default function ({
  activeConnection,
  onValueChange
}) {
  return (
    <div className={ControlBarStyles.ControlBar}>
      <ButtonGroup
        title={'Active Connection'}
        selectedKey={activeConnection}
        onClick={makeListener('activeConnection', onValueChange)}
        buttonsKeyLabelArr={DOUBLE_CONNECTIONS.map(connection => ({key: connection, label:CONNECTION_NAMES[connection]}))}
        />
    </div>
  )
}