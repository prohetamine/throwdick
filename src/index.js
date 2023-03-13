import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const node = document.getElementById('root')

window.host = 'http://localhost:9999' //'https://server.throwdick.com'

const react = ReactDOM.createRoot(node)

react.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
