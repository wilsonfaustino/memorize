import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EndGameModal } from '@/components/end-game-modal'

describe('EndGameModal', () => {
  it('renders correctly when open', () => {
    render(
      <EndGameModal
        isOpen={true}
        moves={42}
        onRestart={() => {}}
        time="02:15"
      />,
    )

    expect(screen.getByText('🎉 Congratulations! 🎉')).toBeInTheDocument()
    expect(screen.getByText(/You completed the game in/i)).toBeInTheDocument()
    expect(screen.getByText('42 moves')).toBeInTheDocument()
    expect(screen.getByText('02:15')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument()
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('does not render content when closed', () => {
    render(
      <EndGameModal
        isOpen={false}
        moves={42}
        onRestart={() => {}}
        time="02:15"
      />,
    )

    expect(screen.queryByText('🎉 Congratulations! 🎉')).not.toBeInTheDocument()
    expect(screen.queryByText(/You completed the game in/i)).not.toBeInTheDocument()
  })

  it('calls onRestart when Play Again button is clicked', async () => {
    const user = userEvent.setup()
    const onRestartMock = vi.fn()

    render(
      <EndGameModal
        isOpen={true}
        moves={42}
        onRestart={onRestartMock}
        time="02:15"
      />,
    )

    const playAgainButton = screen.getByRole('button', { name: /play again/i })
    await user.click(playAgainButton)

    expect(onRestartMock).toHaveBeenCalledTimes(1)
  })
})
