import React from 'react'
import classnames from 'classnames'
import range from 'lodash/range'
import PropTypes from 'prop-types'
// import throttle from 'lodash/throttle'

import Atlas from '../Atlas'
import Row from './Row'

import styles from '../styles/Map.module.scss'

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.topBorderRef = React.createRef()
    this.leftBorderRef = React.createRef()

    // this.handleMapScroll = throttle(this.handleMapScroll, 20).bind(this)
    this.handleMapScroll = this.handleMapScroll.bind(this);
  }

  handleMapScroll(e) {
    this.topBorderRef.current.scrollLeft = this.mapRef.current.scrollLeft
    this.leftBorderRef.current.scrollTop = this.mapRef.current.scrollTop
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
    const { atlas } = this.props;
    return (
      <div className={styles.Map}>
        <div ref={this.leftBorderRef} className={classnames(styles.MapBorder, styles.Vertical)}>
          {
            range(atlas.rows).map((j) => {
              return (
                <div className={styles.Tile} key={`j${j}`}>
                  {j}
                </div>
              )
            })
          }
        </div>
        {this.renderControlBarToggle()}
        <div ref={this.topBorderRef} className={classnames(styles.MapBorder, styles.Horizontal)}>
          {
            range(atlas.columns).map((i) => {
              return (
                <div className={styles.Tile} key={`i${i}`}>
                  {i}
                </div>
              )
            })
          }
        </div>
        <div ref={this.mapRef} className={styles.MapContent} onScroll={this.handleMapScroll}>
          {
            atlas.mapRows((rowArray, j) => (<Row key={`j${j}`} rowTiles={rowArray} />))
          }
        </div>
      </div>
    )
  }
}

Map.propTypes = {
  atlas: PropTypes.instanceOf(Atlas).isRequired,
  onControlBarToggle: PropTypes.func.isRequired
}