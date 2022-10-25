import React, { useState } from 'react'
import axios from 'axios'

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

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </li>
        <li>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </li>
        <li>
          <button type="submit">Submit</button>
        </li>
      </ul>
    </form>
  )
}
