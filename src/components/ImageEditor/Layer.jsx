import React from 'react'
import propTypes from 'prop-types'

import TileSVG from './TileSVG'

class Layer extends React.Component {
  constructor(props) {
    super(props)

    this.drawCanvas = this.drawCanvas.bind(this)
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

  drawTile(ctx, connection, col, row) {
    const {tileWidth, padding} = this.props
    const x = (tileWidth*col) + (padding*col)
    const y = (tileWidth*row) + (padding*row)
    if (!Array.isArray(connection)) {
      connection = [connection]
    }
    TileSVG({
      connections:connection,
      lineColor:'black',
      lineWidth:parseInt(tileWidth/3, 10),
      width:tileWidth,
      height:tileWidth
    })
      .then(img => ctx.drawImage(img, x, y))
  }

  drawCanvas(canvasRef) {
    const ctx = canvasRef.getContext('2d')
    const {connections} = this.props;
    connections.forEach((connection, i) => {
      this.drawTile(ctx, connection, this.getColumn(i), this.getRow(i))
    })
  }

  render() {
    const {className} = this.props
    const {width,height} = this.getCanvasDims()
    return (
      <canvas ref={this.drawCanvas} className={className} width={width} height={height} />
    )
  }
}

Layer.defaultProps = {
  tileWidth:128,
  padding:0,
  tilesPerRow:8
}

Layer.propTypes = {
  connections: propTypes.array.isRequired
}

export default Layer
