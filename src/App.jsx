import Players from './components/Players.jsx';
import Buttons from './components/Buttons.jsx';

function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Players playerName="Player 1" playerSymbol="X"/>
          <Players playerName="Player 2" playerSymbol="O"/>
        </ol>

        GAME BOARD!
        <span id="game-board">
          <ol>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
            <Buttons></Buttons>
          </ol>
        </span>
        </div>

        LOG
    </main>
  )
}

export default App
