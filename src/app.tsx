import { AppContainer } from '@/components/app-container'
import { Card } from '@/components/card'
import { DifficultySelector } from '@/components/difficulty-selector'
import { EndGameModal } from '@/components/end-game-modal'
import { GameBoard } from '@/components/game-board'
import { ScoreBoard } from '@/components/score-board'
import { formatTime } from '@/helpers'
import { useCards } from '@/hooks/use-cards'
import { useDifficulty } from '@/hooks/use-difficulty'

function App() {
  const { difficulty, handleDifficultyChange, resetDifficulty } = useDifficulty()
  const { cards, flipCard, restartGame, isOpen, moves, time } = useCards({ difficulty })
  const formattedTime = formatTime(time)

  const handleRestart = () => {
    resetDifficulty()
    restartGame()
  }

  return (
    <AppContainer>
      {!difficulty ? (
        <DifficultySelector onChange={handleDifficultyChange} />
      ) : (
        <>
          <ScoreBoard
            moves={moves}
            onRestart={handleRestart}
            time={formattedTime}
          />
          <GameBoard difficulty={difficulty}>
            {cards.map(({ id, emoji, isFlipped, isMatched }) => (
              <Card
                emoji={emoji}
                isFlipped={isFlipped}
                isMatched={isMatched}
                key={id}
                onClick={() => flipCard(id)}
              />
            ))}
          </GameBoard>
          <EndGameModal
            isOpen={isOpen}
            moves={moves}
            onRestart={handleRestart}
            time={formattedTime}
          />
        </>
      )}
    </AppContainer>
  )
}

export default App
