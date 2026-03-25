// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ];

const GameBoard = () => {

    const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


    return(
        <ol id="game-board">
            {initialGameBoard.map((btn, btnIndex) => <li key={btnIndex}></li>)}
        </ol>
    );
}

export default GameBoard;