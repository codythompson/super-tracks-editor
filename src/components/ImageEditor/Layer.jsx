import React from 'react'
import propTypes from 'prop-types'

import {CONNECTION_NAMES} from '../../TileInfo'
import TileSVG from './TileSVG'

class Layer extends React.Component {
  constructor(props) {
    super(props)

    this.ctx = null;
    this.svgCache = {}
    this.saveContext = this.saveContext.bind(this)
  }

  get tilesPerColumn () {
    const {connections, tilesPerRow} = this.props
    return parseInt(Math.ceil(connections.length/tilesPerRow), 10)
  }

  getCanvasDims () {
    const {tileWidth, padding, tilesPerRow} = this.props
    return {
      width: (tileWidth*tilesPerRow) + (padding*(tilesPerRow-1)),
      height: (tileWidth*this.tilesPerColumn) + (padding*(this.tilesPerColumn-1))
    }
  }

  getColumn(index) {
    return index%this.props.tilesPerRow
  }

  getRow(index) {
    return parseInt(index/this.props.tilesPerRow, 10)
  }

  getCacheKey(connections) {
    const connectionKey = connections
      .map(connection => CONNECTION_NAMES[connection])
      .join('x')
    const {tileWidth,lineWidth, lineColor} = this.props
    return `${connectionKey},${tileWidth},${lineWidth},${lineColor}`
  }

  getTileSVG(connections) {
    const key = this.getCacheKey(connections)
    if (key in this.svgCache) {
      return Promise.resolve(this.svgCache[key])
    } else {
      const {tileWidth,lineWidth, lineColor} = this.props
      return TileSVG({
        connections,
        lineColor,
        lineWidth,
        width:tileWidth,
        height:tileWidth
      })
        .then((img) => {
          this.svgCache[key] = img
          return img
        })
    }
  }

  drawTile(ctx, connection, col, row) {
    const {tileWidth, padding} = this.props
    const x = (tileWidth*col) + (padding*col)
    const y = (tileWidth*row) + (padding*row)
    if (!Array.isArray(connection)) {
      connection = [connection]
    }
    this.getTileSVG(connection)
      .then(img => ctx.drawImage(img, x, y))
  }

  drawCanvas() {
    const {connections} = this.props;
    connections.forEach((connection, i) => {
      this.drawTile(this.ctx, connection, this.getColumn(i), this.getRow(i))
    })
  }

  saveContext(canvasRef) {
    this.ctx = canvasRef.getContext('2d')
  }

  componentDidUpdate() {
    this.drawCanvas()
  }
  componentDidMount() {
    this.drawCanvas()
  }

  render() {
    const {className} = this.props
    const {width,height} = this.getCanvasDims()
    return (
      <canvas ref={this.saveContext} className={className} width={width} height={height} />
    )
  }
}

Layer.defaultProps = {
  tileWidth:128,
  padding:0,
  tilesPerRow:8,
  lineWidth:parseInt(128/3, 10),
  lineColor:'black'
}

Layer.propTypes = {
  connections: propTypes.array.isRequired
}

export default Layer
