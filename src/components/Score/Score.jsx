import React from 'react';

import './Score.css'

const Score = ({player1, player2, scorePlayer1, scorePlayer2}) => {
    return (
        <div className="score">
            <h2>Score:</h2>
            <div>{player1} : {scorePlayer1}</div>
            <div>{player2} : {scorePlayer2}</div>
        </div>
    );
}

export default Score;
