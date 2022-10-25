import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Login'
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Agent Discoveries</h1>
      <div className="card">
        {isLoggedIn ? (
          <h2>You've logged in!</h2>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
