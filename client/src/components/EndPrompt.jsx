import React from 'react';

const EndPrompt = ({gameOver, endGame}) => {
  return (
    <div className="endPrompt">
      <br/><br/>
      <h4 className="message">{gameOver ? "Sorry, you lost!" : ""}</h4><br/>
      <h4 className="message">{gameOver ? "Play Again?!" : ""}</h4>
      <br/>
      <button type="button" className="endButton" onClick={() => endGame(true)} >{gameOver ? "Yes" : ""}</button>
      <button type="button" className="endButton" onClick={() => endGame(false)} >{gameOver ? "No" : ""}</button>
    </div>
  )
}

export default EndPrompt;