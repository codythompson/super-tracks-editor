import React from 'react'
import ReactDOM from 'react-dom'
import throttle from 'lodash/throttle'

import Atlas from './Atlas'
import App from './components/App'

import './styles/index.scss'

import { level_1 as atlasData } from '../test_data/test_atlasses'
const atlas = Atlas.parseAtlasContent(atlasData)
global.atlas = atlas

const dataStore = {
  atlas
}

const resize = () => {
  document.body.style.setProperty('--viewport-width', `${window.innerWidth}px`)
  document.body.style.setProperty('--viewport-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', throttle(resize, 250))
resize()

ReactDOM.render(<App atlas={atlas}/>, document.getElementById('super-tracks-editor-app-root'))