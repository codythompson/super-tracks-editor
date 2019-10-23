import React from 'react'

import MapSize, {DIALOG_TYPE as MAP_SIZE_TYPE} from './MapSize'
import Export, {DIALOG_TYPE as EXPORT_TYPE} from './Export'
import EditTile, {DIALOG_TYPE as EDIT_TILE_TYPE} from './EditTile'
import Confirm, {DIALOG_TYPE as CONFIRM_TYPE} from './Confirm'

const DIALOG_MAP = {
  [MAP_SIZE_TYPE]: MapSize,
  [EXPORT_TYPE]: Export,
  [EDIT_TILE_TYPE]: EditTile,
  [CONFIRM_TYPE]: Confirm
}

export default function({dialogType, ...props}) {
  const DialogComponent = DIALOG_MAP[dialogType]
  if (DialogComponent) {
    return (
      <DialogComponent {...props} />
    )
  } else {
    return null
  }
}