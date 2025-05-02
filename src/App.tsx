import { GameBoard } from './components/game-board'
import { ScoreBoard } from './components/score-board'
import { useCards } from './hooks/use-cards'

function App() {
  const { cards, flipCard, restartGame } = useCards()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-blue-200">
      <ScoreBoard
        moves={0}
        onRestart={restartGame}
        time={0}
      />
      <GameBoard
        cards={cards}
        onCardClick={flipCard}
      />
    </div>
  )
}

export default App
