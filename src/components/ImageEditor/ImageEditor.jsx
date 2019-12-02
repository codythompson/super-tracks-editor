import React from 'react'
import range from 'lodash/range'
import flatMap from 'lodash/flatMap'

import ControlBar from './ImageEditorControlBar'
import Layer from './Layer'
import {DOUBLE_CONNECTIONS} from '../../TileInfo'

import styles from '../../styles/ImageEditor/ImageEditor.module.scss'

// nCr - TODO move this to a utils and add tests?
function combinations(set, chooseCount, startIndex=0) {
  if (chooseCount === 1) {
    return set.slice(startIndex)
      .map(element => [element])
  }
  let result = []
  for (let i = startIndex; i <= set.length-chooseCount; i++) {
    let combo = combinations(set, chooseCount-1, i+1)
    // combo.forEach(arr => arr.push(set[i]))
    combo.forEach(arr => arr.unshift(set[i]))
    result = result.concat(combo)
  }
  return result
}
const ALL_PAIR_COMBOS = flatMap(range(1,DOUBLE_CONNECTIONS.length),
  (i) => combinations(DOUBLE_CONNECTIONS, i))

export default class extends React.Component {
constructor(props) {
  super(props)

  this.downloadURI = null
  this.state = {
    showFullPowerSet: true,
    tilesPerRow: 8,
    padding: 0,
    tileWidth: 128,
    lineWidth: parseInt(128/3,10),
    lineColor: 'black'
  }

  this.handleControlBarValueChange = this.handleControlBarValueChange.bind(this)
  this.handleDownloadURIChange = this.handleDownloadURIChange.bind(this)
  this.handleDownloadClick = this.handleDownloadClick.bind(this)
}

handleControlBarValueChange(changeObj) {
  this.setState(changeObj)
}

handleDownloadURIChange(downloadURI) {
  this.downloadURI = downloadURI
}

handleDownloadClick() {
  let a = document.createElement('a')
  a.href = this.downloadURI
  a.setAttribute('download', 'track_image_sheet')
  a.click()
}

render() {
  const {showFullPowerSet,tilesPerRow,padding,tileWidth,lineWidth,lineColor} = this.state
  const connections = showFullPowerSet? ALL_PAIR_COMBOS: DOUBLE_CONNECTIONS
  return (
    <div className={styles.ImageEditor}>
      <div className={styles.ControlBarContainer}>
        <ControlBar
          showFullPowerSet={showFullPowerSet}
          tilesPerRow={tilesPerRow}
          padding={padding}
          tileWidth={tileWidth}
          lineWidth={lineWidth}
          lineColor={lineColor}
          onValueChange={this.handleControlBarValueChange}
          onDownloadClick={this.handleDownloadClick}
        />
      </div>
        <div className={styles.ImageCanvasContainer}>
          <Layer
            connections={connections}
            tilesPerRow={tilesPerRow}
            tileWidth={tileWidth}
            lineWidth={lineWidth}
            lineColor={lineColor}
            padding={padding}
            onDownloadURIChange={this.handleDownloadURIChange}/>
        </div>
      </div>
    )
  }
}