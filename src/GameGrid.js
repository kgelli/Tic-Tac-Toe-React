import React from "react";
import Square from "./Square.js";

function GameGrid(props) {
    const moves = props.moves;

    return (
        <div id="game-grid">
            <Square player={moves[0]} click={() => props.click(0)} />
            <Square player={moves[1]} click={() => props.click(1)} />
            <Square player={moves[2]} click={() => props.click(2)} />
            <Square player={moves[3]} click={() => props.click(3)} />
            <Square player={moves[4]} click={() => props.click(4)} />
            <Square player={moves[5]} click={() => props.click(5)} />
            <Square player={moves[6]} click={() => props.click(6)} />
            <Square player={moves[7]} click={() => props.click(7)} />
            <Square player={moves[8]} click={() => props.click(8)} />
        </div>
    );
}

export default GameGrid;