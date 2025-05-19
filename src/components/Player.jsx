import { useState } from 'react';


export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName); // 초기값을 props로 받아서 state로 관리
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(editing => !editing) // Edit 버튼을 클릭했을 때 true로 바꿔서 Save 버튼을 보여주기
        if (isEditing) {
            onChangeName(symbol, playerName) // 부모 컴포넌트에 playerName을 전달
        }

    }

    function handleChange(event) {
        console.log(event)
        console.log(event.target.value)
        setPlayerName(event.target.value) // input의 value를 state로 관리
    } // onChange 이벤트로 input의 value를 state로 관리

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let btnCaption = isEditing ? 'Save' : 'Edit' // isEditing이 true면 Save, false면 Edit


    if (isEditing) {
        editablePlayerName = <input type="text" required defaultValue={playerName} onChange={handleChange} />
    } // isEditing이 true면 input으로 바꿔서 playerName을 수정할 수 있도록 함

    //onChange : React에서 input, textarea, select 등 폼 요소의 값이 바뀔 때 실행되는 이벤트 핸들러



    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    )
}