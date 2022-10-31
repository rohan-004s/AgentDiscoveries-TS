import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ProfilePage from './Views/ProfilePage/ProfilePage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProfilePage />
  </React.StrictMode>,
)
