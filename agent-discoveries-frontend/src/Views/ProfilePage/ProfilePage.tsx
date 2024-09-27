import React from 'react'
import './ProfilePage.css'
import Title from '../../Components/Title/title'
import MessageBoard from '../../Components/MessageBoard/messageBoard'
import AgentsList from '../../Components/AgentsList/agentsList'
import PostMessage from '../../Components/PostMessage/postMessage'

function Header() {
  return (
    <header className="banner">
      <button>Edit Profile</button>
      <img src="" alt="" />
      <p>Location</p>
      <p>Time</p>
    </header>
  )
}

function AccountInfo() {
  return (
    <section className="column column1">
      <h2>Account Information</h2>
      <p>Username:</p>
      <p>Email:</p>
      <p>Base Location:</p>
      <p>Contact Details:</p>
      <p>Password:</p>
    </section>
  )
}

function JobProfile() {
  return (
    <section className="column column2">
      <h2>Job Profile</h2>
      <p>Job title:</p>
      <p>Manager:</p>
      <p>Biography:</p>
      <p>Years of service:</p>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <button>Save Changes</button>
      <button>Delete Account</button>
    </footer>
  )
}

export default function ProfilePage() {
  return (
    <section className="page">
      <Header />
      <AccountInfo />
      <JobProfile />
      <Footer />
    </section>
  )
}
