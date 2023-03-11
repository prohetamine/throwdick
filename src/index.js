import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const node = document.getElementById('root')

window.host = 'http://192.168.1.60:9999'

const react = ReactDOM.createRoot(node)

react.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
