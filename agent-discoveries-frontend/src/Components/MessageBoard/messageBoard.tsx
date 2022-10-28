import React from "react"
import './messageBoard.css'

// interface message {  //open to change 
//     agentName: string,
//     callSign: string,
//     date: string, 
//     time: string,
//     siteName: string,
//     location: string, 
//     regionId: string, 
//     timeZone: string,
//     status: string,
// }

// needs to take message as input from html form 
// needs to take profile details as input from database 

const MessageBoard: React.FC = () => {

    return (
      <>
        <div id = "message">
          <h2>MESSAGE BOARD</h2>
        </div>
      </>
    );
};

export default MessageBoard;