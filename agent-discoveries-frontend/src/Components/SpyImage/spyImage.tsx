import React from "react"
import './spyImage.css'
import spy from './spy.jpg'

const SpyImage: React.FC = () => {
    return (
      <>
        <div id = "spyImage">
          <img id = "image" 
          src = {spy} 
          alt = "spy image"
          width = "100%"
          height = "100%"></img>
        </div>
      </>
    );
};

export default SpyImage;