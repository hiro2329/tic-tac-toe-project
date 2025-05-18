import { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]


export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard); // 초기값을 props로 받아서 state로 관리

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; // 이전 상태를 복사해서 새로운 상태를 만듦 , 원본 배열은 그대로 두고 새로운 배열을 만듦
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // 클릭한 칸에 플레이어의 심볼을 넣어줌
            return updatedBoard; // 새로운 상태를 반환
        }); // 버튼을 클릭했을 때 gameBoard를 업데이트

        onSelectSquare(); // 부모 컴포넌트에 클릭한 칸의 좌표를 전달
    }

    // React는 state가 바뀌었는지를 "주소값(참조)"로 판단
    // 참조형(배열, 객체 등)은 주소값이 바뀌지 않으면 변경된 것으로 인식하지 않음
    // 그래서 배열을 복사해서 새로운 배열을 만들어서 상태를 업데이트 해줘야 함

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex} >
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))
            }
        </ol >
    )
} 