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

function makeBoolListener(key, value, changeListener) {
  return function() {
    changeListener({[key]: value})
  }
}

export default function ({
  showFullPowerSet=false,
  onValueChange
}) {
  return (
    <div className={ControlBarStyles.ControlBar}>
      <ButtonGroup title={'Combos.'} >
        <Button
          className={ControlBarStyles.Button}
          selected={!showFullPowerSet}
          onClick={makeBoolListener('showFullPowerSet',false,onValueChange)}>
            Single Pairs
          </Button>
        <Button
          className={ControlBarStyles.Button}
          selected={showFullPowerSet}
          onClick={makeBoolListener('showFullPowerSet',true,onValueChange)}>
            Power Set
          </Button>
      </ButtonGroup>
    </div>
)
}