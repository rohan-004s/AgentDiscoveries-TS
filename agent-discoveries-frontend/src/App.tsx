import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Views/Login/Login'
import HomePage from './Views/Home/HomePage'
import ProfilePage from './Views/ProfilePage/ProfilePage'

import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <>
      {isLoggedIn ? <HomePage /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </>
  )
}

export default App
