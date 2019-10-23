import React from 'react'

import Dialog from './Dialog'
import TextBox from '../UI/TextBox'

export const DIALOG_TYPE = 'NEW'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tilesWide: 100,
      tilesHigh: 100
    }

    this.handleOnConfirm = this.handleOnConfirm.bind(this)
    this.handleOnWidthChange = this.handleOnChange.bind(this, 'tilesWide')
    this.handleOnHeightChange = this.handleOnChange.bind(this, 'tilesHigh')
  }

  handleOnChange(propName, newValue) {
    let intValue;
    if (newValue === '') {
      intValue = 0
    } else if (isNaN(newValue)) {
      intValue = this.state[propName]
    } else {
      intValue = parseInt(newValue, 10)
      if (intValue <= 0) {
        intValue = this.state[propName]
      }
    }
    this.setState({[propName]: intValue})
  }

  handleOnConfirm() {
    const {tilesWide, tilesHigh} = this.state
    this.props.onConfirm({
      type: DIALOG_TYPE,
      tilesWide,
      tilesHigh
    })
  }

  render() {
    const {tilesWide, tilesHigh} = this.state
    return (
      <Dialog onConfirm={this.handleOnConfirm} onCancel={this.props.onCancel}>
        Create new map:
        <div>
          <span>Width (tiles): </span>
          <TextBox value={tilesWide} onChange={this.handleOnWidthChange} />
        </div>
        <div>
          <span>Width (tiles): </span>
          <TextBox value={tilesHigh} onChange={this.handleOnHeightChange} />
        </div>
      </Dialog>
    )
  }
}