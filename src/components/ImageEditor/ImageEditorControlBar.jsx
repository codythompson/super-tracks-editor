import React from 'react'

import Button from '../UI/Button'
import TextBox from '../UI/TextBox'
import ButtonGroup from '../ButtonGroup'
import ControlBarStyles from '../../styles/ControlBar.module.scss'
import styles from '../../styles/ImageEditorControlBar.module.scss'

function makeListener(key, changeListener) {
  return function(value) {
    changeListener({[key]:value})
  }
}

function makeIntListener(originalValue, minValue, maxValue, key, changeListener) {
  return function(value) {
    let intValue = parseInt(value, 10);
    // TODO deleting with leading negative symbol
    if (value === '') {
      intValue = minValue
    } else if (isNaN(intValue) || intValue < minValue || intValue > maxValue) {
      intValue = parseInt(originalValue, 10)
    }
    changeListener({[key]: intValue})
  }
}

function makeBoolListener(key, value, changeListener) {
  return function() {
    changeListener({[key]: value})
  }
}

export default function ({
  showFullPowerSet,
  tilesPerRow,
  padding,
  tileWidth,
  lineWidth,
  lineColor,
  onValueChange
}) {
  return (
    <div className={ControlBarStyles.ControlBar}>
      <ButtonGroup title={'Combos.'} >
        <Button
          className={ControlBarStyles.Button}
          selected={!showFullPowerSet}
          onClick={makeBoolListener('showFullPowerSet',false,onValueChange)}>
            Single
          </Button>
        <Button
          className={ControlBarStyles.Button}
          selected={showFullPowerSet}
          onClick={makeBoolListener('showFullPowerSet',true,onValueChange)}>
            Power Set
          </Button>
      </ButtonGroup>
      <ButtonGroup title={'Tiles Per Row'}>
        <TextBox className={styles.TextBox} value={tilesPerRow} onChange={makeIntListener(tilesPerRow, 1, 16, 'tilesPerRow', onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Padding'}>
        <TextBox className={styles.TextBox} value={padding} onChange={makeIntListener(padding, 0, tileWidth, 'padding', onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Tile Width'}>
        <TextBox className={styles.TextBox} value={tileWidth} onChange={makeIntListener(tileWidth, 0, 1024, 'tileWidth', onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Line Width'}>
        <TextBox className={styles.TextBox} value={lineWidth} onChange={makeIntListener(lineWidth, 0, tileWidth, 'lineWidth', onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Line Color'}>
        <TextBox className={styles.TextBox} value={lineColor} onChange={makeListener('lineColor', onValueChange)} />
      </ButtonGroup>
    </div>
)
}