import { EndGameModal } from '@/components/end-game-modal'
import { GameBoard } from '@/components/game-board'
import { ScoreBoard } from '@/components/score-board'
import { formatTime } from '@/helpers'
import { useCards } from '@/hooks/use-cards'
import { Card } from './components/card'

function App() {
  const { cards, flipCard, restartGame, isOpen, moves, time, checkCardTemporaryFlipped } = useCards()
  const formattedTime = formatTime(time)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-blue-200">
      <ScoreBoard
        moves={moves}
        onRestart={restartGame}
        time={formattedTime}
      />
      <GameBoard>
        {cards.map(({ id, emoji, isFlipped, isMatched }) => (
          <Card
            emoji={emoji}
            isFlipped={isFlipped || checkCardTemporaryFlipped(id)}
            isMatched={isMatched}
            key={id}
            onClick={() => flipCard(id)}
          />
        ))}
      </GameBoard>
      <EndGameModal
        isOpen={isOpen}
        moves={moves}
        onRestart={restartGame}
        time={formattedTime}
      />
    </div>
  )
}

export default App
