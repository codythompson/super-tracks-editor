import React from 'react'
import ReactDOM from 'react-dom'
import throttle from 'lodash/throttle'

import App from './components/App'

import './styles/index.scss'

const resize = () => {
  document.body.style.setProperty('--viewport-width', `${window.innerWidth}px`)
  document.body.style.setProperty('--viewport-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', throttle(resize, 250))
resize()

ReactDOM.render(<App/>, document.getElementById('super-tracks-editor-app-root'))