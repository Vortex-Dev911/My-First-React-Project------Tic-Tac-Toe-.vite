import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';

function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Players playerName="Player 1" playerSymbol="X"/>
          <Players playerName="Player 2" playerSymbol="O"/>
        </ol>

        GAME BOARD!
        <GameBoard />
        </div>

        LOG
    </main>
  )
}

export default App
