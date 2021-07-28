// useState: tic tac toe

import * as React from "react";
import { useLocalStorageState } from "../utils";

// steps
// 1. the state is managed and the ui is rendered properly
// 2. add interactivity (handler for clicks etc) to componenets

function Board() {
  // managed state within this component that change over time
  // add lazy initialization to avoid parsing and getting item from localStorage
  // on every update / re-render of our state
  const [squares, setSquares] = useLocalStorageState(
    "squares",
    Array(9).fill(null)
  );
  const [squaresHistory, setSquaresHistory] = useLocalStorageState(
    "squaresHistory",
    [Array(9).fill(null)]
  );
  const [currentMove, setCurrentMove] = useLocalStorageState("currentMove", 0);

  // derived values based on squares state and derived states(winner and nextValue)
  // we're not using useState() bc these are derived states
  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  // this side effect code saves our game data so if page is refreshed etc users can resume game
  // make sure to serialize the array "squares" to allow storing data in disk
  // this side effect code will run only when there's a change in the array "squares"
  React.useEffect(() => {
    console.log("running side effects");
    window.localStorage.setItem("squares", JSON.stringify(squares));
  }, [squares]);

  // This is the function your square click handler will call. square = index value
  function selectSquare(square) {
    if (winner || squares[square]) return;

    // it's a bad idea to mutate or directly change state managed by react, in this case squares
    // doing so can lead to subtle bugs that can easily slip into production
    // instead we make a copy of the squares array
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);

    let squaresHistoryCopy = [];
    if (currentMove !== squaresHistory.length) {
      for (let i = 0; i <= currentMove; i++) {
        squaresHistoryCopy.push(squaresHistory[i]);
      }
    } else {
      squaresHistoryCopy = [...squaresHistory];
    }
    squaresHistoryCopy.push(squaresCopy);
    setSquaresHistory(squaresHistoryCopy);

    setCurrentMove(currentMove + 1);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  function renderGoToButton(i, currentMove) {
    let sentence = i === 0 ? "Go to game start" : `Go to move #${i}`;
    let disabled = false;
    if (i === currentMove) {
      sentence += " (current)";
      disabled = true;
    }
    return (
      <button disabled={disabled} onClick={() => selectGoToButton(i)}>
        {sentence}
      </button>
    );
  }

  function selectGoToButton(i) {
    setSquares(squaresHistory[i]);
    setCurrentMove(i);
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <div>
        <ol>
          {squaresHistory.map((square, index) => {
            return <li>{renderGoToButton(index, currentMove)}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
