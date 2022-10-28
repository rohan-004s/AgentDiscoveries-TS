import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Views/Login/Login'
import HomePage from './Views/Home/HomePage'
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
        {
          isLoggedIn ? (
          <HomePage />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )
      }
    </>
  )
}

export default App
