import React from 'react'

import MapSize, {DIALOG_TYPE as MAP_SIZE_TYPE} from './MapSize'
import Export, {DIALOG_TYPE as EXPORT_TYPE} from './Export'

const DIALOG_MAP = {
  [MAP_SIZE_TYPE]: MapSize,
  [EXPORT_TYPE]: Export
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