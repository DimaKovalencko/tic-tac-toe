import React, {useEffect, useState} from 'react';
import './Game.css'

import Board from '../Board/Board'
import Score from '../Score/Score'
import Modal from '../Modal/Modal'

import {calculateWinner} from '../../basicLogic'

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const [checkCells, setCheckCells] = useState(true)

    const [modalActive, setModalActive] = useState(true)
    const [namePlayer1, setNamePlayer1] = useState('Player 1')
    const [namePlayer2, setNamePlayer2] = useState('Player 2')
    const [scorePlayer1, setScorePlayer1] = useState(0)
    const [scorePlayer2, setScorePlayer2] = useState(0)

    //Контролируемые инпуты
    const changeNamePlayer1 = (e) => {
        setNamePlayer1(e.target.value)
    }
    const changeNamePlayer2 = (e) => {
        setNamePlayer2(e.target.value)
    }
    //

    const winner = calculateWinner(board)

    useEffect(() => {
        switch(winner) {
            case 'X' : setScorePlayer1(scorePlayer1 + 1)
            break;
            case "O" : setScorePlayer2(scorePlayer2 + 1)
            break;
            default:
            break
        }
    },[winner])

    //Рестарт игры 
    const restart = () => {
        setBoard(Array(9).fill(null))
        setXIsNext(true)// даёт первый ход крестику 
    }

    const handleClick = (index) => {
        const boardCopy = [...board]
        if (winner || boardCopy[index]) 
        return
        boardCopy[index] = xIsNext ? 'X' : 'O'
        setBoard(boardCopy)
        setXIsNext(!xIsNext)
        setCheckCells(boardCopy.indexOf( null ) !== -1)
    }

 
    return (
        <div className="wrapper">
            <Board squares={board} click={handleClick}/>
            <div className="navigation-menu">
                <Score player1={namePlayer1} player2= {namePlayer2} scorePlayer1={scorePlayer1} scorePlayer2={scorePlayer2} />
                <button className="menu-btn restart-btn" onClick={restart}>Начать сначало</button>
                <button className="menu-btn changeName-btn" onClick={() => setModalActive(true)}>Изменить имена</button>
                <p className="navigation-menu__info">
                    {winner ? 'Победил ' + (xIsNext ? namePlayer2 : namePlayer1) : 'Сейчас ходит ' + (xIsNext ? namePlayer1 : namePlayer2)}
                </p>
                <p className="navigation-menu__info">
                    {checkCells === false ? 'Ничия, клетки закончились': ''}
                </p>
            </div>

            <Modal active={modalActive} setActive={setModalActive}>
                <h3 className="modal-title">Выберите имена для игроков</h3>
                <form>
                    <label htmlFor="player1">Первый игрок:</label>
                    <input onChange={changeNamePlayer1} value={namePlayer1} type="text" name="player1" />
                    <label htmlFor="player2">Второй игрок:</label>
                    <input onChange={changeNamePlayer2} value={namePlayer2} type="text" name="player2" />
                </form>
            </Modal>
        </div>

    );
}

export default Game;
