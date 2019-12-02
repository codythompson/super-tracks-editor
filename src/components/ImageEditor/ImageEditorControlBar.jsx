import React, {useState} from 'react'

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

function makeIntListener(originalValue, minValue, maxValue, key, stateChanger, changeListener) {
  return function(value) {
    let intValue = parseInt(value, 10);
    let stringValue = intValue+''
    // TODO deleting with leading negative symbol
    if (value === '') {
      intValue = minValue
      stringValue = ''
    } else if (isNaN(intValue) || intValue < minValue || intValue > maxValue) {
      intValue = parseInt(originalValue, 10)
      stringValue = originalValue
    }
    stateChanger(stringValue)
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
  onValueChange,
  onDownloadClick
}) {
  const [tilesPerRowStr, setTilesPerRow] = useState(tilesPerRow)
  const [paddingStr, setPadding] = useState(padding)
  const [tileWidthStr, setTileWidth] = useState(tileWidth)
  const [lineWidthStr, setLineWidth] = useState(lineWidth)
  return (
    <div className={ControlBarStyles.ControlBar}>
      <Button
        className={ControlBarStyles.Button}
        onClick={onDownloadClick}>
          Download
      </Button>
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
        <TextBox className={styles.TextBox} value={tilesPerRowStr} onChange={makeIntListener(tilesPerRow, 1, 16, 'tilesPerRow', setTilesPerRow, onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Padding'}>
        <TextBox className={styles.TextBox} value={paddingStr} onChange={makeIntListener(padding, 0, tileWidth, 'padding', setPadding, onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Tile Width'}>
        <TextBox className={styles.TextBox} value={tileWidthStr} onChange={makeIntListener(tileWidth, 0, 1024, 'tileWidth', setTileWidth, onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Line Width'}>
        <TextBox className={styles.TextBox} value={lineWidthStr} onChange={makeIntListener(lineWidth, 0, tileWidth, 'lineWidth', setLineWidth, onValueChange)} />
      </ButtonGroup>
      <ButtonGroup title={'Line Color'}>
        <TextBox className={styles.TextBox} value={lineColor} onChange={makeListener('lineColor', onValueChange)} />
      </ButtonGroup>
    </div>
)
}