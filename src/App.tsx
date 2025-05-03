import { AppContainer } from '@/components/app-container'
import { Card } from '@/components/card'
import { DifficultySelector } from '@/components/difficulty-selector'
import { EndGameModal } from '@/components/end-game-modal'
import { GameBoard } from '@/components/game-board'
import { ScoreBoard } from '@/components/score-board'
import { formatTime } from '@/helpers'
import { useCards } from '@/hooks/use-cards'

function App() {
  const difficulty = undefined
  const { cards, flipCard, restartGame, isOpen, moves, time, checkCardTemporaryFlipped } = useCards()
  const formattedTime = formatTime(time)

  return (
    <AppContainer>
      {!difficulty ? (
        <DifficultySelector />
      ) : (
        <>
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
        </>
      )}
    </AppContainer>
  )
}

export default App
