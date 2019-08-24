import React from 'react'
import ReactDOM from 'react-dom'

import Atlas from './Atlas'
import App from './components/App'

import './styles/index.scss'

import { level_1 as atlasData } from '../test_data/test_atlasses'
const atlas = Atlas.parseAtlasContent(atlasData)
global.atlas = atlas

const dataStore = {
  atlas
}

const testRows = [[{
  leftTop: true,
  leftRight: false,
  leftBottom: false,
  topBottom: false,
  topRight: false,
  rightBottom: true
}]]

ReactDOM.render(<App atlas={atlas}/>, document.getElementById('super-tracks-editor-app-root'))