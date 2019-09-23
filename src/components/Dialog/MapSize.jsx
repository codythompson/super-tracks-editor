import React from 'react'
import classnames from 'classnames'

import Dialog from './index'
import Button from '../UI/Button'
import TextBox from '../UI/TextBox'
import uiStyles from '../../styles/UI/UI.module.scss'
import styles from '../../styles/MapSize.module.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newColumnsLeft: 0,
      newColumnsRight: 0,
      newRowsTop: 0,
      newRowsBottom: 0
    }

    this.handleOnChangeLeft = this.handleOnChange.bind(this, 'newColumnsLeft')
    this.handleOnIncrementLeft = this.handleOnIncrement.bind(this, 'newColumnsLeft')
    this.handleOnDecrementLeft = this.handleOnDecrement.bind(this, 'newColumnsLeft')

    this.handleOnChangeRight = this.handleOnChange.bind(this, 'newColumnsRight')
    this.handleOnIncrementRight = this.handleOnIncrement.bind(this, 'newColumnsRight')
    this.handleOnDecrementRight = this.handleOnDecrement.bind(this, 'newColumnsRight')

    this.handleOnChangeTop = this.handleOnChange.bind(this, 'newRowsTop')
    this.handleOnIncrementTop = this.handleOnIncrement.bind(this, 'newRowsTop')
    this.handleOnDecrementTop = this.handleOnDecrement.bind(this, 'newRowsTop')

    this.handleOnChangeBottom = this.handleOnChange.bind(this, 'newRowsBottom')
    this.handleOnIncrementBottom = this.handleOnIncrement.bind(this, 'newRowsBottom')
    this.handleOnDecrementBottom = this.handleOnDecrement.bind(this, 'newRowsBottom')
  }

  handleOnIncrement(propName) {
    const newVal = this.state[propName] + 1
    this.setState({[propName]: newVal})
  }

  handleOnDecrement(propName) {
    const newVal = this.state[propName] - 1
    this.setState({[propName]: newVal})
  }

  handleOnChange(propName, newValue) {
    let intValue;
    // TODO deleting with leading negative symbol
    if (newValue === '') {
      intValue = 0
    } else if (isNaN(newValue)) {
      intValue = this.state[propName]
    } else {
      intValue = parseInt(newValue, 10)
    }
    this.setState({[propName]: intValue})
  }

  render() {
    const { rows, columns, onConfirm, onCancel } = this.props
    const {newColumnsLeft, newColumnsRight, newRowsTop, newRowsBottom} = this.state
    const newCols = newColumnsLeft+newColumnsRight+columns
    const newRows = newRowsTop+newRowsBottom+rows
    return (
      <Dialog onConfirm={onConfirm} onCancel={onCancel} className={styles.MapSize}>
        <div className={styles.ContentRow}>
          Current Size (cols. by rows): <span className={classnames(uiStyles.Info, uiStyles.Badge)}>{columns}x{rows}</span>
        </div>
        <div className={styles.ContentRow}>
          New Size (cols. by rows): <span className={classnames(uiStyles.Success, uiStyles.Badge)}>{newCols}x{newRows}</span>
        </div>
        <hr/>
        <div className={styles.ContentRow}>
          <span>Add columns left</span>
          <Button className={uiStyles.Failure} onClick={this.handleOnDecrementLeft}>-</Button>
          <TextBox className={styles.CountInput} value={newColumnsLeft} onChange={this.handleOnChangeLeft} />
          <Button className={uiStyles.Success} onClick={this.handleOnIncrementLeft}>+</Button>
        </div>
        <div className={styles.ContentRow}>
          <span>Add columns right</span>
          <Button className={uiStyles.Failure} onClick={this.handleOnDecrementRight}>-</Button>
          <TextBox className={styles.CountInput} value={newColumnsRight} onChange={this.handleOnChangeRight} />
          <Button className={uiStyles.Success} onClick={this.handleOnIncrementRight}>+</Button>
        </div>
        <div className={styles.ContentRow}>
          <span>Add rows above</span>
          <Button className={uiStyles.Failure} onClick={this.handleOnDecrementTop}>-</Button>
          <TextBox className={styles.CountInput} value={newRowsTop} onChange={this.handleOnChangeTop} />
          <Button className={uiStyles.Success} onClick={this.handleOnIncrementTop}>+</Button>
        </div>
        <div className={styles.ContentRow}>
          <span>Add rows below</span>
          <Button className={uiStyles.Failure} onClick={this.handleOnDecrementBottom}>-</Button>
          <TextBox className={styles.CountInput} value={newRowsBottom} onChange={this.handleOnChangeBottom} />
          <Button className={uiStyles.Success} onClick={this.handleOnIncrementBottom}>+</Button>
        </div>
      </Dialog>
    )
  }
}