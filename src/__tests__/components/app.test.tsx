import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '@/app'
import { useCards } from '@/hooks/use-cards'
import { useDifficulty } from '@/hooks/use-difficulty'

// Mutable variables for mocks
let mockDifficulty: ReturnType<typeof useDifficulty> = {
  difficulty: null,
  handleDifficultyChange: vi.fn(),
  resetDifficulty: vi.fn(),
}

let mockCards: ReturnType<typeof useCards> = {
  cards: [],
  flipCard: vi.fn(),
  restartGame: vi.fn(),
  isOpen: false,
  moves: 0,
  time: 0,
}

// Mock hooks
vi.mock('@/hooks/use-difficulty', () => ({
  useDifficulty: () => mockDifficulty,
}))

vi.mock('@/hooks/use-cards', () => ({
  useCards: () => mockCards,
}))

vi.mock('@/components/difficulty-selector', () => ({
  DifficultySelector: ({ onChange }: { onChange: (difficulty: string) => void }) => (
    <div data-testid="difficulty-selector">
      <button
        onClick={() => onChange('easy')}
        type="button">
        Easy
      </button>
      <button
        onClick={() => onChange('medium')}
        type="button">
        Medium
      </button>
      <button
        onClick={() => onChange('hard')}
        type="button">
        Hard
      </button>
    </div>
  ),
}))

vi.mock('@/components/score-board', () => ({
  ScoreBoard: ({ moves, time, onRestart }: { moves: number; time: string; onRestart: () => void }) => (
    <div data-testid="score-board">
      <div>Moves: {moves}</div>
      <div>Time: {time}</div>
      <button
        onClick={onRestart}
        type="button">
        Restart Game
      </button>
    </div>
  ),
}))

vi.mock('@/components/game-board', () => ({
  GameBoard: ({ children }: { children: React.ReactNode }) => <div data-testid="game-board">{children}</div>,
}))

vi.mock('@/components/end-game-modal', () => ({
  EndGameModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="end-game-modal">Game Over</div> : null,
}))

vi.mock('@/components/card', () => ({
  Card: () => <div data-testid="card">Card</div>,
}))

vi.mock('@/helpers', () => ({
  formatTime: () => '00:30',
}))

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks()
    // Reset mocks
    mockDifficulty = {
      difficulty: null,
      handleDifficultyChange: vi.fn(),
      resetDifficulty: vi.fn(),
    }
    mockCards = {
      cards: [],
      flipCard: vi.fn(),
      restartGame: vi.fn(),
      isOpen: false,
      moves: 0,
      time: 0,
    }

    vi.restoreAllMocks()
  })

  it('renders difficulty selector when no difficulty is selected', () => {
    render(<App />)
    expect(screen.getByTestId('difficulty-selector')).toBeInTheDocument()
    expect(screen.queryByTestId('score-board')).not.toBeInTheDocument()
    expect(screen.queryByTestId('game-board')).not.toBeInTheDocument()
  })

  it('renders game components when difficulty is selected', () => {
    // Override the mock to return a difficulty
    mockDifficulty = {
      difficulty: 'easy',
      handleDifficultyChange: vi.fn(),
      resetDifficulty: vi.fn(),
    }

    // Override the useCards mock to return cards
    mockCards = {
      cards: [{ id: '1', emoji: '😀', isFlipped: false, isMatched: false }],
      flipCard: vi.fn(),
      restartGame: vi.fn(),
      isOpen: false,
      moves: 10,
      time: 30,
    }

    render(<App />)

    expect(screen.queryByTestId('difficulty-selector')).not.toBeInTheDocument()
    expect(screen.getByTestId('score-board')).toBeInTheDocument()
    expect(screen.getByTestId('game-board')).toBeInTheDocument()
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('displays end game modal when game is over', () => {
    mockDifficulty = {
      difficulty: 'easy',
      handleDifficultyChange: vi.fn(),
      resetDifficulty: vi.fn(),
    }

    mockCards = {
      cards: [],
      flipCard: vi.fn(),
      restartGame: vi.fn(),
      isOpen: true,
      moves: 15,
      time: 60,
    }

    render(<App />)

    expect(screen.getByTestId('end-game-modal')).toBeInTheDocument()
  })

  it('calls restartGame and resetDifficulty when restart button is clicked', async () => {
    const resetDifficultyMock = vi.fn()
    const restartGameMock = vi.fn()

    mockDifficulty = {
      difficulty: 'easy',
      handleDifficultyChange: vi.fn(),
      resetDifficulty: resetDifficultyMock,
    }

    mockCards = {
      cards: [],
      flipCard: vi.fn(),
      restartGame: restartGameMock,
      isOpen: false,
      moves: 10,
      time: 30,
    }

    render(<App />)

    const user = userEvent.setup()
    const restartButton = screen.getByText('Restart Game')
    await user.click(restartButton)

    expect(resetDifficultyMock).toHaveBeenCalledTimes(1)
    expect(restartGameMock).toHaveBeenCalledTimes(1)
  })
})
