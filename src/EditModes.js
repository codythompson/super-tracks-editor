const ModeKeys = {
  TILE: 'TILE',
  SWITCHES: 'SWITCHES',
  PLACE: 'PLACE',
  DELETE: 'DELETE'
}

const Modes = [
  ModeKeys.TILE,
  ModeKeys.SWITCHES,
  ModeKeys.PLACE,
  ModeKeys.DELETE,
]

const Labels = {
  [ModeKeys.TILE]: 'Single Tile',
  [ModeKeys.SWITCHES]: 'Toggle Switches',
  [ModeKeys.PLACE]: 'Place Track',
  [ModeKeys.DELETE]: 'Delete Track'
}

// TODO: cancelable?
const MetaData = {
  [ModeKeys.TILE]: {confirmable: false},
  [ModeKeys.SWITCHES]: {confirmable: false},
  [ModeKeys.PLACE]: {confirmable: true},
  [ModeKeys.DELETE]: {confirmable: true, styleAsDangerous: true}
}

export default ModeKeys

export {
  Modes,
  Labels,
  MetaData
}