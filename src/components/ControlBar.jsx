import React from 'react'
import PropTypes from 'prop-types'

import { Modes, Labels, MetaData } from '../EditModes'
import ButtonGroup from './ButtonGroup'
import styles from '../styles/ControlBar.module.scss'
// TODO: This is weird. Look into a better way to organize or make a Button component
import buttonGroupStyles from '../styles/ButtonGroup.module.scss'

function handleConfirmClick (onSave, onCancel, key) {
  key === 'save'? onSave(): onCancel()
}

function renderConfirmGroup (editMode, onSave, onCancel) {
  return MetaData[editMode].confirmable? (
    <ButtonGroup
      selectedKey={editMode}
      buttonsKeyLabelArr={[
        {key: 'save', label: 'save', className: styles.Save},
        {key: 'cancel', label: 'cancel'},
      ]}
      onClick={handleConfirmClick.bind(this, onSave, onCancel)}/>
  ) : null
}

function ControlBar({editMode, onModeChange, onSave, onCancel}) {
  return (
    <div className={styles.ControlBar}>
      <button className={buttonGroupStyles.Button}>Import Export</button>
      <ButtonGroup
        title={'Edit Mode'}
        selectedKey={editMode}
        buttonsKeyLabelArr={Modes.map(modeKey => ({key: modeKey, label: Labels[modeKey]}))}
        onClick={onModeChange}/>
      {renderConfirmGroup(editMode, onSave, onCancel)}
    </div>
  )
}
ControlBar.propTypes = {
  editMode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired
}

export default ControlBar