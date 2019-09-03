const ModeKeys = {
  SWITCHES: 'SWITCHES',
  PLACE: 'PLACE',
  DELETE: 'DELETE'
}

const Modes = [
  ModeKeys.SWITCHES,
  ModeKeys.PLACE,
  ModeKeys.DELETE,
]

const Labels = {
  [ModeKeys.SWITCHES]: 'Toggle Switches',
  [ModeKeys.PLACE]: 'Place Track',
  [ModeKeys.DELETE]: 'Delete Track'
}

// TODO: cancelable?
const MetaData = {
  [ModeKeys.SWITCHES]: {confirmable: false},
  [ModeKeys.PLACE]: {confirmable: true},
  [ModeKeys.DELETE]: {confirmable: true}
}

export default ModeKeys

export {
  Modes,
  Labels,
  MetaData
}