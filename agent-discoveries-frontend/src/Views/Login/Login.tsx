import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import SpyImage from '../../Components/SpyImage/spyImage'
interface props {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export default function Login({ setIsLoggedIn }: props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const loginResponse = await axios.post(
      `http://${import.meta.env.VITE_API_SERVER}/user/login`,
      {
        username,
        password,
      },
      { withCredentials: true },
    )
    if (loginResponse.status === 200) {
      setIsLoggedIn(true)
    }
  }

  return <main id = "mainLogin">
      <SpyImage/>

      <div id = "loginDetails">
        <h2>You saw something? 
          <br></br>
          <br></br>
          Log in to access the biggest network for secret agents. 
        </h2>
        <form id = "form" onSubmit={handleSubmit}> 
          <input 
          type = "text" 
          id= "username" 
          name= "username" 
          placeholder = "Username" 
          onChange={(e) => setUsername(e.target.value)}
          value={username}>
          </input><br></br>

          <input 
          type = "text" 
          id= "password" 
          name= "password" 
          placeholder = "Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}>
          </input><br></br>

          <input 
          type="submit" 
          id = "login" 
          value="Login">
          </input>
        </form>
      </div>
</main>
}
