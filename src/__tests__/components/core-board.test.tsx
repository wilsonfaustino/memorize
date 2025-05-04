import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ScoreBoard } from '@/components/score-board'

describe('ScoreBoard', () => {
  it('renders score items correctly', () => {
    render(
      <ScoreBoard
        moves={10}
        onRestart={() => {}}
        time="01:30"
      />,
    )

    expect(screen.getByText('Moves:')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Time:')).toBeInTheDocument()
    expect(screen.getByText('01:30')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /restart game/i })).toBeInTheDocument()
  })

  it('calls onRestart when restart button is clicked', async () => {
    const user = userEvent.setup()
    const onRestartMock = vi.fn()

    render(
      <ScoreBoard
        moves={5}
        onRestart={onRestartMock}
        time="00:45"
      />,
    )

    const restartButton = screen.getByRole('button', { name: /restart game/i })
    await user.click(restartButton)

    expect(onRestartMock).toHaveBeenCalledTimes(1)
  })
})
