// Game.js
import React, { useState, useEffect } from "react";
import GameGrid from "./GameGrid";

function Game() {
    const [moves, setMoves] = useState(new Array(9).fill(""));
    const [turn, setTurn] = useState("X");
    const [gameOver, setGameOver] = useState(false);

    // Check for winner
    const checkWinner = (squares) => {
        const lines = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6]  // diagonal
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // Check for tie
    const checkTie = (squares) => {
        return squares.every(square => square !== "");
    };

    // Find winning move for a given player
    const findWinningMove = (squares, player) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            const squares_copy = [...squares];

            // Check if we can win in this line
            if (squares[a] === "" && squares[b] === player && squares[c] === player) return a;
            if (squares[a] === player && squares[b] === "" && squares[c] === player) return b;
            if (squares[a] === player && squares[b] === player && squares[c] === "") return c;
        }
        return -1;
    };

    // Get all empty squares
    const getEmptySquares = (squares) => {
        return squares.reduce((empty, square, index) => {
            if (square === "") empty.push(index);
            return empty;
        }, []);
    };

    // Computer move logic
    const makeComputerMove = (currentMoves) => {
        // First, check if computer can win
        const winningMove = findWinningMove(currentMoves, "O");
        if (winningMove !== -1) return winningMove;

        // Second, block player's winning move
        const blockingMove = findWinningMove(currentMoves, "X");
        if (blockingMove !== -1) return blockingMove;

        // If no winning or blocking moves, choose random empty square
        const emptySquares = getEmptySquares(currentMoves);
        if (emptySquares.length === 0) return -1;

        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        return emptySquares[randomIndex];
    };

    // Effect for computer's turn
    useEffect(() => {
        if (turn === "O" && !gameOver) {
            // Add a small delay to make the computer's move feel more natural
            const timeoutId = setTimeout(() => {
                const computerMove = makeComputerMove(moves);
                if (computerMove !== -1) {
                    handleMove(computerMove);
                }
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [turn, gameOver]);

    const handleMove = (whichSquare) => {
        if (gameOver || moves[whichSquare] !== "") {
            return;
        }

        const movesCopy = [...moves];
        movesCopy[whichSquare] = turn;

        const winner = checkWinner(movesCopy);
        const tie = checkTie(movesCopy);

        if (winner || tie) {
            setGameOver(true);
        }

        setMoves(movesCopy);
        if (!winner && !tie) {
            setTurn(turn === "X" ? "O" : "X");
        }
    };

    function gridClick(whichSquare) {
        // Only allow human moves when it's X's turn
        if (turn === "X") {
            handleMove(whichSquare);
        }
    }

    function newGame() {
        setMoves(new Array(9).fill(""));
        setTurn("X");
        setGameOver(false);
    }

    // Determine game status message
    const winner = checkWinner(moves);
    const tie = checkTie(moves);
    let status;
    if (winner) {
        status = `Winner: ${winner}!`;
    } else if (tie) {
        status = "Game is a tie!";
    } else {
        status = turn === "X" ? "Your turn (X)" : "Computer thinking... (O)";
    }

    return (
        <>
            <h1>Tic-Tac-Toe</h1>
            <GameGrid moves={moves} click={gridClick} />
            <p>
                <strong className={winner || turn}>{status}</strong>
            </p>
            <p>
                <button onClick={newGame}>New Game</button>
            </p>
        </>
    );
}

export default Game;