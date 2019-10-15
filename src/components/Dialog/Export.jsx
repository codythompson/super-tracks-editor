import React from 'react'

import Dialog from './Dialog'
import TextBox from '../UI/TextBox'

export const DIALOG_TYPE = 'EXPORT'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileName: 'export.txt'
    }

    this.handleFileNameChange = this.handleFileNameChange.bind(this)
    this.handleOnConfirm = this.handleOnConfirm.bind(this)
  }

  handleFileNameChange(fileName) {
    this.setState({fileName})
  }

  handleOnConfirm() {
    const onConfirm = this.props.onConfirm
    if (onConfirm) {
      onConfirm({
        type: DIALOG_TYPE,
        fileName: this.state.fileName
      })
    }
  }

  render() {
    const onCancel = this.props.onCancel
    const fileName = this.state.fileName
    return (
      <Dialog onConfirm={this.handleOnConfirm} onCancel={onCancel}>
        <span>export filename: </span>
        <TextBox value={fileName} onChange={this.handleFileNameChange} />
      </Dialog>
    )
  }
}