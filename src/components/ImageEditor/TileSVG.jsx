// TODO: write some tests for the functions here
// TODO: move out of components folder

// import React from 'react'

import {CONNECTIONS} from '../../TileInfo'

const POINT_COEFFICIENTS = {
  [CONNECTIONS.LEFT_TOP]: {x1:0,y1:0.5,x2:0.5,y2:0},
  [CONNECTIONS.LEFT_RIGHT]: {x1:0,y1:0.5,x2:1,y2:0.5},
  [CONNECTIONS.LEFT_BOTTOM]: {x1:0,y1:0.5,x2:0.5,y2:1},
  [CONNECTIONS.TOP_BOTTOM]: {x1:0.5,y1:0,x2:0.5,y2:1},
  [CONNECTIONS.TOP_RIGHT]: {x1:0.5,y1:0,x2:1,y2:0.5},
  [CONNECTIONS.RIGHT_BOTTOM]: {x1:0.5,y1:1,x2:1,y2:0.5}
}

// sweep flag indicates clockwise vs counter clockwise arc between pt1 and pt2
function getSweepArg(x1, y1, dx, dy) {
  let x2 = x1+dx
  let y2 = y1+dy
  if (x2 < x1) {
    let tmp = x2
    x2 = x1
    x1 = tmp
  }
  // clockwise if left->bottom or bottom->right
  return (x1 == 0 && y2 > y1) || (x1 > 0 && y2 < y1)? 1 : 0
}

function createArcDArg(x1, y1, dx, dy) {
  return `M ${x1},${y1} a ${dx} ${dy} 0 0 ${getSweepArg(x1,y1,dx,dy)} ${dx} ${dy}`
}

function createHorizontalLineDArg(x, y, dx) {
  return `M ${x},${y} h ${dx}`
}

function createVerticalLineDArg(x, y, dy) {
  return `M ${x},${y} v ${dy}`
}

function createDArgFromCoords(x1, y1, x2, y2) {
  const dx = x2-x1
  const dy = y2-y1
  if (dx === 0) {
    return createVerticalLineDArg(x1, y1, dy)
  } else if (dy === 0) {
    return createHorizontalLineDArg(x1, y1, dx)
  } else {
    return createArcDArg(x1, y1, dx, dy)
  }
};

function createDArg(connection, width, height) {
  const coeffs = POINT_COEFFICIENTS[connection];
  return createDArgFromCoords(width*coeffs.x1, height*coeffs.y1, width*coeffs.x2, height*coeffs.y2)
}

// export default function({
function svgString({
  // className=null,
  activeConnection=CONNECTIONS.NONE,
  connections=[],
  lineWidth=8,
  lineColor='grey',
  width=160,
  height=160
}) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      ${
        activeConnection in POINT_COEFFICIENTS?
        `<path d="${createDArg(activeConnection,width,height)}" fill="transparent" stroke="${lineColor}" stroke-width="${lineWidth}" />`
        : ''
      }
      ${
        connections.map((connection) => {
          return connection in POINT_COEFFICIENTS?
          `<path d="${createDArg(connection,width,height)}" fill="transparent" stroke="${lineColor}" stroke-width="${lineWidth}" />`
          : ''
        })
          .join('\n')
      }
    </svg>
  `
  // return (
  //   <svg className={className} width={width} height={height}>
  //     {
  //       activeConnection in POINT_COEFFICIENTS?
  //       <path d={createDArg(activeConnection,width,height)} fill={'transparent'} stroke={'red'} strokeWidth={lineWidth} />
  //       : null
  //     }
  //     {
  //       connections.map((connection) => {
  //         connection in POINT_COEFFICIENTS?
  //         <path d={createDArg(connection,width,height)} fill={'transparent'} stroke={'gray'} strokeWidth={lineWidth} />
  //         : null
  //       })
  //     }
  //   </svg>
  // )
}

export default function(props) {
  return new Promise((resolve,reject) => {
    try {
      const data = svgString(props)
      // https://stackoverflow.com/a/30140386
      const img = new Image()
      img.src = `data:image/svg+xml;utf-8,${data}`
      img.onload = ()=>resolve(img)
    } catch (e) {
      reject(e)
    }
  })
}