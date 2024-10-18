import { useState } from "react";
function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-400 w-12 h-12 m-1 leading-9 text-xl"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner:${winner}`;
  } else {
    status = "Next Player " + (xIsNext ? "X" : "O");
  }
  function handClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSqures = squares.slice();
    if (xIsNext) {
      nextSqures[i] = "X";
    } else {
      nextSqures[i] = "O";
    }
    onPlay(nextSqures);
  }
  return (
    <>
      <div>
        {/* Tic Tac Toe Structure 
        Game
          ->Board
            ->square
          ->History
        
        */}
        <div>{status}</div>
        {/* Row -1  */}
        <div className="flex">
          <Square value={squares[0]} onSquareClick={() => handClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handClick(2)} />
        </div>
        {/* Row-2  */}
        <div className="flex">
          <Square value={squares[3]} onSquareClick={() => handClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handClick(5)} />
        </div>
        {/* Row-3  */}
        <div className="flex">
          <Square value={squares[6]} onSquareClick={() => handClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handClick(8)} />
        </div>
      </div>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNet] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  function handlePlay(nextSqaures) {
    setXIsNet(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSqaures];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNet(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }
    return (
      <>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      </>
    );
  });

  return (
    <>
      <div className="flex justify-around items-center my-20 ">
        <div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="bg-white shadow-lg p-20 rounded-lg">
          <ol className="text-green-700 font-bold">{moves}</ol>
        </div>
      </div>
    </>
  );
}
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
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] &&
      squares[b] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
