import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const node = document.getElementById('root')

window.host = 'http://192.168.1.60:9999' ///'https://throwdick.voltica.me' // 

const react = ReactDOM.createRoot(node)

react.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
