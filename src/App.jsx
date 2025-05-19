import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations.js'
import GameOver from './components/GameOver'


const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]



function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner; // 승리한 플레이어의 심볼을 저장하는 변수

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      // setHasWinner(true); // 승리 여부를 true로 바꿔줌
      winner = players[firstSquareSymbol]; // 승리한 플레이어의 이름을 가져옴
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; // 배열을 복사해서 새로운 배열을 만듦 , 원본 배열은 그대로 두고 새로운 배열을 만듦

  for (const turn of gameTurns) {
    const { square, player } = turn; // 구조분해 할당으로 객체에서 필요한 값만 추출
    const { row, col } = square; // 구조분해 할당으로 객체에서 필요한 값만 추출
    gameBoard[row][col] = player; // 클릭한 칸에 플레이어의 심볼을 넣어줌
  }
  return gameBoard;
}




function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);


  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns); // 게임 보드를 가져옴
  const winner = deriveWinner(gameBoard, players); // 승리한 플레이어의 심볼을 가져옴
  const hasDraw = gameTurns.length === 9 && !winner; // 무승부 여부를 저장하는 변수


  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X'); // activePlayer를 바꿔줌
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns); // 현재 플레이어를 가져옴

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,]; // 이전 턴을 복사해서 새로운 턴을 만듦 , 원본 배열은 그대로 두고 새로운 배열을 만듦 , 추가 객체를 맨 앞에 추가
      return updatedTurns; // 새로운 상태를 반환

    })
  }

  function handleRestart() {
    setGameTurns([]); // 턴을 초기화
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
