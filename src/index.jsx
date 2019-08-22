import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import './styles/index.scss'

const testRows = [[{
  leftTop: true,
  leftRight: false,
  leftBottom: false,
  topBottom: false,
  topRight: false,
  rightBottom: true
}]]

ReactDOM.render(<App tileRows={testRows}/>, document.getElementById('super-tracks-editor-app-root'))