import React from 'react'
import classnames from 'classnames'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import throttle from 'lodash/throttle'

import Row from './Row'

import styles from '../styles/Map.module.scss'

const TILE_OVERFLOW_COUNT = 10

// TODO: make tests for these helpers
function getStartIndex(tileLength, bufferCount, currentScrollOffset) {
  return Math.max(0, Math.trunc(currentScrollOffset/tileLength)-bufferCount)
}

function getEndIndex(tileLength, bufferCount, viewportLength, startIndex, arrayLength) {
  return Math.min(arrayLength-1, startIndex+(bufferCount*2)+Math.trunc(viewportLength/tileLength))
}

function getCSSVarPixelValue(propertyName) {
  return Number(getComputedStyle(document.body)
    .getPropertyValue(propertyName)
    .trim()
    .replace('px', '')
  )
}

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.topBorderRef = React.createRef()
    this.leftBorderRef = React.createRef()

    // this is used to avoid updating the state on every scroll event
    this.lastOffsets = {}

    this.state = {
      scrollLeft: 0,
      scrollTop: 0
    }

    this.handleMapScroll = this.handleMapScroll.bind(this)
    // throttle updateRenderRange for scrolling performance
    this.updateRenderRange = throttle(this.updateRenderRange.bind(this), 40)
  }

  updateRenderRange(scrollLeft, scrollTop) {
    const newOffsets = this.getMapOffsets(scrollLeft, scrollTop)
    // only update the state if the offsets have changed for performance
    if (!isEqual(newOffsets, this.lastOffsets)) {
      this.setState({ scrollLeft, scrollTop })
    }
  }

  handleMapScroll(e) {
    const scrollLeft = this.mapRef.current.scrollLeft
    const scrollTop = this.mapRef.current.scrollTop
    this.topBorderRef.current.scrollLeft = scrollLeft
    this.leftBorderRef.current.scrollTop = scrollTop
    this.updateRenderRange(scrollLeft, scrollTop)
  }

  getMapOffsets(currentScrollLeft, currentScrollTop) {
    const tileWidth = getCSSVarPixelValue('--tile-width')
    const viewportWidth = getCSSVarPixelValue('--viewport-width')
    const viewportHeight = getCSSVarPixelValue('--viewport-height')

    const startRowIndex = getStartIndex(tileWidth, TILE_OVERFLOW_COUNT, currentScrollTop)
    const startColIndex = getStartIndex(tileWidth, TILE_OVERFLOW_COUNT, currentScrollLeft)
    return {
      startColIndex,
      endColIndex: getEndIndex(tileWidth, TILE_OVERFLOW_COUNT, viewportWidth, startColIndex, this.props.atlas.columnsWide),
      startRowIndex,
      endRowIndex: getEndIndex(tileWidth, TILE_OVERFLOW_COUNT, viewportHeight, startRowIndex, this.props.atlas.rowsTall)
    }
  }

  renderControlBarToggle() {
    const { onControlBarToggle } = this.props;
    if (this.props.controlBarVisible) {
      return <button className={classnames(styles.ToggleButton)} onClick={onControlBarToggle}>&lt;</button>
    } else {
      return <button className={classnames(styles.ToggleButton)} onClick={onControlBarToggle}>&gt;</button>
    }
  }

  render() {
    const {
      atlas,
      newAtlas,
      deletingAtlas,
      editMode,
      hoverTile,
      selectedTile,
      onTileClick,
      onTileEnter
    } = this.props;
    const {scrollLeft, scrollTop} = this.state
    this.lastOffsets = this.getMapOffsets(scrollLeft, scrollTop)
    const {startRowIndex, endRowIndex, startColIndex, endColIndex} = this.lastOffsets
    const colsRange = range(startColIndex, endColIndex+1)
    const rowsRange = range(startRowIndex, endRowIndex+1)
    return (
      <div className={styles.Map}>
        <div ref={this.leftBorderRef} className={classnames(styles.MapBorder, styles.Vertical)}>
          <div className={styles.MapBorderContainer}>
            {
              rowsRange.map((j) => {
                return (
                  <div style={{top: `calc(${j}*var(--tile-width))`}} className={styles.Tile} key={`j${j}`}>
                    {j}
                  </div>
                )
              })
            }
          </div>
        </div>
        {this.renderControlBarToggle()}
        <div ref={this.topBorderRef} className={classnames(styles.MapBorder, styles.Horizontal)}>
          <div className={styles.MapBorderContainer}>
            {
              colsRange.map((i) => {
                return (
                  <div style={{ left: `calc(${i}*var(--tile-width))` }} className={styles.Tile} key={`i${i}`}>
                    {i}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div ref={this.mapRef} className={styles.MapContent} onScroll={this.handleMapScroll}>
          <div className={styles.MapContentInnerContainer}>
          {
            rowsRange.map(j => (
              <Row
                key={`j${j}`}
                rowIndex={j}
                rowTiles={atlas.rows[j]}
                startColIndex={startColIndex}
                endColIndex={endColIndex}
                rowNewTiles={newAtlas.rows[j]}
                rowDeletingTiles={deletingAtlas.rows[j]}
                editMode={editMode}
                hoverTile={hoverTile}
                selectedTile={selectedTile}
                onTileClick={onTileClick}
                onTileEnter={onTileEnter}/>
            ))
        }
        </div>
      </div>
    </div>
  )
}
}

Map.propTypes = {
  atlas: PropTypes.object.isRequired,
  newAtlas: PropTypes.object.isRequired,
  deletingAtlas: PropTypes.object.isRequired,
  editMode: PropTypes.string.isRequired,
  hoverTile: PropTypes.object,
  selectedTile: PropTypes.object,
  onControlBarToggle: PropTypes.func.isRequired,
  onTileClick: PropTypes.func.isRequired,
  onTileEnter: PropTypes.func.isRequired
}