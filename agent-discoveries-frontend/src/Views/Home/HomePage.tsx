import React, { useState } from 'react'
import './HomePage.css'
import Title from '../../Components/Title/title'
import MessageBoard from '../../Components/MessageBoard/messageBoard'
import AgentsList from '../../Components/AgentsList/agentsList'
import PostMessage from '../../Components/PostMessage/postMessage'

const HomePage: React.FC = () => {
    return (
        <html>
            <main id = "main">
                <Title/>
                <MessageBoard/>
                <AgentsList/>
                <PostMessage/>
            </main>
        </html>
    )
}

export default HomePage