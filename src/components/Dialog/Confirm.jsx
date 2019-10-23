import React from 'react'

import Dialog from './Dialog'

export const DIALOG_TYPE = 'CONFIRM'

export default function ({onConfirm, onCancel}) {
  return (
    <Dialog
      onConfirm={()=>onConfirm({type:DIALOG_TYPE})}
      onCancel={onCancel}
      confirmLabel={'continue'}
      confirmIsDangerous>

      <b>This action will destroy any unsaved progress!</b>
      <br/>
      Are you sure you want to continue?
    </Dialog>
  )
}