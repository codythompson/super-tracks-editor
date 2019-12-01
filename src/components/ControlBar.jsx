import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Modes, Labels, MetaData } from '../EditModes'
import Button from './UI/Button'
import ButtonGroup from './ButtonGroup'
import styles from '../styles/ControlBar.module.scss'
import uiStyles from '../styles/UI/UI.module.scss'

function handleConfirmClick (onSave, onCancel, key) {
  key === 'save'? onSave(): onCancel()
}

function renderConfirmGroup (editMode, onSave, onCancel) {
  const {confirmable, styleAsDangerous} = MetaData[editMode]
  return confirmable? (
    <ButtonGroup
      selectedKey={editMode}
      buttonsKeyLabelArr={[
        {key: 'save', label: 'save', className: classnames({[uiStyles.Success]:!styleAsDangerous,[uiStyles.Danger]:styleAsDangerous})},
        {key: 'cancel', label: 'cancel'},
      ]}
      onClick={handleConfirmClick.bind(this, onSave, onCancel)}/>
  ) : null
}

function ControlBar({editMode, onNew, onImport, onExport, onChangeMapSize, onModeChange, onSave, onCancel}) {
  return (
    <div className={styles.ControlBar}>
      <ButtonGroup title={'Map'}>
        <Button className={styles.Button} onClick={onNew}>New</Button>
        <Button className={styles.Button} onClick={onImport}>Import</Button>
        <Button className={styles.Button} onClick={onExport}>Export</Button>
        <Button className={styles.Button} onClick={onChangeMapSize}>Resize</Button>
      </ButtonGroup>
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