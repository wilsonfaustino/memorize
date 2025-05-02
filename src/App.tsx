import { GameBoard } from './components/game-board'
import { ScoreBoard } from './components/score-board'

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-blue-200">
      <ScoreBoard
        moves={0}
        onRestart={() => {
          /* Restart logic here */
        }}
        time={0}
      />
      <GameBoard />
    </div>
  )
}

export default App
