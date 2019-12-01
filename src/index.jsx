import React from 'react'
import ReactDOM from 'react-dom'
import throttle from 'lodash/throttle'

import App from './components/App'
import ImageEditor from './components/ImageEditor/ImageEditor'

import './styles/index.scss'

const resize = () => {
  document.body.style.setProperty('--viewport-width', `${window.innerWidth}px`)
  document.body.style.setProperty('--viewport-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', throttle(resize, 250))
resize()

const params = new URLSearchParams(window.location.search)
// TODO: refactor App component to also house the ImageEditor
if (params.has('track_image_editor')) {
  ReactDOM.render(<ImageEditor/>, document.getElementById('super-tracks-editor-app-root'))
} else {
  ReactDOM.render(<App/>, document.getElementById('super-tracks-editor-app-root'))
}