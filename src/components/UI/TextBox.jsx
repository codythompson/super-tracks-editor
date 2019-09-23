import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from '../../styles/UI/TextBox.module.scss'

export default class TextBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    const {value} = e.target
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const {className, value} = this.props
    return (
      <input
        type="text"
        className={classnames(styles.TextBox, className)}
        value={value}
        onChange={this.handleOnChange} />
    )
  }
}

TextBox.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  className: PropTypes.string
}

TextBox.defaultProps = {
  value: ''
}