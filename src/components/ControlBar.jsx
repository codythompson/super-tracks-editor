import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Modes, Labels } from '../EditModes'
import styles from '../styles/ControlBar.module.scss'

function makeModeChangeHandler(mode, onModeChange) {
  return function() {
    onModeChange(mode)
  }
}

function renderModeButton(buttonMode, currentMode, onModeChange) {
  return (
    <button
      key={buttonMode}
      onClick={makeModeChangeHandler(buttonMode, onModeChange)}
      className={classnames({[styles.Selected]:buttonMode === currentMode})}>
        {Labels[buttonMode]}
    </button>
  )
}

function ControlBar({editMode, onModeChange}) {
  return (
    <div className={styles.ControlBar}>
      <button>Import Export</button>
      <div className={styles.ModeSelector}>
        {Modes.map(mode => renderModeButton(mode, editMode, onModeChange))}
      </div>
    </div>
  )
}
ControlBar.propTypes = {
  editMode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired
}

export default ControlBar