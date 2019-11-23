import React from 'react'

import {CONNECTIONS} from '../../TileInfo'

function getSweepArg(x1, y1, dx, dy) {
  x2 = x1+dx
  y2 = y1+dy
  if (x2 < x1)
}

function createArcDArg(x1, y1, dx, dy) {
}

function createHorizontalLineDArg(x, y, dx) {

}

function createVerticalLineDArg(x, y, dy) {

}

// TODO: finish this function
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands
function createDArg(x1, y1, x2, y2) {
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

export default function({
  className=null,
  connection=CONNECTIONS.NONE,
  lineCount=2,
  lineWidth=8,
  lineSeparation=80,
  lineColor=0xffffffff,
  width=160,
  height=160
}) {
  return (
    <svg className={className} width={width} height={height}>
      <path d={} />
    </svg>
)
}