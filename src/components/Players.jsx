import { useState } from 'react';

export default function Players({ playerName, playerSymbol }) {

    const [btn, setBtn] = useState("Edit");
    const [clicked, setClicked] = useState(false);
    const [name, setName] = useState(playerName);

    const handleName = () => {
        setClicked((click) => !clicked);
        setBtn(clicked ? "Edit" : "Save")
    }


    return (
        <li>
            <span className="player">
                {
                    clicked ?
                        <input
                            placeholder={playerName}
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /> :
                        <span className="player-name">
                            {name}
                        </span>
                }
                <span className="player-symbol">{playerSymbol}</span>
                <button onClick={handleName} >{btn}</button>
            </span>
        </li>
    )
}