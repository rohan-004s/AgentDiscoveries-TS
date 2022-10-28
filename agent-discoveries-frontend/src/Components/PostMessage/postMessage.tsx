import React from "react"
import './postMessage.css'

// create a file that submits the message entered in the html form

const PostMessage: React.FC = () => {
    return (
      <>
        <div id = "postMessage">
            <h2>POST UPDATE</h2>
            <form id = "form"> 
                <textarea id= "update" name= "update" placeholder = "Enter text ..."></textarea>
                <input type="submit" id = "submit" value="Post"></input>
            </form>
        </div>
      </>
    );
};

export default PostMessage;

